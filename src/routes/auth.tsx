import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search["redirect"] === "string" ? (search["redirect"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign In — House499" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const REDIRECT_KEY = "h499-auth-redirect";

function safePath(path: string | undefined): string | null {
  if (path && path.startsWith("/") && !path.startsWith("//")) return path;
  return null;
}

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  // After returning from Google (or a reload while signed in), go to the target.
  useEffect(() => {
    const stored = sessionStorage.getItem(REDIRECT_KEY);
    const target = stored || safePath(redirect) || "/admin";
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        sessionStorage.removeItem(REDIRECT_KEY);
        navigate({ to: target, replace: true });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setNotice("");
    setBusy(true);
    const target = redirect || sessionStorage.getItem(REDIRECT_KEY) || "/admin";
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        sessionStorage.removeItem(REDIRECT_KEY);
        navigate({ to: safePath(target) ?? "/admin", replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/auth" },
        });
        if (error) throw error;
        if (data.session) {
          sessionStorage.removeItem(REDIRECT_KEY);
          navigate({ to: safePath(target) ?? "/admin", replace: true });
        } else {
          setNotice("Account created! Please check your email to confirm, then sign in.");
          setMode("signin");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  // Google sign-in temporarily hidden — email/password only.


  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-navy px-4 py-12 text-navy-foreground">
      <div className="w-full max-w-md rounded-lg border border-gold/25 bg-navy-soft p-7 sm:p-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center text-xl uppercase">
          {mode === "signin" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="mt-1 text-center text-xs text-navy-foreground/70">
          {mode === "signin"
            ? "Sign in to manage your House499 bookings."
            : "Create your House499 account to continue."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-navy-foreground/70">Email</span>
            <div className="mt-1 flex items-center gap-2 rounded-md bg-card px-3 py-2.5 text-navy">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm outline-none"
                autoComplete="email"
              />
            </div>
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-navy-foreground/70">Password</span>
            <div className="mt-1 flex items-center gap-2 rounded-md bg-card px-3 py-2.5 text-navy">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm outline-none"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
            </div>
          </label>

          {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
          {notice && <p className="rounded-md bg-success-soft px-3 py-2 text-xs text-success">{notice}</p>}

          <button
            type="submit"
            disabled={busy}
            className="min-h-11 w-full rounded-md bg-gold text-sm font-extrabold uppercase tracking-wide text-gold-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-navy-foreground/70">
          {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="font-bold text-gold underline"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError("");
              setNotice("");
            }}
          >
            {mode === "signin" ? "Create one" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

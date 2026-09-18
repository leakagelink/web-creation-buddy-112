import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.house499.app",
  appName: "House499",
  // sirf formality ke liye zaroori — app live website load karta hai (neeche server.url)
  webDir: "public",
  server: {
    // Load the published site inside the native WebView.
    url: "https://home.socilet.one",
    androidScheme: "https",
    // Keep navigation on every House499 deployment inside the app, including
    // redirects between the custom domain and Lovable's published host.
    allowNavigation: [
      "home.socilet.one",
      "*.socilet.one",
      "web-creation-buddy-112.lovable.app",
      "*.lovable.app",
    ],
  },
  android: {
    // App ke andar hi navigation — koi bhi link browser me na khule
    allowMixedContent: false,
  },
};

export default config;

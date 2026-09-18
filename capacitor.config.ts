import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.house499.app",
  appName: "House499",
  // sirf formality ke liye zaroori — app live website load karta hai (neeche server.url)
  webDir: "public",
  server: {
    // App seedha custom domain ko load karega (lovable.app redirect → browser bug avoid karne ke liye)
    url: "https://home.socilet.one",
    androidScheme: "https",
  },
  android: {
    // App ke andar hi navigation — koi bhi link browser me na khule
    allowMixedContent: false,
  },
};

export default config;

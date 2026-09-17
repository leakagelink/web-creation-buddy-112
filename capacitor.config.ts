import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.house499.app",
  appName: "House499",
  // sirf formality ke liye zaroori — app live website load karta hai (neeche server.url)
  webDir: "public",
  server: {
    // App aapki live website ko load karega taki booking, admin, maps — sab kaam karein
    url: "https://web-creation-buddy-112.lovable.app",
    androidScheme: "https",
  },
};

export default config;

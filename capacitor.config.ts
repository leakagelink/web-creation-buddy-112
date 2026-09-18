import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.house499.app",
  appName: "House499",
  webDir: "public",
  server: {
    url: "https://home.socilet.one",
    androidScheme: "https",
    allowNavigation: ["home.socilet.one"],
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;

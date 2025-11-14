// Load .env if exists
require('dotenv').config({ silent: true });

export default {
  expo: {
    name: "EUNOIA",
    slug: "eunoia",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "eunoia",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.joaorihan",
      googleServicesFile: "./GoogleService-Info.plist"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      googleServicesFile: "./google-services.json",
      package: "com.joaorihan"
    },
    plugins: [
      "@react-native-firebase/app",
      "@react-native-firebase/auth"
    ],
    extra: {
      geminiApiKey: process.env.GEMINI_API_KEY || ""
    }
  }
};


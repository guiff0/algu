/** @type {import('@expo/config').ExpoConfig} */
module.exports = {
  expo: {
    name: "Quantum",
    slug: "quantum",
    version: "1.0.0",
    orientation: "portrait",

    icon: "./assets/icon.png",

    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },

    assetBundlePatterns: ["**/*"],

    ios: {
      supportsTablet: false,
      bundleIdentifier: "com.edgex.quantum.app",
      buildNumber: "1"
    },

    android: {
      package: "com.edgex.quantum.app",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },

    extra: {
      eas: {
        projectId: "de399ece-1bb1-4fa4-849e-d7e4fb4bdbd3"
      }
    }
  }
};

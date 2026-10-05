/** @type {import('@expo/config').ExpoConfig} */
module.exports = {
  expo: {
    owner: "guiffos-team",
    name: "Quantum",
    slug: "algu",
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
      bundleIdentifier: "com.algu.quantum.app",
      buildNumber: "1"
    },

    android: {
      package: "com.algu.quantum.app",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },

    web: {
      bundler: "metro",
      name: "ALGU Co. | Quantum, AI & Cybersecurity Engineering for Government",
      shortName: "ALGU Co.",
      description:
        "ALGU Co. delivers quantum, AI, cybersecurity, software, and hardware engineering to federal, state, and local government.",
      lang: "en",
    },

    extra: {
      eas: {
        projectId: "f33b4a72-7983-4f0b-89cb-799ebb7caed8"
      }
    }
  }
};

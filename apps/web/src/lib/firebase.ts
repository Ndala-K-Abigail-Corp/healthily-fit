import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

import { env } from "@/env";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  appId: env.VITE_FIREBASE_APP_ID,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase App Check for bot protection and abuse prevention
// NOTE: To enable in production, you must:
// 1. Go to Firebase Console > Project Settings > App Check
// 2. Register your app with reCAPTCHA v3
// 3. Add the site key to your .env file as VITE_FIREBASE_APP_CHECK_KEY
// 4. Uncomment the code below and add VITE_FIREBASE_APP_CHECK_KEY to env.ts
// 
// if (import.meta.env.MODE === "production" && env.VITE_FIREBASE_APP_CHECK_KEY) {
//   try {
//     initializeAppCheck(app, {
//       provider: new ReCaptchaV3Provider(env.VITE_FIREBASE_APP_CHECK_KEY),
//       isTokenAutoRefreshEnabled: true, // Auto-refresh before token expires
//     });
//     console.log("✅ Firebase App Check initialized");
//   } catch (error) {
//     console.error("⚠️ Failed to initialize Firebase App Check:", error);
//   }
// } else {
//   console.warn("⚠️ Firebase App Check is disabled. Enable in Firebase Console for production.");
// }

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Connect to emulators in development (currently disabled)
// Uncomment the block below to use Firebase emulators instead of production
// if (import.meta.env.DEV) {
//   try {
//     connectAuthEmulator(auth, "http://localhost:9099");
//     connectFirestoreEmulator(db, "localhost", 8080);
//     console.log("🔌 Connected to Firebase emulators");
//   } catch (error) {
//     console.warn("⚠️ Firebase emulators not available:", error);
//   }
// }

console.log("🔥 Using production Firebase project");



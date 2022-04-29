import { Analytics, getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAIsUW_YRbzXBkCFeiBCClRMuq04Sw4PVI",
  authDomain: "sigma-chi-eta-beta-website.firebaseapp.com",
  projectId: "sigma-chi-eta-beta-website",
  storageBucket: "sigma-chi-eta-beta-website.appspot.com",
  messagingSenderId: "697269696256",
  appId: "1:697269696256:web:61ad06a722cfed37db25e5",
  measurementId: "G-JSHKRYX5Q0",
};

const app = initializeApp(firebaseConfig);
let analytics: Analytics;
if (typeof window !== "undefined") {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
      "6Lc1FK4fAAAAAHIbwSkEDmocoXqGlobU83ZB84ey"
    ),
    isTokenAutoRefreshEnabled: true,
  });
  analytics = getAnalytics();
}

// Firebase product references
export { analytics };
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();



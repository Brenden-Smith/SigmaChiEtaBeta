import { Analytics, getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
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
initializeApp(firebaseConfig);

// Firebase product references
let analytics: Analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics();
}
export { analytics };
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();



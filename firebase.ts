import { Analytics, getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';

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

export async function signIn(email: string, password: string) {
  const result = await signInWithEmailAndPassword(getAuth(), email, password);
  return result;
}

export function authState(setAuth: Function) {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) setAuth(true);
    else setAuth(false);
  })
}

export async function signOut() {
  const result = await getAuth().signOut();
  return result;
}

export const db = getFirestore();

export const useAnalytics = () => {
  const [state, setState] = useState<Analytics>();
  useEffect(() => {
    setState(getAnalytics(app));
  }, []);
  return state;
}
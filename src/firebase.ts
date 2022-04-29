import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCcwb30fPcJv7Notlu8f6Z_QnaLoQJe5CY',
  authDomain: 'sigma-chi-eta-beta.firebaseapp.com',
  projectId: 'sigma-chi-eta-beta',
  storageBucket: 'sigma-chi-eta-beta.appspot.com',
  messagingSenderId: '757920262406',
  appId: '1:757920262406:web:3edc3eccdf5a8b95245687',
  measurementId: 'G-TYJ5VHT4B6'
}

// declare global {
//   // eslint-disable-next-line no-unused-vars
//   interface Window {
//     FIREBASE_APPCHECK_DEBUG_TOKEN: any
//   }
// }

const app = initializeApp(firebaseConfig)
// window.FIREBASE_APPCHECK_DEBUG_TOKEN = true
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(
    '6Lc1FK4fAAAAAHIbwSkEDmocoXqGlobU83ZB84ey'
  ),
  isTokenAutoRefreshEnabled: true
})

// Firebase product references
export const analytics = getAnalytics()
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID } from './constants';

const firebaseConfig = {
  apiKey: (process.env.NODE_ENV !== 'production') ? FIREBASE_API_KEY : process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: (process.env.NODE_ENV !== 'production') ? FIREBASE_AUTH_DOMAIN : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: (process.env.NODE_ENV !== 'production') ? FIREBASE_PROJECT_ID : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: (process.env.NODE_ENV !== 'production') ? FIREBASE_STORAGE_BUCKET : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: (process.env.NODE_ENV !== 'production') ? FIREBASE_MESSAGING_SENDER_ID : process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: (process.env.NODE_ENV !== 'production') ? FIREBASE_APP_ID : process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: (process.env.NODE_ENV !== 'production') ? FIREBASE_MEASUREMENT_ID : process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
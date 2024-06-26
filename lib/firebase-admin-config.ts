import admin from "firebase-admin";
import { initializeApp, getApps, cert } from "firebase-admin/app";

const serviceAccount = {
  type: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_TYPE,
  project_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_KEY,
  client_email: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_URI,
  token_uri: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url:
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
};

try {
  admin.initializeApp({
    credential: cert(serviceAccount as any),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
} catch (error) {
  console.log(error);
}

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp();
  }
}

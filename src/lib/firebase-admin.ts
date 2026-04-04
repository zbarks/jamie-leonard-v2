import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getFirebaseAdmin() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // Use service account JSON from env var if available, otherwise use project ID
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    return initializeApp({
      credential: cert(serviceAccount),
    });
  }

  // Fallback: use project ID with application default credentials
  return initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || "jamiel-81ac3",
  });
}

const app = getFirebaseAdmin();
export const db = getFirestore(app);

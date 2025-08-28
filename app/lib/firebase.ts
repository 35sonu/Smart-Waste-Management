import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Check if we're in demo mode
const DEMO_MODE = !process.env.FIREBASE_API_KEY || process.env.FIREBASE_API_KEY === "demo-api-key";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "smart-waste-demo.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "smart-waste-demo",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "smart-waste-demo.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.FIREBASE_APP_ID || "demo-app-id"
};

// Initialize Firebase only in browser environment
let app: any = null;
let auth: any = null;
let db: any = null;
let googleProvider: any = null;

if (typeof window !== 'undefined') {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  
  // Initialize Firebase Authentication and get a reference to the service
  auth = getAuth(app);
  
  // Initialize Cloud Firestore and get a reference to the service
  db = getFirestore(app);
  
  // Configure Google Auth Provider
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
}

export { auth, db, googleProvider };

// Connect to emulators in demo mode (for development without real Firebase)
if (DEMO_MODE && typeof window !== 'undefined') {
  console.log('🚀 Running in demo mode - Firebase features will be mocked');
  
  // Note: In a real production app, you might want to use Firebase emulators
  // For this demo, we'll handle the mock authentication in the service layer
}

export { DEMO_MODE };
export default app;

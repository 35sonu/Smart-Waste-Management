import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { auth, googleProvider, db, DEMO_MODE } from '../lib/firebase';

type UserCredential = {
  user: FirebaseUser;
};

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  avatar: string;
  displayName?: string;
  photoURL?: string;
  createdAt?: any;
  lastLoginAt?: any;
  ecoPoints?: number;
  level?: number;
  wasteRecycled?: number;
  co2Saved?: number;
}

class AuthService {
  private currentUser: User | null = null;
  private authListeners: Array<(user: User | null) => void> = [];

  constructor() {
    if (DEMO_MODE) {
      this.initializeDemoMode();
    } else if (typeof window !== 'undefined' && auth) {
      // Listen for auth state changes only in browser
      onAuthStateChanged(auth, this.handleAuthStateChange.bind(this));
    }
  }

  private initializeDemoMode(): void {
    // Check for existing demo user in localStorage
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('demo-user');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          this.currentUser = user;
          this.notifyListeners(user);
          console.log('🚀 Demo mode: Restored user session');
        } catch (error) {
          console.error('Failed to parse saved demo user:', error);
          localStorage.removeItem('demo-user');
        }
      }
    }
  }

  private async handleAuthStateChange(firebaseUser: FirebaseUser | null) {
    if (firebaseUser) {
      try {
        // Get or create user document in Firestore
        const user = await this.getOrCreateUser(firebaseUser);
        this.currentUser = user;
        this.notifyListeners(user);
      } catch (error) {
        console.error('Error handling auth state change:', error);
        this.currentUser = null;
        this.notifyListeners(null);
      }
    } else {
      this.currentUser = null;
      this.notifyListeners(null);
    }
  }

  private async getOrCreateUser(firebaseUser: FirebaseUser): Promise<User> {
    if (!db) {
      throw new Error('Firestore not initialized');
    }
    
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // Update last login time for existing user
      await updateDoc(userRef, {
        lastLoginAt: serverTimestamp(),
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL
      });

      return {
        id: firebaseUser.uid,
        ...userSnap.data(),
        displayName: firebaseUser.displayName || userSnap.data().name,
        photoURL: firebaseUser.photoURL
      } as User;
    } else {
      // Create new user document
      const newUser: Omit<User, 'id'> = {
        name: firebaseUser.displayName || 'New User',
        email: firebaseUser.email || '',
        phone: '',
        city: '',
        avatar: firebaseUser.photoURL || '👤',
        displayName: firebaseUser.displayName || 'New User',
        photoURL: firebaseUser.photoURL,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        ecoPoints: 0,
        level: 1,
        wasteRecycled: 0,
        co2Saved: 0
      };

      await setDoc(userRef, newUser);

      return {
        id: firebaseUser.uid,
        ...newUser
      } as User;
    }
  }

  private notifyListeners(user: User | null) {
    this.authListeners.forEach(listener => listener(user));
  }

  public onAuthStateChange(listener: (user: User | null) => void) {
    this.authListeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.authListeners.indexOf(listener);
      if (index > -1) {
        this.authListeners.splice(index, 1);
      }
    };
  }

  public async signInWithGoogle(): Promise<User> {
    if (DEMO_MODE) {
      return this.handleDemoSignIn();
    }

    if (!auth || !googleProvider) {
      throw new Error('Firebase auth not initialized');
    }

    try {
      const result: UserCredential = await signInWithPopup(auth, googleProvider);
      const user = await this.getOrCreateUser(result.user);
      
      // Show success notification
      console.log('Successfully signed in with Google:', user.name);
      
      return user;
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      
      // Handle specific error cases
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Pop-up was blocked. Please allow pop-ups and try again.');
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your connection and try again.');
      } else {
        throw new Error('Failed to sign in with Google. Please try again.');
      }
    }
  }

  private async handleDemoSignIn(): Promise<User> {
    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create a demo user
    const demoUser: User = {
      id: 'demo-user-123',
      name: 'Demo User',
      email: 'demo@ecowaste.com',
      phone: '+1 (555) 123-4567',
      city: 'San Francisco',
      avatar: '🌱',
      displayName: 'Demo User',
      photoURL: null,
      createdAt: new Date(),
      lastLoginAt: new Date(),
      ecoPoints: 2450,
      level: 5,
      wasteRecycled: 125.5,
      co2Saved: 67.8
    };

    this.currentUser = demoUser;
    this.notifyListeners(demoUser);
    
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('demo-user', JSON.stringify(demoUser));
    }
    
    console.log('🚀 Demo sign-in successful:', demoUser.name);
    return demoUser;
  }

  public async signOut(): Promise<void> {
    if (DEMO_MODE) {
      this.handleDemoSignOut();
      return;
    }

    if (!auth) {
      throw new Error('Firebase auth not initialized');
    }

    try {
      await signOut(auth);
      this.currentUser = null;
      console.log('Successfully signed out');
    } catch (error) {
      console.error('Sign-out error:', error);
      throw new Error('Failed to sign out. Please try again.');
    }
  }

  private handleDemoSignOut(): void {
    this.currentUser = null;
    this.notifyListeners(null);
    
    // Clear from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('demo-user');
    }
    
    console.log('🚀 Demo sign-out successful');
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  public async updateUserProfile(updates: Partial<User>): Promise<void> {
    if (!this.currentUser) {
      throw new Error('No user is currently signed in');
    }

    if (DEMO_MODE) {
      // Update demo user in localStorage
      this.currentUser = {
        ...this.currentUser,
        ...updates
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('demo-user', JSON.stringify(this.currentUser));
      }
      this.notifyListeners(this.currentUser);
      return;
    }

    if (!db) {
      throw new Error('Firestore not initialized');
    }

    try {
      const userRef = doc(db, 'users', this.currentUser.id);
      await updateDoc(userRef, {
        ...updates,
        lastUpdated: serverTimestamp()
      });

      // Update local user object
      this.currentUser = {
        ...this.currentUser,
        ...updates
      };

      this.notifyListeners(this.currentUser);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Failed to update profile. Please try again.');
    }
  }

  public async addEcoPoints(points: number): Promise<void> {
    if (!this.currentUser) return;

    const newPoints = (this.currentUser.ecoPoints || 0) + points;
    const newLevel = Math.floor(newPoints / 1000) + 1;

    await this.updateUserProfile({
      ecoPoints: newPoints,
      level: newLevel
    });
  }

  public async updateWasteStats(wasteKg: number, co2SavedKg: number): Promise<void> {
    if (!this.currentUser) return;

    await this.updateUserProfile({
      wasteRecycled: (this.currentUser.wasteRecycled || 0) + wasteKg,
      co2Saved: (this.currentUser.co2Saved || 0) + co2SavedKg
    });
  }
}

// Export singleton instance
export const authService = new AuthService();

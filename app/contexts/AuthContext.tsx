import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import type { User } from '../services/authService';

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  // Helper functions for UI components
  getUserDisplayName: () => string;
  getUserInitials: () => string;
  getUserAvatar: () => string | null;
  // Profile management
  updateProfile: (updates: Partial<User>) => Promise<void>;
  addEcoPoints: (points: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state and listen for changes
  useEffect(() => {
    console.log('AuthProvider initializing...');
    setIsLoading(true);
    
    // Listen for auth state changes
    const unsubscribe = authService.onAuthStateChange((user) => {
      console.log('Auth state changed:', user);
      setUser(user);
      setIsLoading(false);
    });

    // Get initial user state
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);

    // Cleanup subscription
    return unsubscribe;
  }, []);

  const signInWithGoogle = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Starting Google sign-in...');
      
      const user = await authService.signInWithGoogle();
      console.log('Google sign-in successful:', user);
      
      // User state will be updated automatically through the auth listener
    } catch (error: any) {
      console.error('Google sign-in failed:', error);
      setError(error.message || 'Failed to sign in with Google');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setError(null);
      await authService.signOut();
      console.log('Successfully logged out');
      // User state will be updated automatically through the auth listener
    } catch (error: any) {
      console.error('Logout failed:', error);
      setError(error.message || 'Failed to log out');
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    try {
      setError(null);
      await authService.updateUserProfile(updates);
      console.log('Profile updated successfully');
    } catch (error: any) {
      console.error('Profile update failed:', error);
      setError(error.message || 'Failed to update profile');
      throw error;
    }
  };

  const addEcoPoints = async (points: number): Promise<void> => {
    try {
      setError(null);
      await authService.addEcoPoints(points);
      console.log(`Added ${points} eco points successfully`);
    } catch (error: any) {
      console.error('Failed to add eco points:', error);
      setError(error.message || 'Failed to add eco points');
      throw error;
    }
  };

  const isAuthenticated = !!user;

  // Helper functions for UI components
  const getUserDisplayName = (): string => {
    if (!user) return 'Guest';
    return user.displayName || user.name || user.email?.split('@')[0] || 'User';
  };

  const getUserInitials = (): string => {
    if (!user) return 'G';
    const name = user.displayName || user.name || user.email || '';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  const getUserAvatar = (): string | null => {
    return user?.photoURL || null;
  };

  return (
    <AuthContext.Provider value={{
      user,
      signInWithGoogle,
      logout,
      isAuthenticated,
      isLoading,
      error,
      getUserDisplayName,
      getUserInitials,
      getUserAvatar,
      updateProfile,
      addEcoPoints
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface LoginCredentials {
  phone: string;
  otp?: string;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  city: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUser: User = {
  id: '1',
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  phone: '+91 98765 43210',
  city: 'Mumbai',
  avatar: '👩‍🦱'
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    console.log('AuthProvider initializing...');
    if (typeof window === 'undefined') {
      console.log('Window is undefined, skipping localStorage check');
      return;
    }
    
    const savedUser = localStorage.getItem('user');
    console.log('Saved user from localStorage:', savedUser);
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      console.log('Parsed user:', parsedUser);
      setUser(parsedUser);
    }
    setIsLoading(false);
    console.log('AuthProvider initialization complete');
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    console.log('Login attempt:', credentials);
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock authentication - in real app, verify with backend
    if (credentials.phone && credentials.otp === '1234') {
      console.log('Login successful, setting user:', mockUser);
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      console.log('User saved to localStorage');
    } else {
      console.log('Login failed - invalid credentials');
      throw new Error('Invalid OTP. Please try 1234 for demo.');
    }
    
    setIsLoading(false);
  };

  const register = async (data: RegisterData): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      avatar: '👤'
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated,
      isLoading
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

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  sessionToken: string | null;
  setSessionToken: (token: string | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('session_token');
    if (storedToken) {
      setSessionToken(storedToken);
    }
  }, []);

  // Save token to localStorage when it changes
  useEffect(() => {
    if (sessionToken) {
      localStorage.setItem('session_token', sessionToken);
    } else {
      localStorage.removeItem('session_token');
    }
  }, [sessionToken]);

  const logout = () => {
    setSessionToken(null);
    localStorage.removeItem('session_token');
  };

  const isAuthenticated = !!sessionToken;

  return (
    <AuthContext.Provider value={{
      sessionToken,
      setSessionToken,
      isAuthenticated,
      logout
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

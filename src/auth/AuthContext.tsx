import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: any;
  loading: boolean;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  loginWithRedirect: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Fallback auth implementation for development
const useFallbackAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate auth check
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const loginWithRedirect = async () => {
    // Simulate login
    const mockUser = {
      name: 'Demo User',
      email: 'demo@example.com',
      picture: 'https://via.placeholder.com/150'
    };
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isLoading: loading,
    isAuthenticated,
    loginWithRedirect,
    logout: signOut
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use fallback auth for development
  const { user, isLoading, isAuthenticated, logout, loginWithRedirect } = useFallbackAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  const signOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user: user || null,
    loading: loading || isLoading,
    signOut,
    isAuthenticated,
    loginWithRedirect,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
  phone?: string;
  profilePicture?: string;
  authenticated: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize from localStorage on mount
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('shakti_user');
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (error) {
          console.error("Failed to parse stored user:", error);
          localStorage.removeItem('shakti_user');
        }
      }
    }
    return null;
  });
  const router = useRouter();

  const login = (userData: User) => {
    setUser(userData);
    try {
      localStorage.setItem('shakti_user', JSON.stringify(userData));
    } catch (error) {
      console.error("Failed to save user data:", error);
      alert("Unable to save profile data. Please try with a smaller profile picture.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shakti_user');
    router.push('/auth/login');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      try {
        localStorage.setItem('shakti_user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Failed to save profile updates:", error);
        // Revert the update
        setUser(user);
        throw new Error("Storage quota exceeded. Please use a smaller profile picture.");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

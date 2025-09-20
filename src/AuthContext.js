import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthContext: Initializing...');
    
    const checkSession = async () => {
      try {
        console.log('AuthContext: Checking session...');
        const { data: { session } } = await supabase.auth.getSession();
        console.log('AuthContext: Session data:', session);
        setUser(session?.user || null);
      } catch (error) {
        console.error('AuthContext: Error getting session:', error);
      } finally {
        console.log('AuthContext: Finished checking session');
        setLoading(false);
      }

      console.log('AuthContext: Setting up auth state change listener...');
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        console.log('AuthContext: Auth state changed:', _event, session);
        setUser(session?.user || null);
        setLoading(false);
      });

      return () => {
        console.log('AuthContext: Cleaning up subscription');
        subscription.unsubscribe();
      };
    };

    checkSession();
  }, []);

  const value = {
    signUp: (data) => {
      console.log('AuthContext: Signing up with data:', data);
      return supabase.auth.signUp(data);
    },
    signIn: (data) => {
      console.log('AuthContext: Signing in with data:', data);
      return supabase.auth.signInWithPassword(data);
    },
    signOut: () => {
      console.log('AuthContext: Signing out');
      return supabase.auth.signOut();
    },
    user,
  };

  console.log('AuthContext: Rendering with user:', user, 'loading:', loading);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  console.log('AuthContext: useAuth hook called');
  return useContext(AuthContext);
};
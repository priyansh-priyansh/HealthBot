import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const mappedUser = {
          id: firebaseUser.uid,
          name:
            firebaseUser.displayName ||
            firebaseUser.email?.split("@")[0] ||
            "User",
          email: firebaseUser.email || "",
          avatar: firebaseUser.photoURL || null,
          loginTime: new Date().toISOString(),
        };
        setUser(mappedUser);
        localStorage.setItem("healthbot_user", JSON.stringify(mappedUser));
      } else {
        setUser(null);
        localStorage.removeItem("healthbot_user");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUp = async ({ name, email, password }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(cred.user, { displayName: name });
    }
    return cred.user;
  };

  const signIn = async ({ email, password }) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    loading,
    // kept for backward compatibility; no-ops in Firebase flow
    login: (userData) => {
      console.warn(
        "Deprecated: use signIn/signUp from AuthContext instead of login()"
      );
      return signIn({ email: userData.email, password: userData.password });
    },
    logout: signOutUser,
    signIn,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import React, { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import { auth } from "../services/config";
import { logOut, logIn, signUp, getUserIsPremium } from "../services/auth";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext({
  user: null,
  onLogin: (email, password) => {},
  onLogOut: () => {},
  onRegister: (email, password, firstname) => {},
  isPremium: false,
  setIsPremium: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigation();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkUserPremium = async () => {
      try {
        if (user) {
          const res = await getUserIsPremium(user.uid);
          setIsPremium(res);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (!user) {
      logOut().then(() => {
        navigator.navigate("Login");
      });
    }

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      if (authUser) {
        checkUserPremium();
      } else {
        setIsPremium(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        onLogin: logIn,
        onLogOut: logOut,
        onRegister: signUp,
        isPremium: isPremium,
        setIsPremium: setIsPremium,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

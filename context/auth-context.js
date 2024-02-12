import React, { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import { auth } from "../services/config";
import { logOut, logIn, signUp } from "../services/auth";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext({
  user: null,
  onLogin: (email, password) => {},
  onLogOut: () => {},
  onRegister: (email, password, firstname) => {},
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

  useEffect(() => {
    if (!user) {
      logOut().then(() => {
        navigator.navigate("Login");
      });
    }
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setIsLoading(false);
      console.log("authUser: ", authUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        onLogin: logIn,
        onLogOut: logOut,
        onRegister: signUp,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

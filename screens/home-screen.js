import React, { useEffect } from "react";
import { TouchableOpacity, ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/auth-context";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, onLogOut } = useAuth();

  useEffect(() => {
    console.log("home:", user);
  }, []);

  const handleLogout = async () => {
    try {
      await onLogOut();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <ScrollView>
      <Text>home {user ? user.displayName : ""}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Salir</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;

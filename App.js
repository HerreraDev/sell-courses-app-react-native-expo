import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/login-screen";
import HomeScreen from "./screens/home-screen";
import RegisterScreen from "./screens/register-screen";

import { SafeAreaView } from "react-native-safe-area-context";
import AuthContextProvider from "./context/auth-context";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <AuthContextProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </AuthContextProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "white", // Puedes ajustar el color de fondo según tus preferencias
  },
});

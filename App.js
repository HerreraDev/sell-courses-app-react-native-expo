import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/login-screen";
import HomeScreen from "./screens/home/home-screen";
import RegisterScreen from "./screens/register-screen";

import { SafeAreaView } from "react-native-safe-area-context";
import AuthContextProvider from "./context/auth-context";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import BottomNavigationBar from "./components/UI/bottom-navigation-bar/bottom-navigation-bar";
import VideoPlayer from "./screens/video-player/video-player";
import Suscription from "./screens/suscription/suscription";

export default function App() {
  const Stack = createNativeStackNavigator();

  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

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
            <Stack.Screen
              name="VideoPlayer"
              component={VideoPlayer}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Suscription"
              component={Suscription}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
          <BottomNavigationBar />
        </AuthContextProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

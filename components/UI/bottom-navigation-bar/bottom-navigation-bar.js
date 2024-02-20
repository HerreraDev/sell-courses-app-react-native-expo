import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { useAuth } from "../../../context/auth-context";
import bottomNavigationBarStyles from "../../../css-styles/bottom-navigation-bar/bottom-navigation-bar-styles";
import { useNavigation } from "@react-navigation/native";

export default function BottomNavigationBar() {
  const { user, onLogOut } = useAuth();
  const navigation = useNavigation();
  const [activeRoute, setActiveRoute] = useState(1);

  const handleLogout = async () => {
    try {
      setActiveRoute(1);
      await onLogOut();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const handleRedirectHome = () => {
    setActiveRoute(1);
    navigation.navigate("Home");
  };

  const handleRedirectVideoPlayer = () => {
    setActiveRoute(2);
    navigation.navigate("VideoPlayer");
  };

  const handleRedirectSuscription = () => {
    setActiveRoute(3);
    navigation.navigate("Suscription");
  };

  let content = user ? (
    <View style={bottomNavigationBarStyles.container}>
      <TouchableOpacity
        onPress={handleRedirectHome}
        style={bottomNavigationBarStyles.navigationButton}
      >
        <Image
          style={[
            bottomNavigationBarStyles.navigationButtonImage,
            activeRoute === 1
              ? bottomNavigationBarStyles.navigationButtonImageIsActive
              : "",
          ]}
          source={require("../../../assets/icons/home-icon.png")}
          resizeMode={"center"}
        />
        <Text style={bottomNavigationBarStyles.navigationButtonText}>
          Inicio
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleRedirectVideoPlayer}
        style={bottomNavigationBarStyles.navigationButton}
      >
        <Image
          style={[
            bottomNavigationBarStyles.navigationButtonImage,
            activeRoute === 2
              ? bottomNavigationBarStyles.navigationButtonImageIsActive
              : "",
          ]}
          source={require("../../../assets/icons/video-player-icon.png")}
          resizeMode={"center"}
        />
        <Text style={bottomNavigationBarStyles.navigationButtonText}>
          Video
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleRedirectSuscription}
        style={bottomNavigationBarStyles.navigationButton}
      >
        <Image
          style={[
            bottomNavigationBarStyles.navigationButtonImage,
            activeRoute === 3
              ? bottomNavigationBarStyles.navigationButtonImageIsActive
              : "",
          ]}
          source={require("../../../assets/icons/suscription-icon.png")}
          resizeMode={"center"}
        />
        <Text style={bottomNavigationBarStyles.navigationButtonText}>
          Suscripción
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogout}
        style={bottomNavigationBarStyles.navigationButton}
      >
        <Image
          style={bottomNavigationBarStyles.navigationButtonImage}
          source={require("../../../assets/icons/logout-icon.png")}
          resizeMode={"center"}
        />
        <Text style={bottomNavigationBarStyles.navigationButtonText}>
          Salir
        </Text>
      </TouchableOpacity>
    </View>
  ) : null;
  return content;
}

import React, { useEffect, useState } from "react";
import { View, Alert, Text } from "react-native";
import suscriptionStyles from "../../css-styles/suscription/suscription-styles";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/config";
import Loader from "../../components/shared/loader";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/auth-context";

export default function SuscriptionSuccess() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { user, onLogOut } = useAuth();

  const userRef = doc(db, "users", user ? user.uid : "x");

  const handleSuscriptionSuccess = async () => {
    try {
      await updateDoc(userRef, {
        isPremium: true,
        hasBecomePremium: serverTimestamp(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    handleSuscriptionSuccess()
      .then(() => {
        Alert.alert(
          "SUCCESS",
          "Cuenta actualizada a Premium, por favor vuelva a iniciar sesión"
        );
        setIsLoading(false);
        onLogOut();
        navigation.navigate("Home");
      })
      .catch((error) => {
        Alert.alert(
          "ERROR",
          "Error al actualizar su perfil, por favor ponganse en contacto con mail"
        );
        setIsLoading(false);
        console.error(error);
        navigation.navigate("Suscription");
      });
  }, []);

  return (
    <View style={suscriptionStyles.container}>
      {isLoading ? <Loader /> : <Text></Text>}
    </View>
  );
}

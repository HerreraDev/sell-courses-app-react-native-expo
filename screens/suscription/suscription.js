import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import suscriptionStyles from "../../css-styles/suscription/suscription-styles";
import { useAuth } from "../../context/auth-context";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/config";

export default function Suscription() {
  const benefits = [
    { id: 1, text: "Contenido exclusivo" },
    { id: 2, text: "Canal de consultas personalizadas" },
  ];

  const { isPremium, setIsPremium, user } = useAuth();

  const userRef = doc(db, "users", user ? user.uid : "x");

  const handleSuscribe = async () => {
    try {
      await updateDoc(userRef, {
        isPremium: true,
        hasBecomePremium: serverTimestamp(),
      });

      setIsPremium(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={suscriptionStyles.container}>
      {/* <ScrollView> */}
      <View style={suscriptionStyles.suscriptionCard}>
        <View style={suscriptionStyles.suscriptionCardHeader}>
          <Text style={suscriptionStyles.suscriptionCardHeaderTitle}>
            Suscripción
          </Text>
          <Text style={suscriptionStyles.suscriptionCardHeaderSubtitle}>
            ¡Accede a todo el contenido!
          </Text>
          <Text style={suscriptionStyles.suscriptionCardHeaderPrice}>
            $2000 /mes
          </Text>
          <TouchableOpacity onPress={handleSuscribe}>
            <Text style={suscriptionStyles.suscriptionCardHeaderButton}>
              Suscribirse
            </Text>
          </TouchableOpacity>
        </View>
        <View style={suscriptionStyles.suscriptionCardBody}>
          {benefits.map((benefit) => (
            <View
              style={suscriptionStyles.suscriptionCardBodyBenefits}
              key={benefit.id}
            >
              <Image
                source={require("../../assets/icons/check.png")}
                resizeMode="center"
              />
              <Text style={suscriptionStyles.suscriptionCardBodyText}>
                {benefit.text}
              </Text>
            </View>
          ))}
        </View>
        <View style={suscriptionStyles.suscriptionCardFooter}>
          <Text style={suscriptionStyles.suscriptionCardFooterText}>
            Estado de la suscripción:
            <Text style={suscriptionStyles.suscriptionCardFooterBenefitState}>
              {isPremium ? " Activa" : " Sin activar"}
            </Text>
          </Text>
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
}

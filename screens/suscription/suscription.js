import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import suscriptionStyles from "../../css-styles/suscription/suscription-styles";
import { useAuth } from "../../context/auth-context";
import {
  doc,
  updateDoc,
  serverTimestamp,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../../services/config";
import Loader from "../../components/shared/loader";

export default function Suscription() {
  const [suscriptionPrice, setSuscriptionPrice] = useState(0);
  const [loading, setIsLoading] = useState(false);

  const benefits = [
    { id: 1, text: "Contenido exclusivo" },
    { id: 2, text: "Canal de consultas personalizadas" },
  ];

  const { isPremium, setIsPremium, user } = useAuth();

  const userRef = doc(db, "users", user ? user.uid : "x");

  const handleSuscribe = async () => {
    if (isPremium) return;
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

  useEffect(() => {
    const fetchCollectionData = async (collectionDataName) => {
      setIsLoading(true);
      try {
        let auxDataPrice = 0;
        const querySnapshot = await getDocs(collection(db, collectionDataName));

        querySnapshot.forEach((doc) => {
          let auxData = doc.data();
          auxDataPrice = auxData;
        });
        setSuscriptionPrice(auxDataPrice.precio);
        setIsLoading(false);
      } catch (error) {
        Alert.alert("Error al obtener precio de la suscripción");
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchCollectionData("precioPremium");
  }, []);

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
            ${suscriptionPrice} /mes
          </Text>
          {loading ? (
            <Loader />
          ) : (
            <TouchableOpacity onPress={handleSuscribe}>
              <Text style={suscriptionStyles.suscriptionCardHeaderButton}>
                {isPremium ? "Suscripción Activa" : "Suscribirse"}
              </Text>
            </TouchableOpacity>
          )}
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

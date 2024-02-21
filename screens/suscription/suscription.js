import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import suscriptionStyles from "../../css-styles/suscription/suscription-styles";

export default function Suscription() {
  const benefits = [
    { id: 1, text: "Contenido exclusivo" },
    { id: 2, text: "Canal de consultas personalizadas" },
  ];

  const [suscriptionState, setSuscriptionState] = useState(false);

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
          <TouchableOpacity>
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
              {" "}
              {suscriptionState ? "Activa" : "Sin activar"}
            </Text>
          </Text>
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
}

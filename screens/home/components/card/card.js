import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import cardStyles from "../../../../css-styles/card/card-styles";
import commonStyles from "../../../../css-styles/commom-styles";
import { useNavigation } from "@react-navigation/native";
import { useNavigationContext } from "../../../../context/nagivation-context";

export default function Card(props) {
  const navigation = useNavigation();
  const { setSelectedRoute } = useNavigationContext();

  const handleCardClick = () => {
    setSelectedRoute(2);
    navigation.navigate("VideoPlayer", {
      videoProps: {
        id: props.id,
        title: props.title,
        description: props.description,
        source: props.source,
        videoUrl: props.videoUrl,
      },
    });
  };

  return (
    <View id={props.id} style={[cardStyles.card]} onTouchEnd={handleCardClick}>
      <View style={cardStyles.cardInfoContainer}>
        <Text style={cardStyles.cardTitle}>{props.title}</Text>
        <Text style={cardStyles.cardDescription}>{props.description}</Text>
      </View>
      <View style={cardStyles.cardImageContainer}>
        <Image
          source={{ uri: props.source }}
          resizeMode={"cover"}
          style={cardStyles.cardImage}
        />
      </View>
      {props.isPremium ? <View style={commonStyles.overlay} /> : ""}
    </View>
  );
}

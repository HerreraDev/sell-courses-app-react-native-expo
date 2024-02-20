import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import cardStyles from "../../../../css-styles/card/card-styles";
import commonStyles from "../../../../css-styles/commom-styles";

export default function Card(props) {
  return (
    <View id={props.id} style={[cardStyles.card]}>
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

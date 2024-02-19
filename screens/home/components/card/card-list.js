import React from "react";
import { View } from "react-native";
import Card from "./card";

export default function CardList(props) {
  const cardList = props.cards.map((card) => (
    <Card
      id={card.id}
      key={card.id}
      title={card.title}
      description={card.description}
      source={card.source}
    />
  ));

  return (
    <View
      style={{
        flexDirection: "column",
        paddingHorizontal: 20,
      }}
    >
      {cardList}
    </View>
  );
}

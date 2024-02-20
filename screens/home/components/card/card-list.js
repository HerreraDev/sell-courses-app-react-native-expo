import React from "react";
import { View } from "react-native";
import Card from "./card";
import { useAuth } from "../../../../context/auth-context";

export default function CardList(props) {
  const { isPremium } = useAuth();

  const cardList = props.cards.map((card, index) => (
    <Card
      id={card.id}
      key={card.id}
      title={card.title}
      description={card.description}
      source={card.source}
      isPremium={!isPremium && index !== 0 ? true : false}
    />
  ));

  return (
    <View
      style={{
        flexDirection: "column",
      }}
    >
      {cardList}
      {!isPremium ? (
        <Card
          id={"-1"}
          key={"-1"}
          title={"¡Aún no eres premium!"}
          description={"¡Suscribete para más contenido!"}
          source={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeCckQy7XXljljoObSEJ5OEvNpaozaodaw2nAsoxqMenvH7lRGUm9QWpICP8o8TTeS2SM&usqp=CAU"
          }
        />
      ) : (
        ""
      )}
    </View>
  );
}

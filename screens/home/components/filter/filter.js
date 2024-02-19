import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import styles from "../../../../css-styles/filter/filter-styles";

export default function Filter(props) {
  return (
    <View
      id={props.id}
      style={[styles.filter, props.isActive ? styles.filterIsActive : ""]}
    >
      <Image
        source={{ uri: props.source }}
        resizeMode={"cover"}
        style={styles.filterImage}
      />
      <Text style={styles.filterText}>{props.name}</Text>
    </View>
  );
}

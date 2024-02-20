import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../../../../css-styles/filter/filter-styles";
import commonStyles from "../../../../css-styles/commom-styles";

export default function Filter(props) {
  const handleFilterPress = () => {
    props.onFilterChange(props.id);
  };

  return (
    <TouchableOpacity onPress={handleFilterPress}>
      <View
        onTo
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
    </TouchableOpacity>
  );
}

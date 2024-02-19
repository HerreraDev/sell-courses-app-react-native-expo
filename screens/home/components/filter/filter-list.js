import React from "react";
import Filter from "./filter";
import { View } from "react-native";

export default function FilterList(props) {
  const filterList = props.filters.map((filter, index) => (
    <Filter
      id={filter.id}
      key={filter.id}
      name={filter.name}
      source={filter.source}
      isActive={index === 0}
    />
  ));

  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 20,
        marginTop: 18,
        marginBottom: 46,
      }}
    >
      {filterList}
    </View>
  );
}

import React, { useState } from "react";
import Filter from "./filter";
import { View } from "react-native";

export default function FilterList(props) {
  const [activeFilter, setActiveFilter] = useState("1");

  const handleFilterChange = (filterId) => {
    props.onFilterChange(filterId);
    setActiveFilter(filterId);
  };

  const filterList = props.filters.map((filter) => (
    <Filter
      id={filter.id}
      key={filter.id}
      name={filter.name}
      source={filter.source}
      isActive={filter.id === activeFilter}
      onFilterChange={handleFilterChange}
    />
  ));

  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 20,
        marginTop: "10%",
      }}
    >
      {filterList}
    </View>
  );
}

import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useAuth } from "../../context/auth-context";
import FilterList from "./components/filter/filter-list";
import CardList from "./components/card/card-list";
import { db } from "../../services/config";
import { collection, getDocs } from "firebase/firestore";
import homeStyles from "../../css-styles/home/home-styles";

const HomeScreen = () => {
  const [filters, setFilters] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState();

  useEffect(() => {
    const fetchCollectionData = async (collectionDataName) => {
      try {
        const filters = [];
        const videos = [];

        const querySnapshot = await getDocs(collection(db, collectionDataName));

        if (collectionDataName === "filtros") {
          querySnapshot.forEach((doc) => {
            let auxData = doc.data();
            filters.push(auxData);
          });
          setFilters(filters);
          setSelectedFilter(filters[0].id);
        } else {
          querySnapshot.forEach((doc) => {
            let auxData = doc.data();
            videos.push(auxData);
          });
          setCards(videos);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCollectionData("videos");
    fetchCollectionData("filtros");
  }, []);

  const handleFilterChange = (filterId) => {
    setSelectedFilter(filterId);
  };

  const filteredCards = cards.filter(
    (card) => card.filterId === selectedFilter
  );

  return (
    <View style={homeStyles.container}>
      <View style={{ height: "20%" }}>
        <ScrollView horizontal>
          <FilterList filters={filters} onFilterChange={handleFilterChange} />
        </ScrollView>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 68 }}
      >
        <CardList cards={filteredCards} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

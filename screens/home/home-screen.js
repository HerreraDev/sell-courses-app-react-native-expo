import React, { useEffect, useState } from "react";
import { TouchableOpacity, ScrollView, Text, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/auth-context";
import FilterList from "./components/filter/filter-list";
import CardList from "./components/card/card-list";
import { db } from "../../services/config";
import { collection, getDocs } from "firebase/firestore";
import commonStyles from "../../css-styles/commom-styles";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, onLogOut } = useAuth();
  const [filters, setFilters] = useState([]);
  const [cards, setCards] = useState([]);

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

    fetchCollectionData("filtros");
    fetchCollectionData("videos");
  }, []);

  const handleLogout = async () => {
    try {
      await onLogOut();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView horizontal>
        <FilterList filters={filters} />
      </ScrollView>
      <ScrollView>
        <CardList cards={cards} />
      </ScrollView>
      <Text style={{ color: "red" }}>home {user ? user.displayName : ""}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={{ color: "red" }}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

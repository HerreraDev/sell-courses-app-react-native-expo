import { StyleSheet } from "react-native";
import { colors, fonts } from "../commom-styles";

const cardStyles = StyleSheet.create({
  card: {
    width: "auto",
    height: 80,
    backgroundColor: colors.primary,
    flexDirection: "row",
    borderRadius: 8,
    marginBottom: 19,
  },
  cardInfoContainer: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    width: "70%",
  },
  cardTitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  cardImageContainer: {
    width: "30%",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});

export default cardStyles;

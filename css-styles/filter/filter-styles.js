import { StyleSheet, Platform } from "react-native";
import { colors, fonts } from "../commom-styles";

const styles = StyleSheet.create({
  filter: {
    width: 56,
    height: 72,
    borderRadius: 8,
    marginRight: 15,
  },
  filterImage: {
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    overflow: "hidden",
  },
  filterText: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.white,
    textAlign: "center",
  },
  filterIsActive: {
    backgroundColor: colors.primary,
  },
});

export default styles;

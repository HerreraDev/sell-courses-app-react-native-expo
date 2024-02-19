import { StyleSheet } from "react-native";
import { colors } from "../commom-styles";

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
  },
});

export default homeStyles;

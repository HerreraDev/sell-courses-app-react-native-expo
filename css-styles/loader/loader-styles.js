import { StyleSheet } from "react-native";
import { colors } from "../commom-styles";

const loaderStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  activityIndicatorWrapper: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default loaderStyles;

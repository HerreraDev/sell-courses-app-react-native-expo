import { StyleSheet } from "react-native";
import { colors, fonts } from "../commom-styles";

const bottomNavigationBarStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 10,
    marginBottom: 16,
    borderRadius: 8,
    paddingHorizontal: 24,
    height: "14%",
  },
  navigationButton: {
    alignItems: "center",
  },
  navigationButtonImage: {
    width: 60,
    height: 12,
    borderRadius: 8,
    padding: 14,
  },
  navigationButtonText: {
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  navigationButtonImageIsActive: {
    backgroundColor: colors.primary,
  },
});

export default bottomNavigationBarStyles;

import { StyleSheet } from "react-native";
import { colors, fonts } from "../commom-styles";

const videoPlayerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
  },
  videoContainer: {
    width: "100%",
    height: "40%",
    marginBottom: "20%",
  },
  informationContainer: {
    width: "100%",
  },
  informationContainerTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.white,
  },
  informationContainerDescription: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.white,
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
});

export default videoPlayerStyles;

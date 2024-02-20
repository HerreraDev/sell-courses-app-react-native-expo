import { StyleSheet } from "react-native";

export const colors = {
  primary: "#BA8744",
  secondary: "#000000",
  accent: "#4777E5",
  white: "#FFFFFF",
};

export const fonts = {
  regular: "Poppins_400Regular",
  bold: "Poppins_700Bold",
};

const commonStyles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    paddingHorizontal: 40,
  },
  pageContainer: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  input: {
    height: 42,
    width: "100%",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
    fontFamily: fonts.regular,
  },
  title3: {
    fontSize: 14,
    marginTop: 16,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  buttonContainer: {
    width: "100%",
    height: 42,
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    textAlign: "center",
    padding: 10,
    fontFamily: fonts.bold,
  },
  title5: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fonts.regular,
  },
  accentLink: {
    color: colors.accent,
    fontFamily: fonts.regular,
  },
  ["mt-16"]: {
    marginTop: 16,
  },
  ["mb-16"]: {
    marginBottom: 16,
  },
  alignSelfStart: {
    alignSelf: "flex-start",
  },
  androidShadow: {
    elevation: 10,
    shadowColor: colors.white,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(128,128,128, 0.7)",
    borderRadius: 8,
  },
});

export default commonStyles;

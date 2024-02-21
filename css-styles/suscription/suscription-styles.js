import { StyleSheet } from "react-native";
import { colors, fonts } from "../commom-styles";

const suscriptionStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
    paddingTop: "10%",
  },
  suscriptionCard: {
    backgroundColor: colors.white,
    width: "100%",
    height: "auto",
    borderRadius: 20,
    marginBottom: "50%",
  },
  suscriptionCardHeader: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    alignItems: "center",
    padding: 16,
  },
  suscriptionCardHeaderTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  suscriptionCardHeaderSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: "rgba(116, 116, 116, 1)",
    marginBottom: 24,
  },
  suscriptionCardHeaderPrice: {
    fontFamily: fonts.bold,
    fontSize: 30,
    marginBottom: 24,
  },
  suscriptionCardHeaderButton: {
    borderRadius: 8,
    backgroundColor: colors.primary,
    padding: 8,
    fontFamily: fonts.bold,
    width: "auto",
    elevation: 20,
    shadowColor: "#000000",
  },
  suscriptionCardBody: {
    padding: 16,
  },
  suscriptionCardBodyBenefits: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  suscriptionCardBodyText: {
    fontFamily: fonts.bold,
    fontSize: 12,
  },
  suscriptionCardFooter: {
    borderTopWidth: 2,
    borderTopColor: colors.primary,
    padding: 16,
  },
  suscriptionCardFooterText: {
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  suscriptionCardFooterBenefitState: {
    fontFamily: fonts.bold,
    fontSize: 12,
  },
});

export default suscriptionStyles;

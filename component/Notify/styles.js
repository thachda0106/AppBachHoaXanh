import { StyleSheet } from "react-native";
import Color from "../../Constant/Color";
import {Styles} from "../../Constant/Styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 36,
    display: "flex",
    backgroundColor: "white",
	position: 'relative'
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.colorPrimary,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#999",
    padding: 8,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 20,
    marginLeft: 20,
    color: "white",
  },
  btnAccept: {
    height: 48,
    color: "white",
    backgroundColor: Color.colorPrimary,
  },
  btnAcceptText: {
    color: "white",
    lineHeight: 48,
    textAlign: "center",
    fontSize: 18,
  },
  alertsWrapper: {
    paddingTop: 10,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  markAsReadBtn: {
    position: "absolute",
    bottom: 80,
    right: 12,
    width: 60,
    height: 60,
    backgroundColor: '#098E23',
    borderRadius: 180,
    zIndex: 1,
    ...Styles.flexCenter
  },
  markAsReadText: {
    ...Styles.GraySmallText,
    textDecorationLine: "underline",
    fontStyle: "italic",
  },
});

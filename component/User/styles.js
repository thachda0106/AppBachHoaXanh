import { StyleSheet } from "react-native";
import Color from "../../Constant/Color";
export const styles = StyleSheet.create({
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    position: "relative",
    flex: 1,
    paddingTop: 36,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    width: "100%",
    backgroundColor: Color.colorPrimary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 180,
    overflow: "hidden",
  },
  userAvatar: {
    resizeMode: "cover",
    flex: 1,
    aspectRatio: 1,
  },
  customerName: {
    marginLeft: 12,
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  btnSignIn: {
    backgroundColor: "white",
    padding: 9,
    marginHorizontal: 8,
  },
  btnSignInText: {
    color: Color.colorPrimary,
  },
  btnRegister: {
    borderWidth: 1,
    borderColor: "white",
    borderStyle: "solid",
    padding: 8,
  },
  btnRegisterText: {
    color: "white",
    marginHorizontal: 8,
  },
  options: {
    position: "relative",
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  optionItem: {
    width: "100%",
    borderColor: "transparent",
    borderBottomColor: Color.colorGray,
    borderWidth: 1,
    borderStyle: "solid",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    paddingLeft: 16,
  },
  optionItemIcon: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  optionItemText: {
    color: "black",
    marginLeft: 24,
  },
  errorOverlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
  },
});

import { StyleSheet } from "react-native";
import Color from "../../../Constant/Color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    paddingTop: 36,
    display: "flex",
    alignItems: "center",
  },
  backWrapper: {
    padding: 8,
    width: "100%",
    backgroundColor: "white",
    borderStyle: "solid",
    borderBottomColor: Color.colorLightGray,
    borderBottomWidth: 1,
  },
  logo: {
    width: "80%",
    resizeMode: "contain",
    // backgroundColor: Color.colorPrimary,
  },
  form: {
    width: "80%",
    display: "flex",
    alignItems: "center",
    marginTop: 12,
  },
  inputWrapper: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginTop: 18,
  },
  input: {
    marginLeft: 20,
    fontSize: 14,
    width: "70%",
  },
  loginButton: {
    width: "100%",
    backgroundColor: Color.colorPrimary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
  forgetPassBtn: {
    width: "100%",
    padding: 12,
    margin: 10,
  },
  forgetPassText: {
    color: "#666",
    textDecorationLine: "underline",
    textAlign: "right",
  },
  registerWrapper: {
    padding: 12,
    marginTop: 12,
    display: "flex",
    alignItems: "center",
    fontSize: 16,
  },
  registerButton: {
    color: Color.colorPrimary,
    paddingLeft: 12,
    fontSize: 16,
  },
  sendOtpBtn: {
    position: 'absolute',
    right: 10,
    padding: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
    shadowColor: "#ccc",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.9,
  },
  sendOtpText: {
    color: "#1796f0",
  },
});

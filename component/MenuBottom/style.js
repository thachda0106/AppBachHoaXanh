import { StyleSheet } from "react-native";
import Color from "../../Constant/Color";
import { Styles } from "../../Constant/Styles";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 40,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    margin: 4,
  },
  itemTxt: {
    fontSize: 10,
    color: "black",
  },
  itemActive: {
    color: Color.colorPrimary,
  },
  notifyNumber: {
    ...Styles.flexCenter,
    position: "absolute",
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    backgroundColor: "red",
    borderRadius: 20,
  },
  notifyNumberText: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },
});

import { StyleSheet } from "react-native";
import Color from "../../../Constant/Color";

export const styles = StyleSheet.create({
  container: {
    flex: 11,
    backgroundColor: 'white',
    
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap"
  },
  item: {
    width: 100/3 + "%",
    height: 100,
    backgroundColor: 'transparent',
    padding: 4,
  },
  itemBackground: {
    width: '100%',
    height: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  itemImg: {
    width: "90%",
    resizeMode: "contain",
    top: 0,
    flex: 2,
  },
  itemText: {
    fontSize: 12,
    color: "black",
    flex: 1,
    textAlign: "center",
  },
});

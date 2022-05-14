import { StyleSheet } from "react-native";
import Color from "../../../Constant/Color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 150,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#ccc",
    paddingVertical: 12,
  },
  img: {
    width: 80,
    height: 60,
    resizeMode: "contain",
  },
  infoWrapper: {
    marginLeft: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
      color: 'black',
      marginBottom: 8
  },
  type:{
    backgroundColor: '#ccc',
    padding: 4,
    color: '#666',
    marginBottom: 8
  },
  priceWrapper: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8
  },
  originPrice:{
    fontSize: 13,
    color: '#666',
    marginRight: 8,
    textDecorationLine: 'line-through'
  },
  salePrice:{
    fontSize: 13,
    color: Color.colorPrimary
  },
  quantityWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  btnQuantityAdj: {
      width: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.colorPrimaryButton,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Color.colorPrimary,
  },
  quantityText: {
      width: 24,
    textAlign: "center",
    fontSize: 18,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderTopColor: Color.colorPrimary,
    borderBottomColor: Color.colorPrimary,
  },
});

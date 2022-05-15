import { StyleSheet } from "react-native";
import Color from "../../../Constant/Color";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 12,
  },
  title: {
    padding: 12,
    color: "black",
    fontSize: 16,
    fontWeight: "bold"
  },
  flexWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  showMoreBtn:{
    textAlign: 'center',
    color: Color.colorGrayText,
    textDecorationLine: 'underline',
    marginVertical: 12
  },
  item: {
    padding: 8,
    width: 100 / 3 + "%",
  },
  itemBg: {
    position: 'relative',
    padding: 4,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 4
  },
  blinkSaleImg:{
    position: 'absolute',
    width: 40,
    resizeMode: 'contain',
    top: -160,
    left: 0,
    zIndex: 10
  },
  itemImg: {
    width: "96%",
    height: 100,
    resizeMode: "contain",
  },
  starWrapper:{
    width: '100%',
    marginVertical: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  starNumber:{
    fontSize: 12,
    marginHorizontal: 4
  },  
  itemName: {
    fontSize: 12,
    marginVertical: 8,
    height: 32,
  },
  itemPriceWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  itemPriceSale: {
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 4
  },
  itemPriceOrigin: {
    fontSize: 10,
    color: Color.colorGray,
    marginLeft: 8,
    textDecorationLine: "line-through",
  },
  itemBtnBuy: {
    width: "100%",
    height: 32,
    marginTop: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Color.colorPrimary,
    backgroundColor: Color.colorPrimaryButton,
    
  },
  itemBtnBuyText: {
    textAlign: "center",
    lineHeight: 32,
  },
});

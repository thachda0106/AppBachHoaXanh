import { StyleSheet } from "react-native";
import Color from "../../Constant/Color";
import Constants from "expo-constants";
import { Styles } from "../../Constant/Styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorPrimary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    width: "100%",
    backgroundColor: Color.colorPrimaryDark,
    display: "flex",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  headerText: {
    color: "white",
    fontSize: 12,
  },
  closeBtn: {},
  backAddressBtn: {},
  boldText: {
    fontWeight: "bold",
  },
  title: {
    width: "100%",
    backgroundColor: Color.colorPrimary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  titleText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
  addressList: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  hereWrapper: {
    display: "flex",
    flexDirection: "row",
    padding: 12,
  },
  hereText: {
    color: Color.colorPrimary,
    marginLeft: 4,
  },
  currentAddress:{
    padding: 12,
  },
  homeNumberWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 12,
    marginTop: -12
  },
  homeNumberInput: {
    ...Styles.BorderGray,
    height: 44,
    padding: 8
  },
  address:{
    marginBottom: 12,
    lineHeight: 18,
  },  
  okBtn:{
    padding: 12,
    backgroundColor: Color.colorPrimary,
    marginTop: 12,
    borderRadius: 4,
  },  
  okBtnText:{
    color: 'white',
    textAlign: 'center'
  },  
  searchWrapper: {
    width: "100%",
    paddingHorizontal: 12,
    marginTop: 4,
    display: "flex",
    justifyContent: "center",
  },
  searchBg: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Color.colorGrayText,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  searchText: {
    fontSize: 14,
    marginLeft: 4,
  },
  placeList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 12,
  },
  placeItem: {
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderColor: "transparent",
    borderBottomColor: Color.colorGray,
    borderWidth: 1,
    borderStyle: "solid",
  },
  placeItemBtn: {
    position: "absolute",
    right: 12,
  },
});

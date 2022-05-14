import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Color from "../../../Constant/Color";
import { Styles } from "../../../Constant/Styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorPrimaryButton,
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    padding: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    ...Styles.BlackLargeText,
    marginLeft: 12,
  },
  table: {
    backgroundColor: "white",
    margin: 12,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
  },
  tableImgWrapper: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    marginTop: -8,
    padding: 0,
  },
  tableImg: {
    resizeMode: "contain",
    width: 40,
    height: 40,
  },
  controlWrapper: {
    margin: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Color.colorGray,
    backgroundColor: "white",
  },
  controlTitle: {
    fontWeight: "bold",
  },
  controlName: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    borderBottomColor: Color.colorGray,
    height: 32,
    marginTop: 8,
    padding: 0,
  },
  controlImgWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 12,
  },
  controlImgBtn: {
    padding: 8,
  },
  controlImgBtnTxt: {
    fontSize: 12,
    textAlign: "center",
    color: Color.colorPrimary,
    textDecorationLine: "underline",
  },
  controlImg: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  controlBtnWrapper: {
    ...Styles.flexCenter,
  },
  controlAddBtn: {
    width: "100%",
    padding: 8,
    backgroundColor: Color.colorPrimaryLight,
    borderRadius: 20,
    ...Styles.flexCenter,
  },
  controlAddBtnTxt: {
    color: "white",
  },
  backToAddBtn: {
    position: "absolute",
    padding: 12,
    top: -12,
    right: 0,
    marginTop: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 1,
  },
  borderRed: {
    opacity: 0.2,
  },
  tableBtnWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerCategory: {
    backgroundColor: Color.colorLightGray,
    marginTop: 12,
  },
  controlNumberWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  controlNumber: {
    width: "30%",
  },
  dateWrapper: {
    width: "100%",
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
  },
  inputDate: {
    width: "49%",
    ...Styles.BorderGray,
    padding: 8,
    marginRight: 12,
    borderRadius: 4,
    color: '#444',
  },
  description: {
    borderWidth: 1,
    borderColor: Color.colorLightGray,
    borderStyle: "solid",
    borderRadius: 4,
    height: 120,
    textAlignVertical: "top",
    marginTop: 8,
    padding: 4,
  },
  searchWrapper: {
    ...Styles.BorderGray,
    borderColor: "#ccc",
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    marginVertical: 16,
  },
  searchText: {
    marginLeft: 12,
  },
});

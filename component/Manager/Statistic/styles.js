import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Color from "../../../Constant/Color";
import { Styles } from "../../../Constant/Styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorPrimaryButton,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 12,
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
  chart: {
    padding: 12,
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 12,
  },
  rank:{
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: "bold",
    textAlign: 'center'
  },
  searchWrapper: {
    marginVertical: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    width: "70%",
    ...Styles.BorderGray,
    height: 40,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 40,
    borderRadius: 12,
    backgroundColor: Color.colorLightGray,
    marginLeft: 12,
  },
});

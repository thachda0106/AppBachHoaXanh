import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Color from "../../../Constant/Color";
import { Styles } from "../../../Constant/Styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  statusBtn:{
    backgroundColor: Color.colorLightGray,
    padding: 12,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8
  },
  active:{
    backgroundColor: Color.colorPrimary,
  },
  statusBtn: {
    padding: 12,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  active: {
    backgroundColor: '#E2E2E2',
  },
  activeText:{
    color: Color.colorGreen,
    fontWeight: 'bold'
  },
  filterWrapper:{
    width: '100%',
    height: 52,
    marginTop: 8,
    paddingBottom: 8,
    ...Styles.BorderBottomGray
  }
});

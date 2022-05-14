import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Colors from "../../../Constant/Color";
import { Styles } from "../../../Constant/Styles";
import Color from "../../../Constant/Color";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.colorGrayBackground,
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    backgroundColor: Color.backgroundColor,
    ...Styles.BorderBottomGray,
  },
  headerTitle: {
    ...Styles.TitleText,
    flex: 1,
    marginLeft: 20,
  },
  headerBtn: {
    marginHorizontal: 8,
    zIndex: 1,
  },
  title: {
    ...Styles.TitleText,
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

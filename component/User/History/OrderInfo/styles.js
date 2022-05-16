import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Color from "../../../../Constant/Color";
import { Styles } from "../../../../Constant/Styles";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Color.colorGrayBackground,
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
  control: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    padding: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  controlBtn: {
    ...Styles.BorderGray,
    borderColor: Color.colorGray,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  controlBtnActive: {
    backgroundColor: "#16A723",
    borderColor: "#16A723",
    color: "white",
  },
  controlBtnText: {
    color: Color.colorGray,
  },
  controlBtnTextActive: {
    color: "white",
  },
  idWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  idTitle: {
    fontSize: 13,
    color: Color.colorGrayText,
  },
  idText: {
    flex: 1,
    textAlign: "right",
  },
  statusImg: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  statusWrapper: {
    width: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: 12,
  },
  statusText: {
    fontStyle: "italic",
    color: "#666",
    fontSize: 13,
  },
  infoWrapper: {
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    flex: 1,
    display: "flex",
    height: "100%",
    flexDirection: 'column',
  },
  orderNameText: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    paddingRight: 24,
  },
  addressWrapper: {
    marginTop: 8,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  address: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  addressIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 8,
  },
  addressText:{
    fontSize: 13,
    paddingRight: 24
  },
  sumary:{
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    textAlign: 'left',
    paddingLeft: 12,
    marginTop: 12,
  },
  priceItem:{
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    paddingHorizontal: 12,
    marginVertical: 4,
  },
  priceTitle:{
    flex: 1,
  },
  priceText:{
    width: 80,
    textAlign: 'right'
  },
  moneysIcon:{
    width: 50,
    height: 20,
    resizeMode: 'cover',
  },
  bottomView:{
    height: 180,
    backgroundColor: 'pink'
  },
  exportBtn: {
    width: 76, 
    height: 32,
    backgroundColor: Color.colorPrimary,
    borderRadius: 15,
    padding: 5,
    marginRight: 10
  },
  pdfText: {
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  }

});

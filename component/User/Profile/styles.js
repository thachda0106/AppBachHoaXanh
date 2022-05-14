import { StyleSheet } from "react-native";
import Color from "../../../Constant/Color";
import { Styles } from "../../../Constant/Styles";
export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    position: "relative",
    flex: 1,
    marginTop: 36,
    backgroundColor: 'white',
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    backgroundColor: Color.colorPrimaryLight,
    ...Styles.BorderBottomGray,
  },
  headerTitle: {
    ...Styles.TitleText,
    flex: 1,
    marginLeft: 20,
    color: 'white'
  },
  headerBtn: {
    marginHorizontal: 8,
    zIndex: 1,
  },
  content: {
    width: "100%",
    paddingHorizontal: 8,
    display: "flex",
    alignItems: "center",
  },
  avatarWrapper: {
    width: "40%",
    aspectRatio: 1,
    borderRadius: 180,
    overflow: "hidden",
    marginVertical: 36,
  },
  avatar: {
    resizeMode: "cover",
    flex: 1,
    aspectRatio: 1,
  },
  contentInfo: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 36,
  },
  inputWrapper: {
    width: "100%",
    marginLeft: 16,
  },
  inputTitle: {
    ...Styles.BlackSmallText,
  },
  input: {
    ...Styles.BlackNormalText,
    width: "80%",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    borderBottomColor: Color.colorGray,
  },
  iconWrapper: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 8,
  },
  pickImageWrapper:{
    width: '100%',
    padding: 24,
    display: 'flex',
    alignItems: 'center'
  },
  pickImgTitle:{
    ...Styles.BlackLargeText,
    fontWeight: 'bold'
  },
  pickImgDesc:{
    ...Styles.BlackNormalText,
    marginVertical: 4,
  },
  pickImgBtn:{
    width: '100%',
    backgroundColor: Color.colorBlueViolet,
    borderRadius: 10,
    paddingVertical: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  pickImgTxt:{
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  getAddressBtn:{
    width: '100%'
  },
  getAddressBtnText:{
    color: Color.colorPrimary,
    textDecorationLine: 'underline',
    textAlign: 'center'
  }
});

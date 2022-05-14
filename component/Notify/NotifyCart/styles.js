import { StyleSheet } from "react-native";
import Color from "../../../Constant/Color";
import { Styles } from "../../../Constant/Styles";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Color.colorLightGray,
    borderStyle: 'solid',
    borderRadius: 12,
  },
  notifyIcon: {
    marginLeft: 12,
    alignSelf: "center",
  },
  wrapperContent: {},
  textContent: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 36,
  },
  text: {
    color: "#000",
    fontSize: 14,
  },
  subjectText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: Color.colorPrimary,
  },
  contentText: {
    fontWeight: "400",
  },
  dateTimeText: {
    color: Color.colorGrayText,
    marginTop: 8,
  },
  markAsReadBtn:{
    position: 'absolute',
    bottom: 4,
    right: 12,
    zIndex: 1,
  },
  markAsReadText:{
    ...Styles.GraySmallText,
    textDecorationLine: 'underline',
    fontStyle: 'italic'
  },
  mark: {
    backgroundColor: Color.colorLightGray,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    elevation: 4,
  }
});

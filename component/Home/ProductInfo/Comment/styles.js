import { StyleSheet } from "react-native";
import Color from "../../../../Constant/Color";
import { Styles } from "../../../../Constant/Styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    borderBottomColor: Color.colorLightGray,
    borderWidth: 1,
    paddingVertical: 4,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  customer: {
    ...Styles.BlackSmallText,
    fontWeight: "bold",
  },
  rate: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 8,
  },
  content: {
    ...Styles.BlackSmallText,
    marginVertical: 4,
    lineHeight: 18,
  },
  date: {
    ...Styles.GraySmallText,
    fontStyle: "italic",
    marginVertical: 2,
  },
});

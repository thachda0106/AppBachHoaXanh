import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Color from "../../../../Constant/Color";
import { Styles } from "../../../../Constant/Styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 60,
    height: 40,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
  },
  rank: {
    width: 48,
  },
  id: {
    fontSize: 12,
    color: Color.colorGrayText,
  },
  name: {
    fontSize: 14,
    color: "black",
  },
  quantityBuy:{
      fontWeight: 'bold',
      fontSize: 14,
      color: 'black',
  },
  rankNumber:{
      width: 32,
      height: 32,
      ...Styles.BorderGray,
      ...Styles.flexCenter,
      borderWidth: 2,
      borderRadius: 180,
      borderColor: Color.colorOrange
  },
  rankNumberText:{
      color: Color.colorOrange,
      fontSize: 18,
      fontWeight: "bold"
  }
});

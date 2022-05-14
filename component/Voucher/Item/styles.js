import { StyleSheet } from "react-native";
import Color from "../../../Constant/Color";
import {Styles} from "../../../Constant/Styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 120,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#ccc",
    paddingVertical: 12,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  img:{
    width: 80,
    height: 60,
    resizeMode: 'contain',
  },
  infoWrapper:{
    width: '64%',
    paddingHorizontal: 12
  },
  info:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  expired:{
    color: Color.colorPrimaryLight
  },
});

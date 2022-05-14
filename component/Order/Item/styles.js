import { StyleSheet } from "react-native";
import Color from "../../../Constant/Color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,

  },
  img: {
    width: 46,
    height: 46,
    margin: 3,
    alignSelf: 'center',
    marginRight: 10
  },
  text:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  }

});

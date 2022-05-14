import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Colors from '../../../../../Constant/Color'
import { Styles } from "../../../../../Constant/Styles";
export const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems:'center'
  },
  quantity:{
    width: 32,
    fontWeight: 'bold'
  },
  name:{
    width: 200,
    paddingLeft: 12,
  },
  price:{
    flex: 1,
    textAlign:'right'
  }
});

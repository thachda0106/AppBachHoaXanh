import { StyleSheet } from "react-native";
import Color from '../../../Constant/Color'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#eee',
  },
  title:{
    color: Color.colorBlueViolet,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  listVoucherContainer: {
    marginBottom: 20
  }

});

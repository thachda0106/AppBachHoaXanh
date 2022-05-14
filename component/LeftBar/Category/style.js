import { StyleSheet } from "react-native";
import Color from "../../../Constant/Color";

export const styles = StyleSheet.create({
  container: {
    flex: 9,
    backgroundColor: '#ebeef3',
  },
  item: {
    width: '100%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    width: '100%',
    padding: 8,
    color: Color.colorLightBlack,
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  itemActive: {
    backgroundColor: 'white'
  },
  itemTextActive: {
    color: Color.colorPrimary
  }
});

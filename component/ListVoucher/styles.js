import { StyleSheet } from "react-native";
import Color from "../../Constant/Color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 36,
    paddingBottom:56,
    display: "flex",
    backgroundColor: '#eee',
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.colorPrimary,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#999",
    padding: 8,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 20,
    marginLeft: 20,
  },
  btnAccept:{
    height: 48,
    color: 'white',
    backgroundColor: Color.colorPrimary
  },
  btnAcceptText:{
    color: 'white',
    lineHeight: 48,
    textAlign: 'center',
    fontSize: 18
  }
});

import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Colors from '../../../../Constant/Color'
import { Styles } from "../../../../Constant/Styles";
export const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxHeight: 200,
    padding: 12,
    marginTop: 12,
    display: "flex",
    flexDirection: "row",
  },
  statusImg: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  statusWrapper: {
    width: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: 12,
  },
  statusText: {
    fontStyle: "italic",
    color: "#666",
    marginTop: 4,
  },
  priceWrapper: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  price: {
    fontWeight: "bold",
  },
  content: {},
  id: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  name: {
    width: 180,
    fontSize: 16,
    color: "black",
  },
  time: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
});

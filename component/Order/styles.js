import { StyleSheet } from "react-native";
import Color from "../../Constant/Color";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
    display: "flex",
    backgroundColor: "#eee",
  },
  header: {
    display: "flex",
    marginTop: 36,
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
    color: "white",
  },
  btnAccept: {
    height: 48,
    color: "white",
    backgroundColor: Color.colorPrimary,
  },
  btnAcceptText: {
    color: "white",
    lineHeight: 48,
    textAlign: "center",
    fontSize: 18,
  },
  textList: {
    color: Color.colorPrimary,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  }, //
  infoTotalWrapper: {
    backgroundColor: Color.colorGrayBackground,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnOrder: {
    height: 33,
    width: 80,
    backgroundColor: Color.colorPrimary,
    borderRadius: 10,
    shadowColor: "#000",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 8,
  },
  btnText: {
    flex: 1,
    height: 33,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  textTotal: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textSpecial: {
    color: "red",
    fontSize: 18,
  },
});

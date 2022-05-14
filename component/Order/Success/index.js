import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ThanksImg from "../../../assets/img/tien/thank-you.gif";
import Color from "../../../Constant/Color";
import { Styles } from "../../../Constant/Styles";

const Success = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt hàng thành công</Text>
      <Image style={styles.img} source={ThanksImg} />
      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => {
          props.navigation.navigate("Home", {});
        }}
      >
        <Text style={styles.homeBtnText}>Tiếp tục mua sắm nào!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    ...Styles.flexCenter,
  },
  title: {
    marginTop: -160,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    textTransform: 'uppercase'
  },
  img: {
    width: 320,
    height: 300,
    resizeMode: "contain",
  },
  homeBtn: {
    width: "100%",
  },
  homeBtnText: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: Color.colorPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
});

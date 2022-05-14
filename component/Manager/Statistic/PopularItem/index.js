import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { styles } from "./styles";
import IconImg from "../../../../assets/img/tien/product5.png";

const PopularItem = (props) => {
  const product = props.product;
  return (
    <View style={styles.container}>
      <Image
        source={product.img ? { uri: product.img } : IconImg}
        style={styles.img}
      />
      <View style={styles.content}>
        <Text style={styles.id}>Mã sản phẩm: #{product.productID}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>{product.name}</Text>
        <Text style={styles.quantityBuy}>Số lượng bán: {product.buyNumber}</Text>
      </View>
      <View style={styles.rank}>
        <View style={styles.rankNumber}>
          <Text style={styles.rankNumberText}>{props.top}</Text>
        </View>
      </View>
    </View>
  );
};

export default PopularItem;

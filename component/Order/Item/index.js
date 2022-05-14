import {
  Text,
  View,
  Image
} from "react-native";
import React, { useContext } from "react";
import { styles } from "./styles";
import Context from "../../../local-data/Context";
import { Function } from "../../../Constant/Function";
const Item = (props) => {
  const [state, dispatch] = useContext(Context)
  if (!props.orderProduct || !props.orderProduct.check) return <></>;
  const product = state.thach.products.find(product => product.productID == props.orderProduct.productID) 
  const reduce = Function.compareTimeNow(product.dateDiscountStart, product.dateDiscountEnd)?product.discountPercent /100 * product.price*props.orderProduct.quantity:0
  console.log(reduce)

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: product.img,}} />
      <View>
        <Text style={styles.text} numberOfLines={3} ellipsizeMode='tail' >{product.name} ({Function.toVND(product.price)}/sp)</Text>
        <Text>SL: {props.orderProduct.quantity}</Text>
        <Text>Giảm: {Function.toVND(reduce)}</Text>
        <Text>Tổng tiền: {Function.toVND(product.price * props.orderProduct.quantity - reduce)}  </Text>
      </View>
    
    </View>
  );
};

export default Item;

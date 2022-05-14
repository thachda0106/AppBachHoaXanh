import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import { Function } from "../../../../Constant/Function";
import PendingImg from "../../../../assets/img/tien/pending.png";
import DeliveringImg from "../../../../assets/img/tien/delivering.png";
import ReceivedImg from "../../../../assets/img/tien/received.png";

const Item = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        props.navigation.navigate("OrderInfo", { order: props.order });
      }}
    >
      {props.order.orderStatus === "PENDING" && (
       <View style={styles.statusWrapper}>
          <Image source={PendingImg} style={styles.statusImg} />
          <Text style={styles.statusText}>Đang duyệt</Text>
       </View>
      )}
      {props.order.orderStatus === "DELIVERING" && (
        <View style={styles.statusWrapper}>
          <Image source={DeliveringImg} style={styles.statusImg} />
          <Text style={styles.statusText}>Đang giao</Text>
       </View>
      )}
      {props.order.orderStatus === "RECEIVED" && (
        <View style={styles.statusWrapper}>
          <Image source={ReceivedImg} style={styles.statusImg} />
          <Text style={styles.statusText}>Đã nhận</Text>
       </View>
      )}
      <View style={styles.content}>
        <Text style={styles.id}>Đơn hàng #{props.order.id}</Text>
        <Text style={styles.time}>{Function.timestampToDateTime(props.order.dateCreate)}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.name}>{Function.getOrderName(props.order)}</Text>
      </View>
      <View style={styles.priceWrapper}>
        <Text style={styles.price}>{Function.toVND(Function.getOrderAllPrice(props.order))}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Item;

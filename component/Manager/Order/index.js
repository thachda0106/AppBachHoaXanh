import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSleigh,
  faUndo,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../Loading";
import Context from "../../../local-data/Context";
import Item from "./Item";
import { Function } from "../../../Constant/Function";

const Order = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusSelect, setStatusSelect] = useState(1);
  const [state, dispatch] = useContext(Context);
  const [orders, setOrders] = useState();
  console.log(orders);
  useEffect(() => {
    setOrders(Function.orderBy(state.thach.orders, "id", -1));
  }, [state]);

  if (!orders) return <></>;
  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <View style={styles.header}>
        <FontAwesomeIcon
          icon={faBars}
          size={28}
          color={"black"}
          onPress={() => {
            props.navigation.openDrawer();
          }}
        />
        <Text style={styles.headerTitle}>Quản lý đơn đặt hàng</Text>
      </View>
      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.statusBtn, statusSelect === 1 ? styles.active : {}]}
            onPress={() => {
              setStatusSelect(1);
            }}
          >
            <Text style={statusSelect === 1 ? styles.activeText : {}}>
              Tất cả
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.statusBtn, statusSelect === 2 ? styles.active : {}]}
            onPress={() => {
              setStatusSelect(2);
            }}
          >
            <Text style={statusSelect === 2 ? styles.activeText : {}}>
              Đang chờ duyệt
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.statusBtn, statusSelect === 3 ? styles.active : {}]}
            onPress={() => {
              setStatusSelect(3);
            }}
          >
            <Text style={statusSelect === 3 ? styles.activeText : {}}>
              Đang giao
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.statusBtn, statusSelect === 4 ? styles.active : {}]}
            onPress={() => {
              setStatusSelect(4);
            }}
          >
            <Text style={statusSelect === 4 ? styles.activeText : {}}>
              Đã nhận hàng
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={{ padding: 4 }}>
        {orders.map((order, index) => {
          if (
            statusSelect === 1 ||
            (order.orderStatus === "PENDING" && statusSelect === 2) ||
            (order.orderStatus === "DELIVERING" && statusSelect === 3) ||
            (order.orderStatus === "RECEIVED" && statusSelect === 4)
          ) {
            return (
              <Item key={index} order={order} navigation={props.navigation} />
            );
          }
        })}
      </ScrollView>
    </View>
  );
};

export default Order;

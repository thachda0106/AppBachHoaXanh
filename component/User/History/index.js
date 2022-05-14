import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./styles";
import Context from "../../../local-data/Context";
import Color from "../../../Constant/Color";
import * as Actions from "../../../local-data/Actions";
import Item from "./Item";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import {Function} from '../../../Constant/Function'

const History = (props) => {
  const [statusSelect, setStatusSelect] = useState(1);
  const [state, dispatch] = useContext(Context);
  const [orders, setOrders] = useState();
  useEffect(() => {
    setOrders(()=>{
      let myOrders = []
      for(let i = 0; i<state.thach.orders.length; i++){
        if(state.thach.orders[i].userID == state.thach.currentUser.userID){
          myOrders.push(state.thach.orders[i])
        }
      }
      return Function.orderBy(myOrders,id, -1)
    });
  }, [state]);

  if (!orders) return <></>;
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          style={styles.headerBtn}
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            color={Color.colorGray}
            size={24}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử mua hàng</Text>
      </View>
      <View style={styles.filterWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
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
      
      <ScrollView style={{padding: 4}}>
        {orders.map((order, index) => {
          if (order.userID == state.thach.currentUser.userID) {
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
          }
        })}
      </ScrollView>
    </View>
  );
};

export default History;

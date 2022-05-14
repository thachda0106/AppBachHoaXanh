import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { styles } from "./styles";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Category from "./Category";
import Product from "./Product";
import Voucher from "./Voucher";
import Order from "./Order";
import Statistic from "./Statistic";

const Drawer = createDrawerNavigator();
const Manager = (props) => {
  return (
    <Drawer.Navigator
      initialRouteName="Manger"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Quản lý danh mục sản phẩm" component={Category} />
      <Drawer.Screen name="Quản lý sản phẩm" component={Product} />
      <Drawer.Screen name="Quản lý mã giảm giá" component={Voucher} />
      <Drawer.Screen name="Quản lý đơn đặt hàng" component={Order} />
      <Drawer.Screen name="Thống kê" component={Statistic} />
    </Drawer.Navigator>
  );
};

export default Manager;

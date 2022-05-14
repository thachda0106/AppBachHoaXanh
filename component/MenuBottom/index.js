import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCoffee,
  faTasks,
  faThList,
  faPercent,
  faCartShopping,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { styles } from "./style";
import Context from "../../local-data/Context";
import * as Actions from "../../local-data/Actions";
import { Function } from "../../Constant/Function";

const MenuBottom = (props) => {
  const [state, dispatch] = useContext(Context);
  const [notifyNumber, setNotifyNumber] = useState(0);
  const [cartItemNumber, setCartItemNumber] = useState(0);
  useEffect(() => {
    if(state.thach.currentUser.username){
      setNotifyNumber(() => {
        let count = 0;
        if (state.thach.currentUser.username) {
          for (let i = 0; i < state.thach.alerts.length; i++) {
            if (
              (state.thach.alerts[i].userID === "" &&
                !state.thach.alerts[i].isRead) ||
              (state.thach.alerts[i].userID == state.thach.currentUser.userID &&
                !state.thach.alerts[i].isRead)
            ) {
              count += 1;
            }
          }
        }
        return count;
      });
      setCartItemNumber(state.thach.currentUser.userListCart.length);
    }
  }, [state]);
  const isLogged = state.thach.currentUser.username ? true : false;
  const select = props.select;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          // Refresh dữ liệu
          dispatch(Actions.refresh());
          props.navigation.navigate("Home", {});
        }}
      >
        <FontAwesomeIcon
          icon={faThList}
          size={20}
          style={[select === 0 ? styles.itemActive : ""]}
        />
        <Text style={[styles.itemTxt, select === 0 ? styles.itemActive : ""]}>
          Sản phẩm
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          // setSelect(1);
          if (isLogged) props.navigation.navigate("ListVoucher", {});
          else {
            Function.toastNeedLogin();
            props.navigation.navigate("LoginForm", {});
          }
        }}
      >
        <FontAwesomeIcon
          icon={faPercent}
          size={20}
          style={[select === 1 ? styles.itemActive : ""]}
        />
        <Text style={[styles.itemTxt, select === 1 ? styles.itemActive : ""]}>
          Voucher
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          if (isLogged) props.navigation.navigate("Cart", {});
          else {
            Function.toastNeedLogin();
            props.navigation.navigate("LoginForm", {});
          }
        }}
      >
        {cartItemNumber !== 0 && (
          <View style={styles.notifyNumber}>
            <Text style={styles.notifyNumberText}>
              {cartItemNumber > 9 ? "9+" : cartItemNumber}
            </Text>
          </View>
        )}
        <FontAwesomeIcon
          icon={faCartShopping}
          size={20}
          style={[select === 2 ? styles.itemActive : ""]}
        />
        <Text style={[styles.itemTxt, select === 2 ? styles.itemActive : ""]}>
          Giỏ hàng
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          if (isLogged) props.navigation.navigate("Notify", {});
          else {
            Function.toastNeedLogin();
            props.navigation.navigate("LoginForm", {});
          }
        }}
      >
        {notifyNumber !== 0 && (
          <View style={styles.notifyNumber}>
            <Text style={styles.notifyNumberText}>
              {notifyNumber > 9 ? "9+" : notifyNumber}
            </Text>
          </View>
        )}
        <FontAwesomeIcon
          icon={faBell}
          size={20}
          style={[select === 3 ? styles.itemActive : ""]}
        />
        <Text style={[styles.itemTxt, select === 3 ? styles.itemActive : ""]}>
          Thông báo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          if (isLogged) props.navigation.navigate("User", {});
          else {
            Function.toastNeedLogin();
            props.navigation.navigate("LoginForm", {});
          }
        }}
      >
        <FontAwesomeIcon
          icon={faUser}
          size={20}
          style={[select === 4 ? styles.itemActive : ""]}
        />
        <Text style={[styles.itemTxt, select === 4 ? styles.itemActive : ""]}>
          Tài khoản
        </Text>
      </TouchableOpacity>
      {isLogged && state.thach.currentUser.userType === "ADMIN" && (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            if (isLogged) props.navigation.navigate("Manager", {});
            else {
              Function.toastNeedLogin();
              props.navigation.navigate("LoginForm", {});
            }
          }}
        >
          <FontAwesomeIcon
            icon={faTasks}
            size={20}
            style={[select === 5 ? styles.itemActive : ""]}
          />
          <Text style={[styles.itemTxt, select === 5 ? styles.itemActive : ""]}>
            Quản lý
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MenuBottom;

import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import MenuBottom from "../MenuBottom";
import UserIcon from "../../assets/img/user-icon.gif";
import AddressIcon from "../../assets/img/user-icon/address-icon.gif";
import ChangePasswordIcon from "../../assets/img/user-icon/change-password-icon.gif";
import HistoryIcon from "../../assets/img/user-icon/history-icon.gif";
import UserInfoIcon from "../../assets/img/user-icon/user-info-icon.gif";
import VoucherIcon from "../../assets/img/user-icon/voucher-icon.gif";
import * as Actions from "../../local-data/Actions";
import LoginForm from "./LoginForm";
import WarningImg from "../../assets/img/stop.gif";
import Toast from "react-native-toast-message";
import { styles } from "./styles";
import Context from "../../local-data/Context";

const User = (props) => {
  const [state, dispatch] = useContext(Context);
  const user = { ...state.thach.currentUser };
  // function

  // Check login

  // Code
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.flex}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
          </View>
          <Text style={styles.customerName}>{user.fullName}</Text>
        </View>

        {/* Nút đăng nhập đăng ký */}
        {/* <View style={styles.flex}>
          <TouchableOpacity
            style={styles.btnSignIn}
            onPress={() => {
              setIsShowLogin(true);
            }}
          >
            <Text style={styles.btnSignInText}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnRegister}
            onPress={() => {
              setIsShowLogin(true);
            }}
          >
            <Text style={styles.btnRegisterText}>Đăng ký</Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.flex}>
          <TouchableOpacity
            onPress={() => {
              // dispatch(Actions.logout());
              // dispatch(Actions.refresh());
              props.navigation.navigate("LoginForm", {});
              Toast.show({
                type: "success",
                text1: "Thông báo",
                text2: "Đăng xuất thành công",
                visibilityTime: 2000,
              });
            }}
          >
            <Text style={{ textDecorationLine: "underline", color: "white" }}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.options}>
        {/* {!state.isLogin && (
          <View style={styles.errorOverlay}>
            <Image
              source={WarningImg}
              style={{ width: "100%", resizeMode: "contain" }}
            />
            <Text style={{ color: "white", fontSize: 16 }}>
              Vui lòng đăng nhập để thực hiện các chức năng này
            </Text>
          </View>
        )} */}

        {/* Lich su mua hang */}
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => {
            props.navigation.navigate("History", {});
          }}
        >
          <Image source={HistoryIcon} style={styles.optionItemIcon} />
          <Text style={styles.optionItemText}>Lịch sử mua hàng</Text>
        </TouchableOpacity>
        {/* Ma khuyen mai cua toi */}
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => {
            props.navigation.navigate("Voucher", { mode: "view" });
          }}
        >
          <Image source={VoucherIcon} style={styles.optionItemIcon} />
          <Text style={styles.optionItemText}>Mã khuyến mãi của tôi</Text>
        </TouchableOpacity>
        {/* Thong tin ca nhan */}
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => {
            props.navigation.navigate("Profile", {});
          }}
        >
          <Image source={UserInfoIcon} style={styles.optionItemIcon} />
          <Text style={styles.optionItemText}>Thông tin cá nhân</Text>
        </TouchableOpacity>
        {/* Thay doi mat khau */}
        <TouchableOpacity style={styles.optionItem}>
          <Image source={ChangePasswordIcon} style={styles.optionItemIcon} />
          <Text style={styles.optionItemText}>Thay đổi mật khẩu</Text>
        </TouchableOpacity>
        {/* Dia chi giao hang */}
        <TouchableOpacity style={styles.optionItem}>
          <Image source={AddressIcon} style={styles.optionItemIcon} />
          <Text style={styles.optionItemText}>Địa chỉ giao hàng</Text>
        </TouchableOpacity>
      </View>

      <MenuBottom navigation={props.navigation} select={4} />
    </View>
  );
};

export default User;

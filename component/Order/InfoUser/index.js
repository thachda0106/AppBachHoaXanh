import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { styles } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMapLocationDot,
  faUser,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Context from "../../../local-data/Context";
import Color from "../../../Constant/Color";
const InfoUser = (props) => {
  const [state, dispatch] = useContext(Context);
  const infoUser = state.thach.currentUser;
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.wrapperItem}>
          <FontAwesomeIcon
            style={styles.icon}
            icon={faUser}
            size={20}
            color={Color.colorPrimaryDark}
          />
          <Text style={[styles.text, styles.userText]}>
            Họ tên: {infoUser.fullName}
          </Text>
        </View>
        <View style={styles.wrapperItem}>
          <FontAwesomeIcon
            style={styles.icon}
            icon={faPhone}
            size={20}
            color={Color.colorPrimary}
          />

          <Text style={[styles.text]}>SĐT: {infoUser.phoneNumber}</Text>
        </View>

        <View style={[styles.wrapperItem, { marginTop: -4 }]}>
          <FontAwesomeIcon
            style={styles.icon}
            icon={faMapLocationDot}
            size={20}
            color={Color.colorPrimary}
          />
          <TextInput
            placeholder="Nhập địa chỉ nhận hàng"
            style={styles.shipAddressInput}
            value={props.shipAddress}
            onChangeText={(text) => props.setShipAddress(text)}
          />
        </View>
        <View style={styles.wrapperItem}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ width: "100%" }}
            onPress={() => {
              props.setShipAddress(infoUser.address);
            }}
          >
            <Text style={styles.addressBtn}>Lấy địa chỉ mặc định của tôi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InfoUser;

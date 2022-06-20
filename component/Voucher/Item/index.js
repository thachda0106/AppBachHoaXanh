import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./styles";
import VoucherImg from "../../../assets/img/voucher-logo.gif";
import ExpiredImg from "../../../assets/img/tien/expired_icon.png";
import { CheckBox } from "react-native-elements";
import Context from "../../../local-data/Context";
import * as Actions from "../../../local-data/Actions";
import { Function } from "../../../Constant/Function";
import Color from "../../../Constant/Color";

const Item = (props) => {
  const [state, dispatch] = useContext(Context);
  const [voucher, setVoucher] = useState();
  const [checked, setChecked] = useState(false);

  // console.log(props.selectedVoucher)
  useEffect(() => {
    setChecked(() => {
      if (!props.selectedVoucher) return false;
      if (props.selectedVoucher.voucherID === getVoucher()?.voucherID) {
        return true;
      }
      return false;
    });
  });

  useEffect(() => {
    setVoucher(getVoucher());
  }, [state]);
  const getVoucher = () => {
    for (let i = 0; i < state.thach.vouchers.length; i++) {
      if (props.voucher.voucherID == state.thach.vouchers[i].voucherID) {
        return state.thach.vouchers[i];
      }
    }
  };

  const handleSelected = () => {
    if (!checked) {
      props.setSelectedVoucher(voucher);
      setChecked(true);
    } else {
      props.setSelectedVoucher();
      setChecked(false);
    }
  };

  const selectVoucher = () => {
    dispatch(
      Actions.applyVoucher(props.voucher.voucherID, !props.voucher.using)
    );
  };
  if (!voucher) return <></>;
  if (voucher && !Function.compareTimeNow(voucher.dateStart, voucher.dateEnd)) {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: Function.findProduct(state.thach.products, voucher.productID)
              .productImage,
          }}
          style={[styles.img, { opacity: 0.3 }]}
        />
        <View style={styles.infoWrapper}>
          <Text
            style={[styles.info, { color: Color.colorGrayText }]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {voucher.description}
          </Text>
          <Text style={[styles.expired, { color: Color.colorGrayText }]}>
            Giảm: {voucher.discountValue}%, tối đa: {voucher.maxDiscountValue}
          </Text>
          <Text style={[styles.expired, { color: Color.colorGrayText }]}>
            Từ {Function.timestampToDate(voucher.dateStart)}
          </Text>
          <Text style={[styles.expired, { color: Color.colorGrayText }]}>
            Đến {Function.timestampToDate(voucher.dateEnd)}
          </Text>
        </View>
        <Image
          source={ExpiredImg}
          style={{ width: 80, height: 80, resizeMode: "contain", opacity: 0.4 }}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: Function.findProduct(state.thach.products, voucher.productID)
            .productImage,
        }}
        style={styles.img}
      />
      <View style={[styles.infoWrapper, props.mode?{width:'74%'}:{}]}>
        <Text style={styles.info} numberOfLines={2} ellipsizeMode="tail">
          {voucher.description}
        </Text>
        <Text style={[styles.expired, {color: Color.colorRed, fontSize: 16, fontWeight: 'bold'}]}>
          Giảm: {voucher.discountValue}%, tối đa: {Function.toVND(voucher.maxDiscountValue)}
        </Text>
        <Text style={styles.expired}>
          Từ {Function.timestampToDate(voucher.dateStart)}
        </Text>
        <Text style={styles.expired}>
          Đến {Function.timestampToDate(voucher.dateEnd)}
        </Text>
      </View>
      {!props.mode && (
        <CheckBox
          checked={checked}
          onPress={() => {
            handleSelected();
          }}
        />
      )}
    </View>
  );
};

export default Item;

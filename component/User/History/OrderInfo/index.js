import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./styles";
import { Function } from "../../../../Constant/Function";
import Color from "../../../../Constant/Color";
import Item from "./Item";
import Context from "../../../../local-data/Context";
import * as Actions from "../../../../local-data/Actions";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import PendingImg from "../../../../assets/img/tien/pending.png";
import DeliveringImg from "../../../../assets/img/tien/delivering.png";
import ReceivedImg from "../../../../assets/img/tien/received.png";
import ShopImg from "../../../../assets/img/tien/shop_icon.png";
import LocationImg from "../../../../assets/img/tien/location_icon.png";
import MoneysIcon from "../../../../assets/img/tien/moneys_icon.png";
import APICaller from "../../../../local-data/APICaller";
import Loading from "../../../Loading";

const OrderInfo = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState();
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    setOrder(() => {
      for (let i = 0; i < state.thach.orders.length; i++) {
        if (state.thach.orders[i].id == props.route.params.order.id)
          return state.thach.orders[i];
      }
    });
  }, [state]);

  const updateOrderStatus = (status) => {
    let content = "";
    if (status === "DELIVERING") {
      content = "Chuyển sang trạng thái đang giao?";
    } else if (status === "RECEIVED") {
      content = "Chuyển sang trạng thái đã nhận hàng?";
    }
    Alert.alert("Thông báo", content, [
      {
        text: "Hủy",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: async () => {
          let res;
          let alertContent = "";
          setIsLoading(true);
          if (status === "DELIVERING") {
            res = await APICaller.changeToDelivering(order.id);
            alertContent =
              "Đơn hàng #" +
              order.id +
              " đã được duyệt và đang được giao đến bạn";
          } else {
            res = await APICaller.changeToReceived(order.id);
            alertContent =
              "Hoàn tất đơn hàng #" +
              order.id +
              ". Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi";
          }
          if (res.status >= 200 && res.status <= 299) {
            dispatch(Actions.setOrdersFromAPI(res.data));

            let res2 = await APICaller.addAlert(
              order.userID,
              "Cập nhật đơn hàng",
              alertContent
            );
            setIsLoading(false);
            if (res2.status >= 200 && res2.status <= 299) {
              dispatch(Actions.addAlert(res2.data));
            } else {
              "Đã có lỗi khi gửi thông báo" + res2.status;
            }
            Function.showToast(
              "success",
              "Chuyển trạng thái đơn hàng thành công"
            );
          } else {
            Function.showToast(
              "error",
              "Đã có lỗi khi chuyển trạng thái đơn hàng" + res.status
            );
          }

          // dispatch(Actions.changeOrderStatus(order, status));
        },
      },
    ]);
  };

  if (!order) return <></>;

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
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
        <Text style={styles.headerTitle}>Chi tiết đơn hàng</Text>
      </View>
      <View
        style={{
          width: "100%",
          height: "100%",
          paddingBottom: 100,
        }}
      >
        <ScrollView>
          <View style={styles.idWrapper}>
            <Text style={styles.idTitle}>Mã đơn hàng</Text>
            <Text style={[styles.idText, styles.idTitle]}>#{order.id}</Text>
          </View>
          <View style={styles.infoWrapper}>
            {order.orderStatus === "PENDING" && (
              <View style={styles.statusWrapper}>
                <Image source={PendingImg} style={styles.statusImg} />
                <Text style={styles.statusText}>Đang duyệt</Text>
              </View>
            )}
            {order.orderStatus === "DELIVERING" && (
              <View style={styles.statusWrapper}>
                <Image source={DeliveringImg} style={styles.statusImg} />
                <Text style={styles.statusText}>Đang giao</Text>
              </View>
            )}
            {order.orderStatus === "RECEIVED" && (
              <View style={styles.statusWrapper}>
                <Image source={ReceivedImg} style={styles.statusImg} />
                <Text style={styles.statusText}>Đã nhận</Text>
              </View>
            )}
            <View style={styles.name}>
              <Text style={styles.orderNameText}>
                {Function.getOrderName(order)}
              </Text>
            </View>
          </View>
          {/* Địa chỉ */}
          <View style={styles.addressWrapper}>
            <View style={styles.address}>
              <Image source={ShopImg} style={styles.addressIcon} />
              <Text style={styles.addressText}>
                01 Lê Thành Phương, thành phố Tuy Hòa, Phú Yên
              </Text>
            </View>
            <View style={styles.address}>
              <Image source={LocationImg} style={styles.addressIcon} />
              <Text style={styles.addressText}>{order.shippingAddress}</Text>
            </View>
          </View>
          {/* Tóm tắt đơn hàng */}
          <View style={styles.addressWrapper}>
            <View style={{ width: "100%" }}>
              <Text style={styles.sumary}>Tóm tắt đơn hàng</Text>
            </View>
            <View style={styles.productList}>
              {order.listProductCart.map((productCart, index) => {
                return <Item key={index} productCart={productCart} />;
              })}
            </View>
          </View>
          {/* Chi phí */}
          <View style={[styles.addressWrapper, { paddingVertical: 12 }]}>
            <View style={styles.priceItem}>
              <Text style={styles.priceTitle}>Tổng tạm tính</Text>
              <Text style={styles.priceText}>
                {Function.toVND(Function.getOrderAllPriceNoVoucher(order))}
              </Text>
            </View>
            <View style={styles.priceItem}>
              <Text
                style={[
                  styles.priceTitle,
                  { color: Color.colorGreen, fontWeight: "bold" },
                ]}
              >
                Khuyến mãi từ voucher
              </Text>
              <Text
                style={[
                  styles.priceText,
                  { color: Color.colorGreen, fontWeight: "bold" },
                ]}
              >
                -{Function.toVND(order.voucherDiscount)}
              </Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.priceTitle}>Phí vận chuyển</Text>
              <Text style={styles.priceText}>Miễn phí</Text>
            </View>
          </View>
          {/* Tổng tiền */}
          <View style={[styles.addressWrapper, { paddingVertical: 12 }]}>
            <View style={styles.priceItem}>
              <Text style={[styles.priceTitle, { fontWeight: "bold" }]}>
                Tổng cộng
              </Text>
              <Image source={MoneysIcon} style={styles.moneysIcon} />
              <Text style={[styles.priceText, { fontWeight: "bold" }]}>
                {Function.toVND(Function.getOrderAllPrice(order))}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      {props.route.params.mode === "admin" && (
        <View style={styles.control}>
          <TouchableOpacity
            onPress={() => {
              updateOrderStatus("DELIVERING");
            }}
            disabled={order.orderStatus === "PENDING" ? false : true}
            style={[
              styles.controlBtn,
              order.orderStatus === "PENDING" ? styles.controlBtnActive : {},
            ]}
          >
            <Text
              style={
                order.orderStatus === "PENDING"
                  ? styles.controlBtnTextActive
                  : styles.controlBtnText
              }
            >
              Duyệt đơn
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateOrderStatus("RECEIVED");
            }}
            disabled={order.orderStatus === "DELIVERING" ? false : true}
            style={[
              styles.controlBtn,
              order.orderStatus === "DELIVERING" ? styles.controlBtnActive : {},
            ]}
          >
            <Text
              style={
                order.orderStatus === "DELIVERING"
                  ? styles.controlBtnTextActive
                  : styles.controlBtnText
              }
            >
              Giao hàng
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={order.orderStatus === "RECEIVED" ? false : true}
            style={[
              styles.controlBtn,
              order.orderStatus === "RECEIVED" ? styles.controlBtnActive : {},
            ]}
          >
            <Text
              style={
                order.orderStatus === "RECEIVED"
                  ? styles.controlBtnTextActive
                  : styles.controlBtnText
              }
            >
              Đã nhận hàng
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default OrderInfo;

import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import { styles } from "./styles";
import MenuBottom from "../../component/MenuBottom";
import InfoUser from "./InfoUser";

import Item from "./Item";
import { Function } from "../../Constant/Function";
import Context from "../../local-data/Context";
import * as Actions from "../../local-data/Actions";
import APICaller from "../../local-data/APICaller";
import Loading from "../Loading";
const Order = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [currentUser, setCurrentUser] = useState();
  const [shipAddress, setShipAddress] = useState("");
  useEffect(() => {
    setCurrentUser({ ...state.thach.currentUser });
  }, [state]);

  const infoOrder = {
    navigation: props.route.params.navigation,
    cartList: props.route.params.cartList,
    selectedVoucher: props.route.params.selectedVoucher,
    realSaleMoney: props.route.params.realSaleMoney,
    money: props.route.params.money,
  };

  const handleCreateOrder = async () => {
    if (shipAddress === "") {
      Function.showToast("error", "Bạn chưa nhập địa chỉ giao hàng");
      return;
    }
    if (shipAddress.length <= 10) {
      Function.showToast("error", "Địa chỉ quá ngắn");
      return;
    }
    let newOrder = {
      id: Number(Function.getMaxIndex(state.thach.orders, "id")) + 1,
      userID: currentUser.userID,
      orderStatus: "PENDING",
      dateCreate: new Date().getTime(),
      dateDelivery: "",
      shippingAddress: shipAddress,
      listProductCart: [],
      voucherDiscount: infoOrder.realSaleMoney,
      voucherID: infoOrder.selectedVoucher
        ? infoOrder.selectedVoucher.voucherID
        : "",
    };
    for (let i = 0; i < infoOrder.cartList.length; i++) {
      if (!infoOrder.cartList[i].check) continue;
      let product = Function.findProduct(
        state.thach.products,
        infoOrder.cartList[i].productID
      );
      let newProductCart = {
        productID: product.productID,
        productName: product.name,
        price: product.price,
        priceDiscount: Function.compareTimeNow(
          product.dateDiscountStart,
          product.dateDiscountEnd
        )
          ? product.discountPercent
          : 0,
        quantity: infoOrder.cartList[i].quantity,
        picture: product.img,
      };
      newOrder.listProductCart.push(newProductCart);
    }
    setIsLoading(true);
    // dispatch(Actions.createOrder(newOrder, infoOrder.selectedVoucher?.voucherID));
    let res = await APICaller.addOrder(newOrder);

    if (res.status >= 200 && res.status <= 299) {
      dispatch(Actions.addOrder(res.data));
      let res2 = await APICaller.addAlert(
        newOrder.userID,
        "Tạo đơn hàng thành công",
        "Đơn hàng #" +
          res.data.orderID +
          " của bạn đang được duyệt, chúng tôi sẽ thông báo sớm nhất có thể"
      );
      if (res2.status >= 200 && res2.status <= 299) {
        dispatch(Actions.addAlert(res2.data));
        res = await APICaller.getAPIProducts();
        if (res.status >= 200 && res.status <= 299) {
          dispatch(Actions.setProductsFromAPI(res.data));
          res = await APICaller.getAPIUser(state.thach.currentUser.userID);
          if (res.status >= 200 && res.status <= 299) {
            dispatch(Actions.getCurrentUser(res.data));
            res = await APICaller.getAPIVouchers()            
            if(res.status >= 200 && res.status <= 299){
              setIsLoading(false);
              dispatch(Actions.setVouchersFromAPI(res.data))
              Function.showToast("success", "Đặt hàng thành công");
            props.navigation.navigate("Success",{});
            }
            else{
              setIsLoading(false);
            Function.showToast(
              "error",
              "Đã có lỗi khi gửi get voucher" + res.status
            );
            }
          } else {
            setIsLoading(false);
            Function.showToast(
              "error",
              "Đã có lỗi khi gửi get user" + res.status
            );
          }
        } else {
          setIsLoading(false);
          Function.showToast(
            "error",
            "Đã có lỗi khi gửi get products" + res.status
          );
        }
      } else {
        setIsLoading(false);
        Function.showToast(
          "error",
          "Đã có lỗi khi gửi thông báo" + res2.status
        );
      }
    } else {
      setIsLoading(false);
      Function.showToast(
        "error",
        "Đã có lỗi khi tạo đơn đặt hàng" + res.status
      );
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} size={20} color={"white"} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đơn hàng</Text>
      </View>
      <ScrollView style={{}}>
        <View style={styles.container}>
          <InfoUser shipAddress={shipAddress} setShipAddress={setShipAddress} />
          <Text style={styles.textList}>Danh sách sản phẩm</Text>
          {infoOrder.cartList.map((cart, index) => {
            return (
              <Item
                key={index}
                navigation={infoOrder.navigation}
                orderProduct={cart}
              />
            );
          })}
        </View>
      </ScrollView>

      <View>
        <View style={styles.infoTotalWrapper}>
          <View>
            <Text style={styles.textTotal}>
              Bạn được giảm từ voucher:{" "}
              <Text style={styles.textSpecial}>
                {Function.toVND(infoOrder.realSaleMoney)}
              </Text>
            </Text>
            <Text style={styles.textTotal}>
              Thành tiền:{" "}
              <Text style={styles.textSpecial}>
                {Function.toVND(infoOrder.money)}
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btnOrder}
            onPress={() => {
              handleCreateOrder();
            }}
          >
            <Text style={styles.btnText}> Đặt hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Order;

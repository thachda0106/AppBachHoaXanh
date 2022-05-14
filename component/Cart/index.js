import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./styles";
import MenuBottom from "../MenuBottom";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faGift,
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import Item from "./Item";
import { Function } from "../../Constant/Function";
import Product1 from "../../assets/img/product1.png";
import Product2 from "../../assets/img/pro2.png";
import Product3 from "../../assets/img/pro3.png";
import Context from "../../local-data/Context";
import * as Actions from "../../local-data/Actions";
import Loading from "../Loading";
import EmptyCartImg from '../../assets/img/tien/empty_cart.png'

const Cart = (props) => {
  // Variable
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [cartList, setCartList] = useState();
  const [money, setMoney] = useState(0);
  const [selectedVoucher, setSelectedVoucher] = useState();
  useEffect(() => {
    setCartList(state.thach.currentUser.userListCart);
    setMoney(getAllPrice());
  }, [state]);

  useEffect(() => {
    if (props.route.params?.from === "Voucher") {
      setSelectedVoucher(props.route.params.selectedVoucher);
    }
    setMoney(getAllPrice());
  });

  const [realSaleMoney, setRealSaleMoney] = useState(0);
  const [isValidVoucher, setIsValidVoucher] = useState(0);
  // 0: chưa có mã, 1: đã có mã, -1: mã không dùng được
  var validVoucher = 0;

  // Function
  //Kiểm tra xem voucher có giảm được sản phẩm nào không
  const checkValidVoucher = () => {
    for (let i = 0; i < cartList.length; i++) {
      if (
        cartList[i].productID == selectedVoucher.productID &&
        cartList[i].check
      ) {
        return 1;
      }
    }
    return -1;
  };

  const removeFromCart = (productID) => {
    dispatch(Actions.removeFromCart(productID));
    setCartList([...state.thach.currentUser.userListCart]);
  };

  // Hàm ẩn hiện loading
  const showLoading = () => {
    setIsLoading(true);
  };
  const hideLoading = () => {
    setIsLoading(false);
  };

  // Gọi hàm
  if (selectedVoucher && cartList) {
    validVoucher = checkValidVoucher();
  }

  const getAllPrice = () => {
    if (!cartList) return 0;
    let moneyTemp = 0;
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].check) {
        const product = Function.findProduct(
          state.thach.products,
          cartList[i].productID
        );

        let currentPrice =
          cartList[i].quantity *
          Function.calculatePrice(
            product.price,
            Function.compareTimeNow(product.dateDiscountStart, product.dateDiscountEnd) ? product.discountPercent : 0
          );
        let salePrice = 0;
        if (selectedVoucher) {
          if (cartList[i].productID == selectedVoucher.productID) {
            salePrice = (currentPrice * selectedVoucher.discountValue) / 100;
            setRealSaleMoney(
              salePrice < selectedVoucher.maxDiscountValue
                ? salePrice
                : selectedVoucher.maxDiscountValue
            );
            moneyTemp -= realSaleMoney;
          }
        }
        moneyTemp += currentPrice;
      }
    }
    return moneyTemp;
  };

  if (!cartList) return <></>;

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Home", {});
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} size={18} color={"white"} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {
          cartList.length === 0 && <View style={styles.emptyCartWrapper}>
            <Image style={styles.emptyCartImg} source={EmptyCartImg}/>
            <Text style={styles.emptyCartText}>Bạn chưa thêm sản phẩm nào vào giỏ</Text>
          </View>
        }
        {cartList.map((item, index) => {
          // Lấy ra giỏ hàng của khách hàng này
          return (
            <Item
              key={index}
              navigation={props.navigation}
              proInCart={item}
              removeFromCart={removeFromCart}
              showLoading={showLoading}
              hideLoading={hideLoading}
            />
          );
        })}
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.voucherWrapper}
          onPress={() => {
            props.navigation.navigate("Voucher", { selectedVoucher });
          }}
        >
          <FontAwesomeIcon icon={faGift} size={20} color={"black"} />
          <Text style={styles.voucherTitle}>Voucher</Text>
          <View style={{ flex: 1 }}></View>
          {validVoucher === 0 ? (
            <Text style={styles.voucherContent}>
              Chọn mã giảm giá{" "}
              <FontAwesomeIcon icon={faAngleRight} size={20} color={"#333"} />
            </Text>
          ) : validVoucher === 1 ? (
            <View style={styles.validVoucherWrapper}>
              <Text style={styles.validVoucherContent}>
                Bạn được giảm {Function.toVND(realSaleMoney)}
              </Text>
              <FontAwesomeIcon icon={faCheckCircle} size={20} color={"green"} />
            </View>
          ) : (
            <View style={styles.invalidVoucherWrapper}>
              <Text style={styles.invalidVoucherContent}>
                Không áp dụng cho sản phẩm này
              </Text>
              <FontAwesomeIcon
                icon={faExclamationCircle}
                size={20}
                color={"red"}
              />
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.moneyWrapper}>
          <Text style={styles.money}>Thành tiền: {Function.toVND(money)}</Text>
          <TouchableOpacity
            style={styles.payBtn}
            onPress={() => {
              if (money === 0)
                Function.showToast(
                  "info",
                  "Bạn chưa chọn sản phẩm nào để thanh toán!"
                );
              else
                props.navigation.navigate("Order", {
                  navigation: props.navigation,
                  cartList,
                  money,
                  realSaleMoney,
                  selectedVoucher:validVoucher===1?selectedVoucher:undefined,
                });
            }}
          >
            <Text style={styles.payBtnText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>

      <MenuBottom navigation={props.navigation} select={2} />
    </View>
  );
};

export default Cart;

import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./styles";
import Product1 from "../../../assets/img/product1.png";
import { CheckBox } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleLeft,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Function } from "../../../Constant/Function";
import Context from "../../../local-data/Context";
import * as Actions from "../../../local-data/Actions";
import Swipeout from "react-native-swipeout";
import Color from "../../../Constant/Color";
import Toast from "react-native-toast-message";
import APICaller from "../../../local-data/APICaller";
import Loading from "../../Loading";

const Item = (props) => {
  const [state, dispatch] = useContext(Context);
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [cartProduct, setCartProduct] = useState();
  useEffect(() => {
    //Làm vầy để khi xóa item không cập nhật lại state
    setCurrentUser({ ...state.thach.currentUser });

    for (let i = 0; i < state.thach.products.length; i++) {
      if (state.thach.products[i].productID == props.proInCart.productID) {
        setCartProduct(state.thach.products[i]);
      }
    }
  }, [state]);

  const selectItem = () => {
    dispatch(
      Actions.selectCartProduct(
        props.proInCart.productID,
        !props.proInCart.check
      )
    );
  };

  // Chỉnh số lượng
  const setQuantity = (mode) => {
    dispatch(Actions.setCartProductQuantity(cartProduct.productID, mode));
  };

  const [checked, setChecked] = useState(false);

  const currentUserAfterDeleteCartItem = () => {
    let tam = { ...currentUser };
    for (let i = 0; i < tam.userListCart.length; i++) {
      if (tam.userListCart[i].productID == cartProduct.productID) {
        tam.userListCart.splice(i, 1);
        break;
      }
    }
    return tam;
  };

  const swipeSetting = {
    autoClose: false,
    backgroundColor: "transparent",
    onOpen: (sectionID, rowId, direction) => {},
    onClose: (sectionID, rowId, direction) => {},
    right: [
      {
        onPress: () => {
          Alert.alert(
            "Cảnh báo",
            "Bạn có muốn xóa sản phẩm này khỏi giỏ hàng",
            [
              {
                text: "Hủy",
              },
              {
                text: "Đồng ý",
                onPress: async () => {
                  props.showLoading();
                  let res = await APICaller.deleteProductToUserCart(
                    state.thach.currentUser.userID,
                    cartProduct.productID
                  );
                  props.hideLoading();
                  if (res.status >= 200 && res.status <= 299) {
                    dispatch(Actions.getCurrentUser(res.data));
                    Function.showToast(
                      "success",
                      "Xóa thành công"
                    );
                  } else {
                    Function.showToast(
                      "error",
                      "Đã có lỗi khi xóa sản phẩm khỏi giỏ" + res.status
                    );
                  }
                  // props.showLoading()
                  // let userAfter = currentUserAfterDeleteCartItem();
                  // let res = await APICaller.editAPIUsers(userAfter);
                  // props.hideLoading()
                  // if (res.status > 199 && res.status < 299) {
                  //   props.removeFromCart(cartProduct.productID);
                  // } else {
                  //   Function.showToast(
                  //     "error",
                  //     "Đã có lỗi khi xóa đơn hàng " + error.status
                  //   );
                  // }
                },
              },
            ],
            {
              cancelable: true,
            }
          );
        },
        text: "Xóa",
        type: "delete",
        backgroundColor: Color.colorGray,
      },
    ],
  };

  if (!cartProduct) return <></>;

  return (
    <Swipeout {...swipeSetting}>
      {cartProduct && (
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            props.navigation.navigate("ProductInfo", {
              productID: cartProduct.productID,
            });
          }}
        >
          <CheckBox
            checked={props.proInCart.check}
            onPress={() => {
              selectItem();
            }}
          />
          <Image source={{ uri: cartProduct.img }} style={styles.img} />
          <View style={styles.infoWrapper}>
            <Text style={styles.name}>
              {Function.cropText(cartProduct.name, 32)}
            </Text>
            <Text style={styles.type}>
              Loại sản phẩm: {cartProduct.categoryID}
            </Text>
            <View style={styles.priceWrapper}>
              {Function.compareTimeNow(
                cartProduct.dateDiscountStart,
                cartProduct.dateDiscountEnd
              ) && (
                <Text style={styles.originPrice}>
                  {Function.toVND(cartProduct.price)}
                </Text>
              )}
              <Text style={styles.salePrice}>
                {Function.toVND(
                  Function.calculatePrice(
                    cartProduct.price,
                    Function.compareTimeNow(
                      cartProduct.dateDiscountStart,
                      cartProduct.dateDiscountEnd
                    )
                      ? cartProduct.discountPercent
                      : 0
                  )
                )}
              </Text>
            </View>
            <View style={styles.quantityWrapper}>
              <TouchableOpacity
                activeOpacity={0.4}
                style={styles.btnQuantityAdj}
                onPress={() => {
                  setQuantity(-1);
                }}
              >
                <FontAwesomeIcon icon={faMinus} size={14} />
              </TouchableOpacity>
              <Text style={styles.quantityText} type={"number"}>
                {props.proInCart.quantity}
              </Text>
              <TouchableOpacity
                activeOpacity={0.4}
                style={styles.btnQuantityAdj}
                onPress={() => {
                  setQuantity(1);
                }}
              >
                <FontAwesomeIcon icon={faPlus} size={14} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </Swipeout>
  );
};

export default Item;

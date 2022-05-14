import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "./style";
import { Function } from "../../../Constant/Function";
import Context from "../../../local-data/Context";
import BlinkSaleImg from "../../../assets/img/tien/blink-sale.gif";

const Product = (props) => {
  // Variable
  const [showQuantity, setShowQuantity] = useState(6);
  const handleOpenProductInfo = (productID) => {
    props.navigation.navigate("ProductInfo", { productID });
  };
  const [state, dispatch] = useContext(Context);
  var data = [...state.thach.products];
  const productList = [];
  const searchNameText = state.thach.component.home.searchNameText;
  var productCount = 0;

  // Function
  const getProductsfromType = () => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].categoryID === props.categoryID) {
        productList.push(data[i]);
      }
    }
  };

  getProductsfromType();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.name}</Text>
      <View style={styles.flexWrapper}>
        {productList.map((item, index) => {
          if (productCount < showQuantity) {
            if (
              !searchNameText ||
              item.name.toLowerCase().indexOf(searchNameText.toLowerCase()) !==
                -1
            ) {
              productCount += 1;
              return (
                <TouchableOpacity
                  style={styles.item}
                  key={index}
                  onPress={() => {
                    handleOpenProductInfo(item.productID);
                  }}
                >
                  <View style={styles.itemBg}>
                    {Function.compareTimeNow(item.dateDiscountStart, item.dateDiscountEnd)> 0 && (
                      <Image
                        source={BlinkSaleImg}
                        style={styles.blinkSaleImg}
                      />
                    )}
                    <Image source={{ uri: item.img }} style={styles.itemImg} />
                    <Text
                      style={styles.itemName}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
                    <View style={styles.itemPriceWrapper}>
                      <Text style={styles.itemPriceSale}>
                        {Function.toVND(
                          Function.calculatePrice(
                            item.price,
                            Function.compareTimeNow(item.dateDiscountStart, item.dateDiscountEnd) ? item.discountPercent : 0
                          )
                        )}
                      </Text>
                      {Function.compareTimeNow(item.dateDiscountStart, item.dateDiscountEnd) && (
                        <Text style={styles.itemPriceOrigin}>
                          {Function.toVND(item.price)}
                        </Text>
                      )}
                    </View>
                    <View style={styles.itemBtnBuy}>
                      <Text style={styles.itemBtnBuyText}>Mua</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }
          }
        })}
        {productCount >= showQuantity && (
          <TouchableOpacity
            style={{ width: "100%" }}
            onPress={() => {
              setShowQuantity(showQuantity + 3);
            }}
          >
            <Text style={styles.showMoreBtn}>
              Xem thêm nhiều sản phẩm nữa...
            </Text>
          </TouchableOpacity>
        )}
        {productCount < showQuantity && (
          <View
            style={{ width: "100%" }}
            onPress={() => {
              setShowQuantity(showQuantity + 3);
            }}
          >
            <Text style={[styles.showMoreBtn, { textDecorationLine: "none" }]}>
              Bạn đã đến cuối trang sản phẩm này
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Product;

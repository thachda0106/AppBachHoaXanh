import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
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
import {printToFileAsync} from 'expo-print';
import { shareAsync } from 'expo-sharing';

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


  const creatHTML = (order, data) => {
      return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
      <title>Document</title>
    
      <style>
        body {
          width: 100%;
          height: 100%;
          background-color: rgba(221, 221, 221, 0.282);;
          display: flex;
          flex-direction: column;
          padding: 30px;
        }
      </style>
    </head>
    
    <body>
      <div class="title-wrapper" style="display: flex; flex-direction: row;">
        <i class="fa-solid fa-angle-left"
          style="color:#000; font-weight: 900; font-size: 20px"></i>
        <p class="textStyle" style="margin: 0; margin-left: 20px; width: auto; font-size:20px;font-weight:500">Chi tiết đơn hàng</p>
    
      </div>
      <div style="color: #000; width: 100%; height: 10px; margin-top:8px; border-top: 2px solid #ddd" > </div>
      <p style="margin: 0px">Mã đơn hàng <span>#${order.id}</span> </p>
    
      <div style="background-color: #fff; display: flex; flex-direction:row; padding: 10 0">
        <div style="display: flex; flex-direction:column">
        <img src= ${'https://cdn-icons-png.flaticon.com/512/2972/2972543.png'} style="width:40px; height:40px">
          ${order.orderStatus === "PENDING" ? '<span>Đang duyệt<span>': ''}
          ${order.orderStatus === "DELIVERING"? '<span>Đang giao<span>': ''}
          ${order.orderStatus === "RECEIVED" ? '<span>Đã nhận<span>': ''}
        </div>
        <p style="margin: 0">${Function.getOrderName(order)}</p>
      </div>
      
      <div style="background-color: #fff;margin-top: 10px;display: flex; flex-direction:column;">
          
      <p style="margin: 0">        
       <img src=${'https://cdn-icons-png.flaticon.com/512/1198/1198464.png'} style="width:20px; height:20px">
          01 Lê Thành Phương, thành phố Tuy Hòa, Phú Yên</p>
    
        <p style="margin: 0">       
         <img src=${'https://cdn-icons.flaticon.com/png/512/5450/premium/5450743.png?token=exp=1652634645~hmac=ef77cce597526110430808f5ba04adad'} style="width:20px; height:20px">
${order.shippingAddress}</p>
      </div>
    
    
      <div style="background-color: #fff;margin-top: 10px;display: flex; flex-direction:column;">
        <h3>Tóm tắt đơn hàng</h3>
      ${Function.htmlOrderProducts(order)}
      <div style="background-color: #fff;margin-top: 10px;display: flex; flex-direction:column;">
        <p style="margin: 0; margin-right: 40px">Tổng tạm Tính <span>${Function.toVND(Function.getOrderAllPriceNoVoucher(order))}</span></p>
        <p style="margin: 0; margin-right: 40px">Khuyến mãi từ voucher <span> -${Function.toVND(order.voucherDiscount)}</span></p>
        <p style="margin: 0; margin-right: 40px">Phí vận chuyển <span>Miễn phí</span>  </p>
      </div>
    
    
      <div style="background-color: #fff;margin-top: 10px;display: flex; flex-direction:row; padding: 10; align-items: center">
        <span>Tổng cộng</span>
        <img src=${'https://cdn-icons-png.flaticon.com/512/631/631200.png'} style="width:20px; height:20px; margin-top: 5px; margin-bottom: 5px"; >
        <span style="margin-left: 15px"> ${Function.toVND(Function.getOrderAllPrice(order))}</span>
    
      </div>
    
    
    </body>
    
    </html>
    
    
          
    `;

  }
  let generatePDF =  async () => {
    try {
        const data = {PendingImg, DeliveringImg, ReceivedImg}
        const { uri } = await printToFileAsync({ html: creatHTML(order,data), base64: false });
        
        await shareAsync(uri)
        return uri 
    } catch (err) {
        console.error(err);
    }
}
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
        <TouchableOpacity onPress={()=>{
              generatePDF()
        }} style={styles.exportBtn}><Text style={styles.pdfText} >Xuất PDF</Text></TouchableOpacity>
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
              <Text style={{fontSize: 12, color: Color.colorDarkGray, marginTop: 4}}>
                Khách hàng: Lương Minh Tiến
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
              {console.log(order.voucherDiscount) }
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

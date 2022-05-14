import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Color from "../../Constant/Color";
import Context from "../../local-data/Context";
import * as Actions from "../../local-data/Actions";
import APICaller from "../../local-data/APICaller";
import LoadingImage from "../../assets/img/tien/loading.gif";
import LogoImage from "../../assets/img/logo.gif";
import Loading from "../Loading";

const StartScreen = (props) => {
  const [percent, setPercent] = useState(0);
  const [state, dispatch] = useContext(Context);
  const [status, setStatus] = useState(200);

  useEffect(() => {
    const doAll = async () => {
      //Danh mục
      let res = await APICaller.getAPICategories();
      if (res.status < 200 || res.status > 299) {
        alert(
          "Lỗi " +
            res.status +
            " khi get Categories. Vui lòng kiểm tra đường truyền mạng "
        );
        return;
      }
      dispatch(Actions.setCategoriesFromAPI(res.data));
      //Sản phẩm
      res = await APICaller.getAPIProducts();
      if (res.status < 200 || res.status > 299) {
        alert(
          "Lỗi " +
            res.status +
            " khi get Products. Vui lòng kiểm tra đường truyền mạng "
        );
        return;
      }
      dispatch(Actions.setProductsFromAPI(res.data));

      //User
      res = await APICaller.getAPIUsers();
      if (res.status < 200 || res.status > 299) {
        alert(
          "Lỗi " +
            res.status +
            " khi get Users. Vui lòng kiểm tra đường truyền mạng "
        );
        return;
      }
      dispatch(Actions.setUsersFromAPI(res.data));

      // Comment
      res = await APICaller.getAPIComments();
      if (res.status < 200 || res.status > 299) {
        alert(
          "Lỗi " +
            res.status +
            " khi get Comments. Vui lòng kiểm tra đường truyền mạng "
        );
        return;
      }
      dispatch(Actions.setCommentsFromAPI(res.data));

      // Alerts
      res = await APICaller.getAPIAlerts();
      if (res.status < 200 || res.status > 299) {
        alert(
          "Lỗi " +
            res.status +
            " khi get Comments. Vui lòng kiểm tra đường truyền mạng "
        );
        return;
      }
      dispatch(Actions.setAlertsFromAPI(res.data));

      //Orders
      res = await APICaller.getAPIOrders();
      if (res.status < 200 || res.status > 299) {
        alert(
          "Lỗi " +
            res.status +
            " khi get Orders. Vui lòng kiểm tra đường truyền mạng "
        );
        return;
      }
      dispatch(Actions.setOrdersFromAPI(res.data));


      // Voucher
      res = await APICaller.getAPIVouchers();
      if (res.status < 200 || res.status > 299) {
        alert(
          "Lỗi " +
            res.status +
            " khi get Vouchers. Vui lòng kiểm tra đường truyền mạng "
        );
        return;
      }
      dispatch(Actions.setVouchersFromAPI(res.data));

      props.navigation.navigate("Home", {});
    };
    doAll();
  }, []);

  useEffect(() => {
    if (status < 200 || status > 299) {
      alert("Lỗi " + status + ". Vui lòng kiểm tra đường truyền mạng ");
    }
  }, [status]);
  return (
    <View style={styles.container}>
      <Loading />
      <View style={styles.logoWrapper}>
        <Image source={LogoImage} style={styles.logoImg} />
      </View>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorPrimaryLight,
    alignItems: "center",
  },
  logoWrapper: {
    top: "20%",
    display: "flex",
    alignItems: "center",
  },
  logoImg: {
    width: 320,
    resizeMode: "contain",
  },
  loadingRange: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 12,
    width: 240,
    height: 12,
    marginTop: -20,
    overflow: "hidden",
  },
  loadingPercent: {
    height: "100%",
    backgroundColor: Color.colorYellow,
  },
  loadingImg: {
    width: 120,
    height: 120,
    marginTop: 24,
    resizeMode: "contain",
  },
});

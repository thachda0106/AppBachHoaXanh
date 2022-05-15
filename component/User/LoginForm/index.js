import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./styles";
import LogoImg from "../../../assets/img/logo-reverse.gif";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faLock, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Dialog from "../../Dialog";
import Context from "../../../local-data/Context";
import * as Actions from "../../../local-data/Actions";
import Loading from '../../Loading'

const LoginForm = (props) => {
  // Variable
  const [isLoading, setIsLoading] = useState(false)
  const [state, dispatch] = useContext(Context);
  const [showdialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState(1); // 1: success, 2: fail
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // Function
  const closeDialog = () => {
    setTimeout(() => {
      setShowDialog(false);
      if (dialogMode === 1){
        loadAPI()
      }
    }, 500);
  };

  const loadAPI = async () =>{
    setIsLoading(true)
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

    setIsLoading(false)

    props.navigation.navigate("Home", {});
  }

  const checkLogin = () => {
    const userList = state.thach.users;
    for (let i = 0; i < userList.length; i++) {
      if (
        userList[i].username === username &&
        userList[i].password === password
      ) {
        dispatch(Actions.getCurrentUser(userList[i]));
        return true;
      }
    }
    return false;
  };

  const handleLogin = () => {
    if (checkLogin()) {
      setDialogMode(1);
      setShowDialog(true);
    } else {
      setDialogMode(2);
      setShowDialog(true);
    }
  };

  return (
    <View style={styles.container}>
      {
        isLoading && <Loading/>
      }
      {showdialog && (
        <Dialog
          mode={dialogMode}
          content={dialogMode===1?"Đăng nhập thành công":"Đăng nhập thất bại"}
          closeDialog={closeDialog}
        />
      )}
      {/* Nut back */}
      <View style={styles.backWrapper}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            props.navigation.navigate("Home",{})
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} size={20} color={"black"} />
        </TouchableOpacity>
      </View>
      <Image source={LogoImg} style={styles.logo} />
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <FontAwesomeIcon icon={faUser} size={22} color={"#999"} />
          <TextInput
            placeholderTextColor="#999"
            style={styles.input}
            placeholder="Tên đăng nhập"
            value={username}
            onChangeText={(text) => {
              setUsername(text)
            }}
          />
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesomeIcon icon={faLock} size={22} color={"#999"} />
          <TextInput
            placeholderTextColor="#999"
            secureTextEntry={true}
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={(text) => {
              setPassword(text)
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ForgetPass", {});
          }}
          activeOpacity={0.4}
          style={styles.forgetPassBtn}
        >
          <Text style={styles.forgetPassText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss()
            handleLogin();
          }}
          activeOpacity={0.4}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={styles.registerWrapper}>
          Chưa có tài khoản
          <Text
            style={styles.registerButton}
            onPress={() => {
              props.navigation.navigate("RegisterForm", {});
            }}
          >
            {" "}
            Đăng ký ngay
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginForm;

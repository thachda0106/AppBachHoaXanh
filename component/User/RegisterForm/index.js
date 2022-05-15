import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard
} from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "./styles";
import LogoImg from "../../../assets/img/logo-reverse.gif";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleLeft,
  faUser,
  faLock,
  faAddressCard,
  faMobileAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Context from "../../../local-data/Context";
import * as Actions from "../../../local-data/Actions";
import { Function } from "../../../Constant/Function";
import Loading from "../../Loading";
import APICaller from "../../../local-data/APICaller";

const RegisterForm = (props) => {
  const [state, dispatch] = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkInput = () => {
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      retypePassword.trim() === "" ||
      fullName.trim() === "" ||
      phoneNumber.trim() === ""
    ) {
      Function.showToast("error", "Thông tin không được để trống");
      return false;
    }

    if (password.trim() !== retypePassword.trim()) {
      Function.showToast("error", "Nhập lại mật khẩu không trùng khớp");
      return false;
    }

    if (!Function.checkPhone(phoneNumber)) {
      Function.showToast("error", "Số điện thoại không đúng định dạng");
      return false;
    }

    for (let i = 0; i < state.thach.users.length; i++) {
      if (state.thach.users[i].username === username) {
        Function.showToast("error", "Tên đăng nhập này đã có người sử dụng");
        return false;
      }
      if (state.thach.users[i].email === email) {
        Function.showToast("error", "Email này đã có người sử dụng");
        return false;
      }
      if (state.thach.users[i].phoneNumber === phoneNumber) {
        Function.showToast("error", "Số điện thoại này đã được sử dụng");
        return false;
      }
    }
    return true;
  };

  const register = async() => {
    if (checkInput()) {
      let newUser = {
        userID: Number(Function.getMaxIndex(state.thach.users, "userID")) + 1,
        username,
        password,
        fullName,
        phoneNumber,
        email,
      };
      setIsLoading(true);
      let res = await APICaller.addAPIUsers(newUser);
      setIsLoading(false)
      if (res.status > 199 && res.status < 300) {
        dispatch(Actions.register(newUser));
        props.navigation.navigate("LoginForm", {username: newUser.username, password: newUser.password})
      } else {
        Function.showToast("error", "Đã có lỗi xảy ra khi đăng ký" + res.status);
      }
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      {/* Nut back */}
      <View style={styles.backWrapper}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            props.navigation.goBack();
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
            placeholder="Nhập tên đăng nhập"
            value={username}
            onChangeText={(text) => setUsername(text)}
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
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesomeIcon icon={faLock} size={22} color={"#999"} />
          <TextInput
            placeholderTextColor="#999"
            secureTextEntry={true}
            style={styles.input}
            placeholder="Nhập lại mật khẩu"
            value={retypePassword}
            onChangeText={(text) => setRetypePassword(text)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesomeIcon icon={faAddressCard} size={22} color={"#999"} />
          <TextInput
            placeholderTextColor="#999"
            style={styles.input}
            placeholder="Họ và tên"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesomeIcon icon={faMobileAlt} size={22} color={"#999"} />
          <TextInput
            placeholderTextColor="#999"
            style={styles.input}
            placeholder="Số điện thoại"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesomeIcon icon={faEnvelope} size={22} color={"#999"} />
          <TextInput
            placeholderTextColor="#999"
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.loginButton}
          onPress={() => {
            Keyboard.dismiss()
            register();
          }}
        >
          <Text style={styles.loginButtonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterForm;

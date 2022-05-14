import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./styles";
import LogoImg from "../../../assets/img/logo-reverse.gif";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleLeft,
  faUser,
  faLock,
  faEnvelope,
  faSleigh,
} from "@fortawesome/free-solid-svg-icons";
import { Function } from "../../../Constant/Function";
import Context from "../../../local-data/Context";
import * as Actions from "../../../local-data/Actions";
import Color from "../../../Constant/Color";

const ForgetPass = (props) => {
  const [state, dispatch] = useContext(Context);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sendOtp, setSendOtp] = useState(false);
  const [timeCountOtp, setTimeCountOtp] = useState(0);
  const [password, setPassword] = useState("");
  const [rightOtp, setRightOtp] = useState(false);

  // Bộ đếm nút gửi lại
  useEffect(() => {
    if (timeCountOtp > 0) {
      const timer = setTimeout(() => {
        setTimeCountOtp(timeCountOtp - 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    } else {
      setSendOtp(false);
    }
  }, [timeCountOtp]);

  const handleSendOtp = () => {
    if (checkEmail()) {
      dispatch(Actions.generateOtp(email));
      setSendOtp(true);
      setTimeCountOtp(5);
    }
  };

  const handleGetPassword = () => {
    checkOtp();
  };

  const checkEmail = () => {
    if (email.trim() === "") {
      Function.showToast("error", "Email không được trống");
      return false;
    }
    if (!Function.checkEmail(email)) {
      Function.showToast("error", "Email không đúng định dạng");
      return false;
    }
    for (let i = 0; i < state.thach.users.length; i++) {
      if (state.thach.users[i].email === email) {
        return true;
      }
    }
    Function.showToast("error", "Không tìm thấy tài khoản này");
    return false;
  };

  const checkOtp = () => {
    if (!checkEmail()) {
      return false;
    }
    if (otp.trim() === "") {
      Function.showToast("error", "OTP không được để trống");
      return false;
    }
    for (let i = 0; i < state.thach.users.length; i++) {
      if (state.thach.users[i].userToken == otp) {
        dispatch(Actions.clearOtp(email));
        setPassword(state.thach.users[i].password);
        return true;
      }
    }
    setPassword("");
    Function.showToast("error", "OTP không chính xác");
    return false;
  };

  return (
    <View style={styles.container}>
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
      {password !== "" && (
        <Text
          style={{
            color: "black",
          }}
        >
          Mật khẩu của bạn là{" "}
          <Text
            style={{
              fontStyle: "italic",
              fontWeight: "bold",
              color: Color.colorPrimary,
            }}
          >
            {password}
          </Text>
        </Text>
      )}
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <FontAwesomeIcon icon={faEnvelope} size={22} color={"#999"} />
          <TextInput
            placeholderTextColor="#999"
            style={[styles.input, { width: "66%" }]}
            placeholder="Nhập email của bạn"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          {!sendOtp && (
            <TouchableOpacity
              style={styles.sendOtpBtn}
              onPress={() => {
                handleSendOtp();
              }}
            >
              <Text style={styles.sendOtpText}>Gửi otp</Text>
            </TouchableOpacity>
          )}
          {sendOtp && (
            <View style={[styles.sendOtpBtn, { backgroundColor: "white" }]}>
              <Text style={styles.sendOtpText}>Gửi lại {timeCountOtp}s</Text>
            </View>
          )}
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesomeIcon icon={faLock} size={22} color={"#999"} />
          <TextInput
            placeholderTextColor="#999"
            style={styles.input}
            keyboardType="number-pad"
            placeholder="Nhập mã otp"
            value={otp}
            onChangeText={(text) => {
              setOtp(text);
            }}
          />
        </View>
        {
          rightOtp && <View style={{width: '100%'}}>
          <View style={styles.inputWrapper}>
            <FontAwesomeIcon icon={faLock} size={22} color={"#999"} />
            <TextInput
              secureTextEntry={true}
              placeholderTextColor="#999"
              placeholder="Nhập mật khẩu mới"
              style={styles.input}
            />
          </View>
          <View style={styles.inputWrapper}>
            <FontAwesomeIcon icon={faLock} size={22} color={"#999"} />
            <TextInput
              secureTextEntry={true}
              placeholderTextColor="#999"
              placeholder="Xác nhận mật khẩu mới"
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => {
              Keyboard.dismiss();
              handleGetPassword();
            }}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Đặt mật khẩu mới</Text>
          </TouchableOpacity>
        </View>
        }

        <Text style={styles.registerWrapper}>
          Chưa có tài khoản
          <Text
            onPress={() => {
              props.navigation.navigate("RegisterForm", {});
            }}
            style={styles.registerButton}
          >
            {" "}
            Đăng ký ngay
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default ForgetPass;

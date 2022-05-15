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
import APICaller from "../../../local-data/APICaller";
import Loading from "../../Loading";

const ForgetPass = (props) => {
  const [state, dispatch] = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState();
  const [otp, setOtp] = useState("");
  const [sendOtp, setSendOtp] = useState(false);
  const [timeCountOtp, setTimeCountOtp] = useState(0);
  const [password, setPassword] = useState("");
  const [rightOtp, setRightOtp] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");

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

  const handleSendOtp = async () => {
    let userIDTemp = findIDbyEmail(email)
    setUserID(userIDTemp)
    if (checkEmail()) {
      setIsLoading(true);
      let res = await APICaller.generateOtp(userIDTemp, email);
      if (res.status > 199 && res.status < 299) {
        res = await APICaller.getAPIUsers();
        setIsLoading(false);
        setSendOtp(true);
        setTimeCountOtp(5);
        if (res.status > 199 && res.status < 299) {
          dispatch(Actions.setUsersFromAPI(res.data));
          Function.showToast("success", "Mã otp đã được gửi vào email của bạn");
        } else {
          Function.showToast("error", "Đã có lỗi khi get users " + res.status);
        }
      } else {
        setIsLoading(false);
        Function.showToast("error", "Đã có lỗi khi generate otp " + res.status);
      }
    }
  };

  const checkOtp = () => {
    for (let i = 0; i < state.thach.users.length; i++) {
      if (state.thach.users[i].userID == userID) {
        if (otp == state.thach.users[i].otp) {
          setUser(state.thach.users[i]);
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  };

  const handleConfirmOtp = () => {
    if (!checkOtp()) {
      Function.showToast("error", "OTP không chính xác");
    } else {
      setRightOtp(true);
    }
  };

  const checkPassword = () => {
    if (newPassword === "" || retypeNewPassword === "") {
      Function.showToast("error","Mật khẩu không được trống");
      return false;
    }
    if (newPassword !== retypeNewPassword) {
      Function.showToast("error","Nhập lại mật khẩu không trùng khớp");
      return false;
    }
    return true;
  };

  const createNewPassword = async () => {
    if (checkPassword()) {
      user.password = newPassword
      setIsLoading(true);
      let res = await APICaller.setNewUserPassword(user);
      if (res.status > 199 && res.status < 299) {
        res = await APICaller.getAPIUsers()
        setIsLoading(false);
        if(res.status > 199 && res.status < 299){
          dispatch(Actions.setUsersFromAPI(res.data))
          Function.showToast("success", "Tạo mật khẩu mới thành công");
          props.navigation.navigate("LoginForm", {});
        }
        else{
          Function.showToast(
            "error",
            "Đã có lỗi xảy ra khi get users " + res.status
          );
        }
      } else {
        Function.showToast(
          "error",
          "Đã có lỗi xảy ra khi tạo mật khẩu mới " + res.status
        );
      }
    }
  };

  const findIDbyEmail = (email) =>{
    for(let i = 0; i<state.thach.users.length; i++){
      if(state.thach.users[i].email === email){
        return state.thach.users[i].userID
      }
    }
  }

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
        return state.thach.users[i].userID;
      }
    }
    Function.showToast("error", "Không tìm thấy tài khoản này");
    return false;
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
                Keyboard.dismiss();
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
        {!rightOtp && (
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => {
              Keyboard.dismiss();
              handleConfirmOtp();
            }}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Xác thực OTP</Text>
          </TouchableOpacity>
        )}
        {rightOtp && (
          <View style={{ width: "100%" }}>
            <View style={styles.inputWrapper}>
              <FontAwesomeIcon icon={faLock} size={22} color={"#999"} />
              <TextInput
                secureTextEntry={true}
                placeholderTextColor="#999"
                placeholder="Nhập mật khẩu mới"
                style={styles.input}
                value={newPassword}
                onChangeText={(text)=>setNewPassword(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <FontAwesomeIcon icon={faLock} size={22} color={"#999"} />
              <TextInput
                secureTextEntry={true}
                placeholderTextColor="#999"
                placeholder="Xác nhận mật khẩu mới"
                style={styles.input}
                value={retypeNewPassword}
                onChangeText={(text)=>setRetypeNewPassword(text)}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => {
                Keyboard.dismiss();
                createNewPassword();
              }}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Đặt mật khẩu mới</Text>
            </TouchableOpacity>
          </View>
        )}

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

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
import Loading from "../../Loading";
import { Function } from "../../../Constant/Function";
import APICaller from "../../../local-data/APICaller";

const ChangePassword = (props) => {
  // Variable
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [showdialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState(1); // 1: success, 2: fail
  const [currentUser, setCurrentUSer] = useState();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");

  useEffect(() => {
    setCurrentUSer({ ...state.thach.currentUser });
  }, [state]);

  const checkInput = () =>{
    if(oldPassword === "" || newPassword === "" || retypeNewPassword === ""){
      Function.showToast("error", "Thông tin không được trống")
      return false
    }
    if(oldPassword !== currentUser.password){
      Function.showToast("error", "Mật khẩu hiện tại không chính xác")
      return false
    }
    if(newPassword !== retypeNewPassword){
      Function.showToast("error", "Nhập lại mật khẩu không trùng khớp")
      return false
    }
    return true
  }

  const handleUpdatePassword = async () =>{
    if(checkInput()){
      setIsLoading(true)
      let res = await APICaller.setNewPassword(currentUser.userID, "", newPassword)
      if(res.status < 299 && res.status > 199){
        dispatch(Actions.getCurrentUser(res.data))
        setIsLoading(false)
        Function.showToast("success", "Thay đổi mật khẩu thành công")
      }
      else{
        Function.showToast("error", "Đã có lỗi khi đổi mật khẩu "+res.status)
      }
    }
  }

  if (!currentUser) return <></>;

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      {showdialog && (
        <Dialog
          mode={dialogMode}
          content={
            dialogMode === 1 ? "Đăng nhập thành công" : "Đăng nhập thất bại"
          }
          closeDialog={closeDialog}
        />
      )}
      {/* Nut back */}
      <View style={styles.backWrapper}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            props.navigation.navigate("User", {});
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} size={20} color={"black"} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, marginLeft: 24}}>Đổi mật khẩu</Text>
      </View>
      <View style={styles.cirleWrapper}>
        <Image source={{ uri: currentUser.avatar }} style={styles.logo} />
      </View>
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <FontAwesomeIcon icon={faLock} size={22} color={"#999"} />
          <TextInput
            placeholderTextColor="#999"
            secureTextEntry={true}
            style={styles.input}
            placeholder="Nhập mật khẩu hiện tại"
            value={oldPassword}
            onChangeText={(text) => {
              setOldPassword(text);
            }}
          />
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesomeIcon icon={faLock} size={22} color={"#999"} />
          <TextInput
            placeholderTextColor="#999"
            secureTextEntry={true}
            style={styles.input}
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
            }}
          />
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesomeIcon icon={faLock} size={22} color={"#999"} />
          <TextInput
            placeholderTextColor="#999"
            secureTextEntry={true}
            style={styles.input}
            placeholder="Nhập lại mật khẩu mới"
            value={retypeNewPassword}
            onChangeText={(text) => {
              setRetypeNewPassword(text);
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            handleUpdatePassword();
          }}
          activeOpacity={0.4}
          style={[styles.loginButton, , { marginTop: 36 }]}
        >
          <Text style={[styles.loginButtonText]}>Thay đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword;

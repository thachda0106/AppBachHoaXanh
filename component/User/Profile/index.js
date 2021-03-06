import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  PermissionsAndroid,
  Dimensions,
  Button,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { styles } from "./styles";
import * as FileSystem from 'expo-file-system';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faTimes,
  faCheck,
  faUser,
  faEnvelope,
  faPhoneFlip,
  faLock,
  faLocation,
  faAddressCard,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import * as Actions from "../../../local-data/Actions";
import Color from "../../../Constant/Color";
import DefaultUserImg from "../../../assets/img/tien/empty_user.png";
import * as ImagePicker from "expo-image-picker";
import { Provider } from "react-native-paper";
import BottomSheet from "../../BottomSheet";
import Context from "../../../local-data/Context";
import { Function } from "../../../Constant/Function";
import Loading from "../../Loading";
import APICaller from "../../../local-data/APICaller";

const Profile = (props) => {
  // Variable
  const [isLoading, setIsLoading] = useState(false);
  const [showTakeImage, setShowTakeImage] = useState(false);
  const [status, setStatus] = useState(
    ImagePicker.useMediaLibraryPermissions()
  );
  const [state, dispatch] = useContext(Context);
  const [currentUser, setCurrentUSer] = useState();
  const [img, setImg] = useState();
  const [editProfile, setEditProfile] = useState();

  useEffect(() => {
    setCurrentUSer(state.thach.currentUser);
    setEditProfile({
      ...state.thach.currentUser,
      // retypePassword: state.thach.currentUser.password,
    });
    setImg(state.thach.currentUser.avatar);
  }, [state]);

  const requestPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied");
        return false;
      }
    }
    return true;
  };

  // if(editProfile) console.log(editProfile.userID)

  // Function
  const handleEditProfile = async () => {
    if (checkInput()) {
      setIsLoading(true);
      console.log("avatar trong: " + editProfile.avatar.slice(0,50));
      let res = await APICaller.editAPIUsers(editProfile);
      setIsLoading(false);
      if (res.status > 199 && res.status < 300) {
        Function.showToast("success", "C???p nh???t th??ng tin th??nh c??ng");
        dispatch(Actions.getCurrentUser(res.data));
      } else {
        Function.showToast(
          "error",
          "???? c?? l???i x???y ra khi c???p nh???t th??ng tin" + res.status
        );
      }
    }
  };
  const pickImage = async (mode) => {
    let permission = await requestPermission();
    if (!permission) {
      return;
    }
    let result;
    if (mode === 1) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    } else if (mode === 2) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }
    if (!result.cancelled) {
      // setImg(result.uri);
      const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
      setEditProfile({
        ...editProfile,
        avatar: result.uri,
        userImage: 'data:image/png;base64,' + base64,

      });
    }
    setShowTakeImage(false);
  };

  const checkInput = () => {
    // Check email
    if (
      editProfile.email.trim() !== "" &&
      !Function.checkEmail(editProfile.email)
    ) {
      Function.showToast("error", "Email kh??ng ????ng ?????nh d???ng");
      return false;
    }
    if (!Function.checkPhone(editProfile.phoneNumber)) {
      Function.showToast("error", "S??? ??i???n tho???i kh??ng h???p l???");
      return false;
    }
    // if (
    //   editProfile.password.trim() === "" ||
    //   editProfile.retypePassword.trim() === ""
    // ) {
    //   Function.showToast("error", "M???t kh???u kh??ng ???????c ????? tr???ng");
    //   return false;
    // }
    // if (editProfile.retypePassword !== editProfile.password) {
    //   Function.showToast(
    //     "error",
    //     "M???t kh???u nh???p l???i kh??ng tr??ng kh???p " +
    //       editProfile.password +
    //       "-" +
    //       editProfile.retypePassword
    //   );
    //   return false;
    // }
    return true;
  };

  if (!currentUser) return <></>;

  return (
    <Provider>
      <View style={styles.container}>
        {isLoading && <Loading />}
        <BottomSheet
          show={showTakeImage}
          onDismiss={() => setShowTakeImage(false)}
          enableBackdropDismiss
          heightScale={0.36}
        >
          <View style={styles.pickImageWrapper}>
            <Text style={styles.pickImgTitle}>?????i ???nh ?????i di???n</Text>
            <Text style={styles.pickImgDesc}>
              Ch???n m???t b???c h??nh trong m??y b???n
            </Text>
            <TouchableOpacity
              onPress={() => {
                pickImage(2);
              }}
              style={styles.pickImgBtn}
            >
              <Text style={styles.pickImgTxt}>Ch???p ???nh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pickImgBtn}
              onPress={() => {
                pickImage(1);
              }}
            >
              <Text style={styles.pickImgTxt}>Ch???n t??? th?? vi???n</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
        {/* Header */}
        <View style={styles.backWrapper}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              props.navigation.navigate("User", {});
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} size={20} color={"black"} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, marginLeft: 24, textAlign: "center" }}>
            Th??ng tin c?? nh??n
          </Text>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => {
              handleEditProfile();
            }}
          >
            <FontAwesomeIcon icon={faCheck} color={"black"} size={24} />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            style={styles.headerBtn}
          >
            <FontAwesomeIcon icon={faTimes} color={'white'} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Th??ng tin c?? nh??n</Text>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => {
              handleEditProfile();
            }}
          >
            <FontAwesomeIcon
              icon={faCheck}
              color={'white'}
              size={24}
            />
          </TouchableOpacity>
        </View> */}
        {/* Content */}
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => {
              setShowTakeImage(true);
            }}
            activeOpacity={0.4}
            style={styles.avatarWrapper}
          >
            <Image
              source={{
                uri: editProfile.userImage
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={styles.contentInfo}>
            <View style={styles.iconWrapper}>
              <View style={styles.flex} />
              <FontAwesomeIcon
                icon={faAddressCard}
                color={Color.colorGrayText}
                size={18}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTitle}>H??? v?? t??n</Text>
              <TextInput
                style={styles.input}
                placeholder="Nh???p h??? v?? t??n"
                value={editProfile.fullName}
                onChangeText={(text) => {
                  setEditProfile({ ...editProfile, fullName: text });
                }}
              />
            </View>
          </View>
          <View style={styles.contentInfo}>
            <View style={styles.iconWrapper}>
              <View style={styles.flex} />
              <FontAwesomeIcon
                icon={faPhoneFlip}
                color={Color.colorGrayText}
                size={18}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTitle}>S??? ??i???n tho???i</Text>
              <TextInput
                style={styles.input}
                placeholder="Nh???p s??? ??i???n tho???i"
                value={editProfile.phoneNumber}
                onChangeText={(text) => {
                  setEditProfile({ ...editProfile, phoneNumber: text });
                }}
              />
            </View>
          </View>
          <View style={styles.contentInfo}>
            <View style={styles.iconWrapper}>
              <View style={styles.flex} />
              <FontAwesomeIcon
                icon={faEnvelope}
                color={Color.colorGrayText}
                size={18}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTitle}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Nh???p email"
                value={editProfile.email}
                onChangeText={(text) => {
                  setEditProfile({ ...editProfile, email: text });
                }}
              />
            </View>
          </View>
          <View style={styles.contentInfo}>
            <View style={styles.iconWrapper}>
              <View style={styles.flex} />
              <FontAwesomeIcon
                icon={faLocation}
                color={Color.colorGrayText}
                size={18}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTitle}>?????a ch??? giao h??ng</Text>
              <TextInput
                style={styles.input}
                placeholder="Nh???p ?????a ch??? giao h??ng"
                value={editProfile.address}
                onChangeText={(text) => {
                  setEditProfile({ ...editProfile, address: text });
                }}
              />
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <TouchableOpacity
              style={styles.getAddressBtn}
              onPress={() => {
                props.navigation.navigate("Address", {});
              }}
            >
              <Text style={styles.getAddressBtnText}>L???y ?????a ch??? chi ti???t</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.contentInfo}>
            <View style={styles.iconWrapper}>
              <View style={styles.flex} />
              <FontAwesomeIcon
                icon={faLock}
                color={Color.colorGrayText}
                size={18}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTitle}>M???t kh???u</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Nh???p m???t kh???u"
                value={editProfile.password}
                onChangeText={(text) => {
                  setEditProfile({ ...editProfile, password: text });
                }}
              />
            </View>
          </View>
          <View style={styles.contentInfo}>
            <View style={styles.iconWrapper}>
              <View style={styles.flex} />
              <FontAwesomeIcon
                icon={faLock}
                color={Color.colorGrayText}
                size={18}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTitle}>Nh???p l???i m???t kh???u</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Nh???p l???i m???t kh???u"
                value={editProfile.retypePassword}
                onChangeText={(text) => {
                  setEditProfile({ ...editProfile, retypePassword: text });
                }}
              />
            </View>
          </View> */}
        </View>
      </View>
    </Provider>
  );
};

export default Profile;

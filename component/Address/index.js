import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faTimesCircle,
  faMapMarkerAlt,
  faSearch,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import Color from "../../Constant/Color";
import axios from "axios";
import Context from "../../local-data/Context";
import * as Actions from "../../local-data/Actions";
import Loading from "../Loading";
import APICaller from "../../local-data/APICaller";
import { Function } from "../../Constant/Function";

const Address = ({ navigation }) => {
  const close = () => {
    navigation.navigate("Home", {});
  };
  //   level 1: Thanh pho/Tinh
  //   level 2: Quan/Huyen
  //   level 3: Phuong/Xa
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [currentUser, setCurrentUser] = useState();
  const [level, setLevel] = useState(1);
  const [current, setCurrent] = useState([]);
  const [places, setPlaces] = useState([]);
  const [homeNumber, setHomeNumber] = useState("");
  const [isShowHomeNumberInput, setIsShowHomeNumberInput] = useState(false);
  const [addressText, setAddressText] = useState("");
  useEffect(() => {
    setCurrentUser(state.thach.currentUser);
    setIsLoading(true);
    axios({
      method: "GET",
      url: "https://provinces.open-api.vn/api/?depth=3",
      data: null,
    })
      .then((res) => {
        setPlaces(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Function

  //   alert(level);
  //   alert(current);
  //   Moi khi bam vao item
  const changeLevel = (option, data) => {
    if (option === "increase") {
      if (level < 3) {
        setLevel(level + 1);
        setCurrent([...current, data]);
      } else {
        let res = "";
        for (let i = current.length - 1; i >= 0; i--) {
          res += ", " + current[i];
        }
        res = data + res;
        setAddressText(res);
        setIsShowHomeNumberInput(true);
      }
    } else if (option === "decrease") {
      if (level > 1) {
        if (level === 3) {
          setAddressText("");
          setIsShowHomeNumberInput(false);
        }
        setLevel(level - 1);
        var temp = [...current];
        temp.pop();
        setCurrent(temp);
      }
    }
  };

  const updateUserAddress = async () => {
    let newUser = { ...currentUser };
    newUser.address = homeNumber + ", " + addressText;
    setIsLoading(true);
    let res = await APICaller.editAPIUsers(newUser);
    setIsLoading(false);
    if (res.status > 199 && res.status < 300) {
      dispatch(Actions.changeProfile(newUser));
      Function.showToast("success", "Cập nhật địa chỉ của bạn thành công");
      setLevel(1)
      setCurrent([])
      setIsShowHomeNumberInput(false)
    } else {
      Function.showToast("error", "Đã có lỗi xảy ra " + res.status);
    }
  };

  var data = [];
  switch (level) {
    case 1:
      data = [...places];
      break;
    case 2:
      for (let i = 0; i < places.length; i++) {
        if (places[i].name === current[current.length - 1]) {
          data = [...places[i].districts];
          break;
        }
      }
      break;
    case 3:
      let isBreak = false;
      for (let i = 0; i < places.length; i++) {
        if (places[i].name === current[current.length - 2]) {
          for (let j = 0; j < places[i].districts.length; j++) {
            if (places[i].districts[j].name === current[current.length - 1]) {
              data = [...places[i].districts[j].wards];
              isBreak = true;
              break;
            }
          }
          if (isBreak) break;
        }
      }
      break;
    default:
      break;
  }

  if (!places || !data || !currentUser) return <></>;
  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Hãy chọn <Text style={styles.boldText}>địa chỉ</Text> để xem đủ hàng
          và được giao nhanh
        </Text>
      </View>
      <View style={styles.title}>
        <TouchableOpacity
          style={{ zIndex: 1, padding: 16 }}
          onPress={() => {
            changeLevel("decrease", "");
          }}
        >
          <View style={styles.backAddressBtn}>
            <FontAwesomeIcon
              icon={faAngleLeft}
              size={20}
              color={level === 1 ? "transparent" : "white"}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.titleText}>Chọn Tỉnh, Thành phố</Text>
        <TouchableOpacity
          style={{ zIndex: 1, padding: 16 }}
          onPress={() => {
            close();
          }}
        >
          <View style={styles.closeBtn}>
            <FontAwesomeIcon icon={faTimesCircle} size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.addressList}>
        <Text style={styles.currentAddress}>
          Địa chỉ hiện tại:{" "}
          <Text style={{ color: Color.colorOrange, fontWeight: "bold" }}>
            {currentUser.address}
          </Text>
        </Text>
        {/* <TouchableOpacity>
          <View style={styles.hereWrapper}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              size={20}
              color={Color.colorPrimary}
            />
            <Text style={styles.hereText}>Lấy vị trí hiện tại của bạn</Text>
          </View>
        </TouchableOpacity> */}
        {isShowHomeNumberInput && (
          <View style={styles.homeNumberWrapper}>
            <Text style={styles.address}>
              Địa chỉ đã chọn:{" "}
              <Text style={{ color: Color.colorPrimary, fontWeight: "bold" }}>
                {addressText}
              </Text>
            </Text>
            <TextInput
              placeholder="Nhập số nhà (số tổ), tên đường"
              value={homeNumber}
              onChangeText={(text) => {
                setHomeNumber(text);
              }}
              style={styles.homeNumberInput}
            />
            <TouchableOpacity
              style={styles.okBtn}
              onPress={() => {
                updateUserAddress();
              }}
            >
              <Text style={styles.okBtnText}>Đặt làm địa chỉ nhận hàng</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Place List */}
        {!isShowHomeNumberInput && (
          <View style={styles.placeList}>
            <ScrollView>
              {data.map((item, index) => {
                return (
                  <View style={styles.placeItem} key={index}>
                    <TouchableOpacity
                      onPress={() => {
                        changeLevel("increase", item.name);
                      }}
                    >
                      <Text style={styles.placeItemText}>{item.name}</Text>
                      <View style={styles.placeItemBtn}>
                        <FontAwesomeIcon
                          icon={faAngleRight}
                          size={16}
                          color={"black"}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}
        {/* End Place List */}
      </View>
    </View>
  );
};

export default Address;

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { styles } from "./style";
import Context from "../../../local-data/Context";
import * as Actions from "../../../local-data/Actions";
import { Function } from "../../../Constant/Function";
import Loading from "../../Loading";

const Header = (props) => {
  // Variable
  const [state, dispatch] = useContext(Context);
  const [currentUser, setCurrentUser] = useState();
  const searchNameText = state.thach.component.home.searchNameText;
  useEffect(() => {
    setCurrentUser(state.thach.currentUser);
  }, [state]);

  // Function
  const handleOpenLeftBar = () => {
    props.navigation.navigate("LeftBar", {});
  };
  const handleOpenAddress = () => {
    if (!currentUser.username) {
      Function.toastNeedLogin()
      props.navigation.navigate("LoginForm", {});
    } else {
      props.navigation.navigate("Address", {});
    }
  };
  const changeSearchNameText = (text) => {
    dispatch(Actions.changeSearchNameText(text));
  };

  if(!currentUser) return <></>

  return (
    <View style={styles.container}>
      <View style={styles.headerChild}>
        <TouchableOpacity
          onPress={() => {
            handleOpenLeftBar();
          }}
        >
          <FontAwesomeIcon icon={faBars} style={styles.icon} size={32} />
        </TouchableOpacity>
      </View>
      <View style={[styles.headerSearch, styles.headerChild]}>
        <FontAwesomeIcon
          icon={faSearch}
          style={styles.icon}
          size={20}
          color="#ccc"
        />
        <TextInput
          value={searchNameText}
          onChangeText={(text) => {
            changeSearchNameText(text);
          }}
          placeholder="Bạn tìm gì?"
          style={styles.searchInput}
        />
      </View>
      <View style={[styles.headerChild, styles.headerItem]}>
        <TouchableOpacity
          onPress={() => {
            handleOpenAddress();
          }}
        >
          <Text
            style={styles.headerItemTxt}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            Giao tại {currentUser.address?currentUser.address:'...'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={[styles.headerChild, styles.headerItem]}>
        <TouchableOpacity>
          <Text
            style={[styles.headerItemTxt, { textAlign: "center" }]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            Đơn hàng từng mua
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default Header;

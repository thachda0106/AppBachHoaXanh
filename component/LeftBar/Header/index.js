import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
  import {
    faBars,
    faTimesCircle,
    faHome,
  } from "@fortawesome/free-solid-svg-icons";
  import { faSearch } from "@fortawesome/free-solid-svg-icons";
  import { styles } from "./style";
  
  const Header = (props) => {
    const handleClickClose = () =>{
      props.closeLeftBar()
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{handleClickClose()}}>
          <View style={[styles.headerChild, styles.headerItem]}>
            <FontAwesomeIcon icon={faTimesCircle} size={16} color="white" />
            <Text
              style={styles.headerItemTxt}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Đóng
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={[styles.headerChild, styles.headerItem]}>
            <FontAwesomeIcon icon={faHome} size={18} color="white" />
            <Text
              style={[styles.headerItemTxt, { textAlign: "center" }]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Trang chủ
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.headerSearch, styles.headerChild]}>
          <FontAwesomeIcon
            icon={faSearch}
            style={styles.icon}
            size={20}
            color="#ccc"
          />
          <TextInput
            placeholder="Tìm hơn 200 nhóm hàng"
            style={styles.searchInput}
          />
        </View>
      </View>
    );
  };
  
  export default Header;
  
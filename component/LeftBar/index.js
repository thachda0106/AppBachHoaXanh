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
import Header from "./Header";
import Category from "./Category";
import ProductType from "./ProductType";

const LeftBar = ({navigation}) => {
  const closeLeftBar = () =>{
    navigation.navigate("Home", {})
  }
  return (
    <View style={styles.container}>
      <Header closeLeftBar={()=>{closeLeftBar()}}/>
      <View style={styles.content}>
        <Category/>
        <ProductType/>
      </View>
    </View>
  );
};

export default LeftBar;

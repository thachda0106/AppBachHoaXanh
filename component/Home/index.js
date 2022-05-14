import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import Banner from "./Banner";
import Category from "./Category";
import Product from "./Product";
import MenuBottom from "../MenuBottom";
import Context from "../../local-data/Context";
import * as Actions from "../../local-data/Actions";
import Loading from "../Loading";

const Home = ({ navigation }) => {
  // Variable
  const [state, dispatch] = useContext(Context);
  const [data, setData] = useState();
  const selectedCategory = state.thach.component.home.selectedCategory;

  // if(data) console.log(data)

  // console.log(state.thach.orders)
  // for(let i = 0; i<state.thach.orders.length; i++){
  //   console.log(state.thach.orders[i])
  //   console.log("==================")
  // }

  // for(let i = 0; i<state.thach.comments.length; i++){
  //   console.log(state.thach.comments[i])
  // }

  useEffect(() => {
    setData(state.thach.categories);
  }, [state]);

  // Function
  const openLeftBar = () => {
    navigation.navigate("LeftBar", {});
  };
  const openAddress = () => {
    navigation.navigate("Address", {});
  };

  if (!data) return <></>;

  return (
    <View style={styles.container}>
      {/* <Loading/> */}
      <Header
        navigation={navigation}
      />
      <Banner />
      <Category />
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((productType, index) => {
          if (!selectedCategory || selectedCategory === 0)
            return (
              <Product
                navigation={navigation}
                categoryID={productType.categoryID}
                name={productType.name}
                key={index}
              />
            );
          else if (productType.categoryID === selectedCategory)
            return (
              <Product
                navigation={navigation}
                categoryID={productType.categoryID}
                name={productType.name}
                key={index}
              />
            );
        })}
      </ScrollView>

      <MenuBottom navigation={navigation} select={0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
    position: "relative",
  },
});
export default Home;

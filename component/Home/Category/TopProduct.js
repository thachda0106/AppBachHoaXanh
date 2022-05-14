import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import Context from "../../../local-data/Context";
import Color from "../../../Constant/Color";
import * as Actions from "../../../local-data/Actions";

const TopProduct = ({ data }) => {
  const [state, dispatch] = useContext(Context);
  const selectedCategory = state.thach.component.home.selectedCategory;
  const changeSelectedCategory = () => {
    if (data.categoryID === selectedCategory) {
      dispatch(Actions.changeSelectedCategory(0));
    } else {
      dispatch(Actions.changeSelectedCategory(data.categoryID));
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        changeSelectedCategory();
      }}
    >
      <View style={styles.container}>
        {selectedCategory === data.categoryID && (
          <View style={styles.active}></View>
        )}
        <Image source={{uri: data.img}} style={styles.topProImg} />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.topProTxt}>
          {data.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TopProduct;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 70,
    height: 80,
    marginHorizontal: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  topProImg: {
    width: "70%",
    resizeMode: "cover",
    top: 0,
    flex: 2,
    borderWidth: 1,
    // borderStyle: "solid",
    borderColor: "#ccc",
    borderRadius: 4,
  },
  topProTxt: {
    marginTop: 4,
    fontSize: 12,
    color: "black",
    flex: 1,
    textAlign: "center",
  },
  active: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: Color.colorPrimary,
  },
});

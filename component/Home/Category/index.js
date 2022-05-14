import { View, Text, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "./style";
import TopProduct from "./TopProduct";
import Context from "../../../local-data/Context";
const Category = (props) => {
  const [state, dispatch] = useContext(Context);

  const data = [...state.thach.categories];
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => {
          return <TopProduct key={index} data={item} />;
        })}
      </ScrollView>
    </View>
  );
};

export default Category;

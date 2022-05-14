import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./style";

const index = () => {
  const [data, setData] = useState([
    { name: "Thịt, cá, trứng, hải sản", active: false },
    { name: "Rau, củ, trái cây", active: true },
    { name: "Hàng đông mát", active: false },
    { name: "Mì, miến, cháo, phở", active: false },
  ]);

  const handleSelectCategory = (index) =>{
    let dataTemp = [...data]
    for(let i = 0; i<dataTemp.length; i++){
      dataTemp[i].active = false
    }
    dataTemp[index].active = true
    setData([...dataTemp])
  }


  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        return (
          <TouchableOpacity key={index} onPress={()=>{handleSelectCategory(index)}}>
            <View style={[styles.item, item.active ? styles.itemActive : ""]}>
              <Text
                style={[
                  styles.itemText,
                  item.active ? styles.itemTextActive : "",
                ]}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default index;

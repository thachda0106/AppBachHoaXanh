import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { styles } from "./style";
import Img1 from "../../../assets/img/top-product-1.png";
import Img2 from "../../../assets/img/top-product-2.png";
import Img4 from "../../../assets/img/top-product-4.png";
import Img3 from "../../../assets/img/top-product-3.png";
import Img5 from "../../../assets/img/top-product-5.png";

const index = () => {
  const data = [
    { img: Img1, name: "Thịt heo các loại" },
    { img: Img2, name: "Sữa tươi" },
    { img: Img3, name: "Nước ngọt" },
    { img: Img4, name: "Mì ăn liền" },
    { img: Img5, name: "Dầu ăn" },
    { img: Img1, name: "Thịt heo các loại" },
    { img: Img2, name: "Sữa tươi" },
    { img: Img3, name: "Nước ngọt" },
    { img: Img4, name: "Mì ăn liền" },
    { img: Img5, name: "Dầu ăn" },
    { img: Img1, name: "Thịt heo các loại" },
    { img: Img2, name: "Sữa tươi" },
    { img: Img3, name: "Nước ngọt" },
    { img: Img4, name: "Mì ăn liền" },
    { img: Img5, name: "Dầu ăn" },
    { img: Img1, name: "Thịt heo các loại" },
    { img: Img2, name: "Sữa tươi" },
    { img: Img3, name: "Nước ngọt" },
    { img: Img4, name: "Mì ăn liền" },
    { img: Img5, name: "Dầu ăn" },
    { img: Img1, name: "Thịt heo các loại" },
    { img: Img2, name: "Sữa tươi" },
    { img: Img3, name: "Nước ngọt" },
    { img: Img4, name: "Mì ăn liền" },
    { img: Img5, name: "Dầu ăn" },
    { img: Img1, name: "Thịt heo các loại" },
    { img: Img2, name: "Sữa tươi" },
    { img: Img3, name: "Nước ngọt" },
    { img: Img4, name: "Mì ăn liền" },
    { img: Img5, name: "Dầu ăn" },
    { img: Img1, name: "Thịt heo các loại" },
    { img: Img2, name: "Sữa tươi" },
    { img: Img3, name: "Nước ngọt" },
    { img: Img4, name: "Mì ăn liền" },
    { img: Img5, name: "Dầu ăn" },
    { img: Img1, name: "Thịt heo các loại" },
    { img: Img2, name: "Sữa tươi" },
    { img: Img3, name: "Nước ngọt" },
    { img: Img4, name: "Mì ăn liền" },
    { img: Img5, name: "Dầu ăn" },
  ];
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.itemWrapper}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity style={styles.item} key={index}>
              <View style={styles.itemBackground}>
                <Image source={item.img} style={styles.itemImg} />
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
        </View>
      </ScrollView>
    </View>
  );
};

export default index;

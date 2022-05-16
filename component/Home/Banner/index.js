import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import { styles } from "./style";
import Banner1 from "../../../assets/img/banner1.png";
import Banner2 from "../../../assets/img/banner2.png";
import Banner3 from "../../../assets/img/banner3.png";
import Banner4 from "../../../assets/img/banner4.png";
import Banner5 from "../../../assets/img/banner5.png";

const Banner = () => {
  return (
    <View style={styles.wrapper}>
      <Swiper autoplay={true} autoplayTimeout={2} showsPagination={false} >
        <TouchableOpacity>
          <Image source={Banner1} style={styles.bannerImg} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Banner2} style={styles.bannerImg} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Banner3} style={styles.bannerImg} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Banner4} style={styles.bannerImg} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Banner5} style={styles.bannerImg} />
        </TouchableOpacity>
      </Swiper>
    </View>
  );
};

export default Banner;

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSleigh,
  faUndo,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../Loading";
import Chart from "./Chart";
import PopularItem from "./PopularItem";
import Context from "../../../local-data/Context";
import * as Actions from "../../../local-data/Actions";
import { Function } from "../../../Constant/Function";
import EmptyImg from "../../../assets/img/tien/empty.png";

const Statistic = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [year, setYear] = useState(new Date().getFullYear());
  const [yearInput, setYearInput] = useState(new Date().getFullYear());
  const [topProducts, setTopProducts] = useState();
  const [haveTop, setHaveTop] = useState(false);
  const [turnover, setTurnover] = useState();

  useEffect(() => {
    setTurnover(() => {
      let temp = [];
      for (let i = 1; i <= 12; i++) {
        temp.push({
          month: i,
          money: 0,
        });
      }
      for (let i = 0; i < state.thach.orders.length; i++) {
        if (
          Function.timestampToDate(
            state.thach.orders[i].dateDelivery,
            "year"
          ) == year
        ) {
          temp[
            Function.timestampToDate(
              state.thach.orders[i].dateDelivery,
              "month"
            ) - 1
          ].money += Function.getOrderAllPrice(state.thach.orders[i]);
        }
      }
      return temp;
    });

    setTopProducts(() => {
      let temp = [];
      setHaveTop(false);
      for (let i = 0; i < state.thach.products.length; i++) {
        let product = {
          productID: state.thach.products[i].productID,
          name: state.thach.products[i].name,
          img: state.thach.products[i].img,
          buyNumber: 0,
        };
        for (let j = 0; j < state.thach.orders.length; j++) {
          if (
            Function.timestampToDate(
              state.thach.orders[j].dateDelivery,
              "year"
            ) == year
          ) {
            for (
              let k = 0;
              k < state.thach.orders[j].listProductCart.length;
              k++
            ) {
              if (
                state.thach.orders[j].listProductCart[k].productID ==
                product.productID
              ) {
                setHaveTop(true);
                product.buyNumber +=
                  state.thach.orders[j].listProductCart[k].quantity;
              }
            }
          }
        }
        temp.push(product);
      }
      return Function.orderBy(temp, "buyNumber", -1);
    });
  }, [year]);

  const handleSearch = () => {
    setYear(yearInput);
  };

  if (!topProducts || !turnover) return <></>;
  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <View style={styles.header}>
        <FontAwesomeIcon
          icon={faBars}
          size={28}
          color={"black"}
          onPress={() => {
            props.navigation.openDrawer();
          }}
        />
        <Text style={styles.headerTitle}>Thống kê</Text>
      </View>

      {/* Content */}
      <View style={styles.chart}>
        <Text style={styles.title}>Thống kê doanh thu theo từng tháng</Text>
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="Tìm kiếm theo năm"
            style={styles.searchInput}
            keyboardType="numeric"
            value={yearInput.toString()}
            onChangeText={(text) => setYearInput(text)}
          />
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => {
              handleSearch();
            }}
          >
            <Text style={styles.searchBtnText}>Tìm kiếm</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal>
          <Chart turnover={turnover} />
        </ScrollView>
      </View>

      <View style={[styles.chart, styles.rank]}>
        <Text style={[styles.title, { textAlign: "center", marginBottom: 12 }]}>
          Top 10 sản phẩm bán chạy năm {year}
        </Text>
        {!haveTop && (
          <Image
            source={EmptyImg}
            style={{ width: 320, height: 280, alignSelf: "center" }}
          />
        )}
        <ScrollView style={{ height: 360 }}>
          {topProducts.map((item, index) => {
            if (index < 10 && item.buyNumber > 0)
              return <PopularItem key={index} top={index + 1} product={item} />;
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Statistic;

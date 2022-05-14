import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import { useContext, useState } from "react";

import { styles } from "./styles";
import VoucherCart from "./VoucherCart";
import { Function } from "../../../Constant/Function";
const VoucherListCart = (props) => {
  const voucher = Function.orderBy(props.voucher.list, "dateStart", -1);
  // console.log(voucher)
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{voucher.type}</Text>
      </View>

      <View>
        <ScrollView style={styles.listVoucherContainer}>
          {voucher.map((voucher, index) => {
            if (
             Function.compareTimeNow(voucher.dateStart, voucher.dateEnd)
            )
              return (
                <VoucherCart
                  key={index}
                  navigation={props.navigation}
                  voucher={voucher}
                  setIsLoading={props.setIsLoading}
                />
              );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default VoucherListCart;

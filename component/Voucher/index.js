import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import Item from "./Item";
import Context from "../../local-data/Context";
import { Function } from "../../Constant/Function";
import NoVCImg from "../../assets/img/tien/no_voucher.png";

const Voucher = (props) => {
  const [mode, setMode] = useState(props.route.params.mode);
  const [state, dispatch] = useContext(Context);
  const [myVoucherList, setVoucherList] = useState();
  const [voucherCount, setVoucherCount] = useState(0);
  const [selectedVoucher, setSelectedVoucher] = useState(
    props.route.params.selectedVoucher
  );
  useEffect(() => {
    setVoucherList([...state.thach.currentUser.userListVoucher]);
    setVoucherCount(() => {
      let count = 0;
      for (let i = 0; i < state.thach.currentUser.userListVoucher.length; i++) {
        if (!state.thach.currentUser.userListVoucher[i].use) return 1;
      }
      return 0;
    });
  }, [state]);

  // console.log(props.route.params.selectedVoucher)

  // console.log("Voucher duoc chon "+selectedVoucher)

  if (!myVoucherList) return <></>;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} size={20} color={"black"} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {mode === "view" ? "Mã khuyến mãi của tôi" : "Chọn voucher giảm giá"}
        </Text>
      </View>

      <ScrollView styles={styles.content}>
        {myVoucherList.map((item, index) => {
          if (!item.use)
            return (
              <Item
                key={index}
                index={index}
                voucher={item}
                setSelectedVoucher={setSelectedVoucher}
                selectedVoucher={selectedVoucher}
                mode={mode}
              />
            );
        })}
        {voucherCount === 0 && (
          <View style={styles.noVCWrapper}>
            <Image
              source={NoVCImg}
              style={{ width: 320, height: 320, resizeMode: "contain" }}
            />
          </View>
        )}
      </ScrollView>

      {!mode && (
        <TouchableOpacity
          style={styles.btnAccept}
          onPress={() => {
            // props.navigation.goBack({fromApplyVoucher:true})
            props.navigation.navigate("Cart", {
              from: "Voucher",
              selectedVoucher,
            });
          }}
        >
          <Text style={styles.btnAcceptText}>Đồng ý</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Voucher;

import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./styles";
import { DataTable } from "react-native-paper";
import Context from "../../../local-data/Context";
import * as Actions from "../../../local-data/Actions";
import EmptyImg from "../../../assets/img/tien/empty.png";
import FolderIcon from "../../../assets/img/tien/folder_icon.gif";
import * as ImagePicker from "expo-image-picker";
import Color from "../../../Constant/Color";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSleigh, faUndo, faBars } from "@fortawesome/free-solid-svg-icons";
import { Function } from "../../../Constant/Function";
import APICaller from "../../../local-data/APICaller";
import Loading from "../../Loading";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { CheckBox } from "react-native-elements";

const Voucher = (props) => {
  const [state, dispatch] = useContext(Context);
  const [vouchers, setVouchers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("add");
  const [editSelected, setEditSelected] = useState(-1);
  var fadeAnim = new Animated.Value(1);

  // Input
  const [productID, setProductID] = useState("");
  const [confirmProductID, setConfirmProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [img, setImg] = useState();
  const [quantity, setQuantity] = useState();
  const [discountValue, setDiscountValue] = useState();
  const [maxDiscountValue, setMaxDiscountValue] = useState();
  const [dateStart, setDateStart] = useState(new Date().getTime());
  const [dateEnd, setDateEnd] = useState(new Date().getTime());
  const [description, setDescription] = useState("");
  const [noticeAlert, setNoticeAlert] = useState(false);
  const [isView, setIsView] = useState(false);
  const [selectedID, setSelectedID] = useState();

  useEffect(() => {
    setVouchers([...state.thach.vouchers]);
  }, [state]);

  // Function
  const handleBackToAdd = () => {
    setIsView(false);
    setConfirmProductID("");
    setProductID("");
    setProductName("");
    setQuantity();
    setDiscountValue();
    setMaxDiscountValue();
    setDescription();
    setImg();
    setDateStart(new Date().getTime());
    setDateEnd(new Date().getTime());
    setSelectedID();
  };

  const handleView = (voucher) => {
    setIsView(true);
    handleSearchProduct(voucher.productID);
    setQuantity(voucher.quantity);
    setDiscountValue(voucher.discountValue);
    setMaxDiscountValue(voucher.maxDiscountValue);
    setDescription(voucher.description);
    setSelectedID(voucher.voucherID);
    setDateStart(voucher.dateStart);
    setDateEnd(voucher.dateEnd);
  };

  const handleDeleteVoucher = () => {
    Alert.alert("Th??ng b??o", "B???n c?? mu???n x??a m?? gi???m gi?? n??y?", [
      {
        text: "H???y",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "?????ng ??",
        onPress: async () => {
          // dispatch(Actions.deleteVoucher(selectedID));
          setIsLoading(true);
          let res = await APICaller.deleteVoucher(selectedID);
          setIsLoading(false);
          if (res.status >= 200 && res.status <= 299) {
            dispatch(Actions.setVouchersFromAPI(res.data));
            Function.showToast("success", "???? x??a m?? gi???m gi?? n??y");
            handleBackToAdd();
          } else {
            Function.showToast(
              "error",
              "???? c?? l???i khi x??a m?? gi???m gi??" + res.status
            );
          }
        },
      },
    ]);
  };

  // T??m s???n ph???m
  const handleSearchProduct = (id) => {
    let product = Function.findProduct(
      state.thach.products,
      id ? id : productID
    );
    if (product) {
      setImg(product.img);
      setProductName(product.name);
      setConfirmProductID(product.productID);
    } else {
      Function.showToast("error", "Kh??ng t??m th???y s???n ph???m n??y");
    }
  };

  const checkInput = () => {
    if (
      confirmProductID === "" ||
      description === "" ||
      !quantity ||
      !discountValue ||
      !maxDiscountValue
    ) {
      Function.showToast("error", "Th??ng tin kh??ng ???????c tr???ng");
      return false;
    }
    if (quantity <= 0) {
      Function.showToast("error", "S??? l?????ng ph???i l???n h??n 0");
      return false;
    }
    if (discountValue <= 0 || discountValue > 100) {
      Function.showToast("error", "Gi???m gi?? ph???i t??? 1% ?????n 100%");
      return false;
    }
    if (maxDiscountValue <= 0) {
      Function.showToast("error", "Gi???m t???i ??a ph???i l???n h??n 0");
      return false;
    }
    return true;
  };

  const handleAddVoucher = async () => {
    if (checkInput()) {
      let newVoucher = {
        voucherID:
          Number(Function.getMaxIndex(state.thach.vouchers, "voucherID")) + 1,
        code: "ABC",
        quantity: quantity,
        description: description,
        discountValue: discountValue,
        dateStart: parseInt(dateStart / 1000),
        dateEnd: parseInt(dateEnd / 1000),
        productID: confirmProductID,
        maxDiscountValue: maxDiscountValue,
      };
      // console.log(dateStart +"-"+dateEnd)
      // dispatch(Actions.addVoucher(newVoucher, noticeAlert));
      setIsLoading(true);
      let res = await APICaller.addVoucher(newVoucher);
      if (res.status >= 200 && res.status <= 299) {
        dispatch(Actions.setVouchersFromAPI(res.data));
        Function.showToast("success", "Th??m voucher m???i th??nh c??ng");
        if(noticeAlert){
          res = await APICaller.addAlert("", "C?? m?? gi???m gi?? m???i", "M?? gi???m gi??: \""+ newVoucher.description+"\" ???? xu???t hi???n, h??y thu th???p ngay ????? ???????c nh???ng ??u ????i t???t nh???t")
        setIsLoading(false)
        if (res.status >= 200 && res.status <= 299) {
          dispatch(Actions.addAlert(res.data))
        }
        else{
          Function.showToast(
          "error",
          "???? c?? l???i khi add alert m???i" + res.status
        );
        }
        }
        else{
          setIsLoading(false)
        }
      } else {
        Function.showToast(
          "error",
          "???? c?? l???i khi t???o voucher m???i" + res.status
        );
      }
    }
  };

  // mode 1: setDateStart
  // mode 2: setDateEnd
  const openDatePicker = (mode) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (event, selectedDate) => {
        if (mode === 1) {
          setDateStart(Function.dateToTimestamp(selectedDate));
        } else if (mode === 2)
          setDateEnd(Function.dateToTimestamp(selectedDate));
      },
      mode: "date",
    });
  };

  if (!vouchers) return <></>;

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
        <Text style={styles.headerTitle}>Qu???n l?? m?? gi???m gi??</Text>
      </View>
      <View style={styles.controlWrapper}>
        {isView && (
          <TouchableOpacity
            style={styles.backToAddBtn}
            onPress={() => {
              handleBackToAdd();
            }}
          >
            <FontAwesomeIcon
              icon={faUndo}
              size={24}
              color={Color.colorDarkGray}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.controlTitle}>
          {!isView ? "Th??m m?? gi???m gi??" : "Xem m?? gi???m gi??"}
        </Text>
        <View style={styles.productIDWrapper}>
          <TextInput
            style={[styles.controlName, { width: "78%" }]}
            placeholder="Nh???p m?? s???n ph???m ???????c ??p d???ng"
            value={productID}
            onChangeText={(text) => {
              setProductID(text);
            }}
          />
          <TouchableOpacity
            style={styles.inputBtn}
            onPress={() => {
              handleSearchProduct();
            }}
          >
            <Text style={styles.inputBtnText}>T??m</Text>
          </TouchableOpacity>
        </View>
        {/* Th??ng tin s???n ph???m */}
        <View style={styles.productWrapper}>
          <Image
            source={img ? { uri: img } : EmptyImg}
            style={styles.productImage}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.productName}
          >
            {productName}
          </Text>
        </View>

        {/* S??? l?????ng, % gi???m , gi???m t???i ??a */}
        {/* Gi?? ti???n, s??? l?????ng, gi???m gi?? */}
        <View style={styles.controlNumberWrapper}>
          <TextInput
            style={[styles.controlName, styles.controlNumber]}
            keyboardType="numeric"
            placeholder="S??? l?????ng"
            value={quantity?.toString()}
            onChangeText={(text) => {
              setQuantity(text);
            }}
          />
          <TextInput
            style={[styles.controlName, styles.controlNumber]}
            keyboardType="numeric"
            placeholder="Gi???m gi?? (%)"
            value={discountValue?.toString()}
            onChangeText={(text) => {
              setDiscountValue(text);
            }}
          />
          <TextInput
            style={[styles.controlName, styles.controlNumber]}
            keyboardType="numeric"
            placeholder="T???i ??a (vnd)"
            value={maxDiscountValue?.toString()}
            onChangeText={(text) => {
              setMaxDiscountValue(text);
            }}
          />
        </View>

        {/* Ng??y ??p d???ng gi???m gi??*/}
        <View style={styles.dateWrapper}>
          <Text
            style={styles.inputDate}
            onPress={() => {
              openDatePicker(1);
            }}
          >
            B???t ?????u: {Function.timestampToDate(dateStart)}
          </Text>

          <Text
            style={styles.inputDate}
            onPress={() => {
              openDatePicker(2);
            }}
          >
            K???t th??c: {Function.timestampToDate(dateEnd)}
          </Text>
        </View>

        {/* M?? t??? m?? voucher */}
        <TextInput
          placeholder="M?? t??? chi ti???t m?? gi???m gi??"
          multiline={true}
          style={styles.description}
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        <TouchableOpacity
          style={styles.noticeAlert}
          onPress={() => {
            setNoticeAlert(!noticeAlert);
          }}
        >
          <CheckBox
            style={{ marginLeft: -12 }}
            checked={noticeAlert}
            onPress={() => {
              setNoticeAlert(!noticeAlert);
            }}
          />
          <Text style={{ marginLeft: -12 }}>????nh k??m th??ng b??o</Text>
        </TouchableOpacity>
        <View style={styles.controlBtnWrapper}>
          {!isView && (
            <TouchableOpacity
              style={styles.controlAddBtn}
              onPress={() => {
                handleAddVoucher();
              }}
            >
              <Text style={styles.controlAddBtnTxt}>Th??m</Text>
            </TouchableOpacity>
          )}
          {isView && (
            <TouchableOpacity
              style={[
                styles.controlAddBtn,
                { backgroundColor: Color.colorRed },
              ]}
              onPress={() => {
                handleDeleteVoucher();
              }}
            >
              <Text style={styles.controlAddBtnTxt}>X??a</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.table}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 1 }}>M??</DataTable.Title>
            <DataTable.Title style={{ flex: 4.5 }}>
              M?? t??? voucher
            </DataTable.Title>
            <DataTable.Title style={{ flex: 1.5 }}>T??y ch???n</DataTable.Title>
          </DataTable.Header>
          {vouchers.map((item, index) => {
            return (
              <DataTable.Row key={index}>
                <DataTable.Cell style={{ flex: 1 }}>
                  <Animated.View
                    style={
                      editSelected === item.voucherID
                        ? { opacity: fadeAnim }
                        : {}
                    }
                  >
                    <Text
                      style={
                        editSelected === item.voucherID
                          ? { fontWeight: "bold" }
                          : {}
                      }
                    >
                      {item.voucherID}
                    </Text>
                  </Animated.View>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 4.5 }}>
                  <Animated.View
                    style={
                      editSelected === item.voucherID
                        ? { opacity: fadeAnim }
                        : {}
                    }
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={
                        editSelected === item.categoryID
                          ? { fontWeight: "bold" }
                          : {}
                      }
                    >
                      {Function.cropText(item.description, 25)}
                    </Text>
                  </Animated.View>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 1.5 }}>
                  <Animated.View
                    style={[
                      styles.tableBtnWrapper,
                      editSelected === item.voucherID
                        ? { opacity: fadeAnim }
                        : {},
                    ]}
                  >
                    <TouchableOpacity
                      style={styles.controlImgBtn}
                      onPress={() => {
                        handleView(item);
                      }}
                    >
                      <Text
                        style={[
                          styles.controlImgBtnTxt,
                          { color: Color.colorInfo },
                        ]}
                      >
                        Xem
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </ScrollView>
    </View>
  );
};

export default Voucher;

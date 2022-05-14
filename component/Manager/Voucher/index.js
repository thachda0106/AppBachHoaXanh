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
    Alert.alert("Thông báo", "Bạn có muốn xóa mã giảm giá này?", [
      {
        text: "Hủy",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: async () => {
          // dispatch(Actions.deleteVoucher(selectedID));
          setIsLoading(true);
          let res = await APICaller.deleteVoucher(selectedID);
          setIsLoading(false);
          if (res.status >= 200 && res.status <= 299) {
            dispatch(Actions.setVouchersFromAPI(res.data));
            Function.showToast("success", "Đã xóa mã giảm giá này");
            handleBackToAdd();
          } else {
            Function.showToast(
              "error",
              "Đã có lỗi khi xóa mã giảm giá" + res.status
            );
          }
        },
      },
    ]);
  };

  // Tìm sản phẩm
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
      Function.showToast("error", "Không tìm thấy sản phẩm này");
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
      Function.showToast("error", "Thông tin không được trống");
      return false;
    }
    if (quantity <= 0) {
      Function.showToast("error", "Số lượng phải lớn hơn 0");
      return false;
    }
    if (discountValue <= 0 || discountValue > 100) {
      Function.showToast("error", "Giảm giá phải từ 1% đến 100%");
      return false;
    }
    if (maxDiscountValue <= 0) {
      Function.showToast("error", "Giảm tối đa phải lớn hơn 0");
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
        Function.showToast("success", "Thêm voucher mới thành công");
        if(noticeAlert){
          res = await APICaller.addAlert("", "Có mã giảm giá mới", "Vào voucher và thu thập mã giảm giá mới để được những ưu đãi tốt nhất")
        setIsLoading(false)
        if (res.status >= 200 && res.status <= 299) {
          dispatch(Actions.addAlert(res.data))
        }
        else{
          Function.showToast(
          "error",
          "Đã có lỗi khi add alert mới" + res.status
        );
        }
        }
        else{
          setIsLoading(false)
        }
      } else {
        Function.showToast(
          "error",
          "Đã có lỗi khi tạo voucher mới" + res.status
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
        <Text style={styles.headerTitle}>Quản lý mã giảm giá</Text>
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
          {!isView ? "Thêm mã giảm giá" : "Xem mã giảm giá"}
        </Text>
        <View style={styles.productIDWrapper}>
          <TextInput
            style={[styles.controlName, { width: "78%" }]}
            placeholder="Nhập mã sản phẩm được áp dụng"
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
            <Text style={styles.inputBtnText}>Tìm</Text>
          </TouchableOpacity>
        </View>
        {/* Thông tin sản phẩm */}
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

        {/* Số lượng, % giảm , giảm tối đa */}
        {/* Giá tiền, số lượng, giảm giá */}
        <View style={styles.controlNumberWrapper}>
          <TextInput
            style={[styles.controlName, styles.controlNumber]}
            keyboardType="numeric"
            placeholder="Số lượng"
            value={quantity?.toString()}
            onChangeText={(text) => {
              setQuantity(text);
            }}
          />
          <TextInput
            style={[styles.controlName, styles.controlNumber]}
            keyboardType="numeric"
            placeholder="Giảm giá (%)"
            value={discountValue?.toString()}
            onChangeText={(text) => {
              setDiscountValue(text);
            }}
          />
          <TextInput
            style={[styles.controlName, styles.controlNumber]}
            keyboardType="numeric"
            placeholder="Tối đa (vnd)"
            value={maxDiscountValue?.toString()}
            onChangeText={(text) => {
              setMaxDiscountValue(text);
            }}
          />
        </View>

        {/* Ngày áp dụng giảm giá*/}
        <View style={styles.dateWrapper}>
          <Text
            style={styles.inputDate}
            onPress={() => {
              openDatePicker(1);
            }}
          >
            Bắt đầu: {Function.timestampToDate(dateStart)}
          </Text>

          <Text
            style={styles.inputDate}
            onPress={() => {
              openDatePicker(2);
            }}
          >
            Kết thúc: {Function.timestampToDate(dateEnd)}
          </Text>
        </View>

        {/* Mô tả mã voucher */}
        <TextInput
          placeholder="Mô tả chi tiết mã giảm giá"
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
          <Text style={{ marginLeft: -12 }}>Đính kèm thông báo</Text>
        </TouchableOpacity>
        <View style={styles.controlBtnWrapper}>
          {!isView && (
            <TouchableOpacity
              style={styles.controlAddBtn}
              onPress={() => {
                handleAddVoucher();
              }}
            >
              <Text style={styles.controlAddBtnTxt}>Thêm</Text>
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
              <Text style={styles.controlAddBtnTxt}>Xóa</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.table}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 1 }}>Mã</DataTable.Title>
            <DataTable.Title style={{ flex: 4.5 }}>
              Mô tả voucher
            </DataTable.Title>
            <DataTable.Title style={{ flex: 1.5 }}>Tùy chọn</DataTable.Title>
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

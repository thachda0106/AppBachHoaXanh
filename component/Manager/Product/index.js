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
import React, { useContext, useEffect, useRef, useState } from "react";
import { styles } from "./styles";
import { DataTable } from "react-native-paper";
import Context from "../../../local-data/Context";
import * as Actions from "../../../local-data/Actions";
import EmptyImg from "../../../assets/img/tien/empty.png";
import FolderIcon from "../../../assets/img/tien/folder_icon.gif";
import * as ImagePicker from "expo-image-picker";
import Color from "../../../Constant/Color";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSleigh,
  faUndo,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Function } from "../../../Constant/Function";
import { Picker } from "@react-native-picker/picker";
import Loading from "../../Loading";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import APICaller from "../../../local-data/APICaller";

const Product = (props) => {
  const EmptyImgUri = Image.resolveAssetSource(EmptyImg).uri;
  const svRef = useRef();
  const [state, dispatch] = useContext(Context);
  const [products, setProducts] = useState();
  const [title, setTitle] = useState("add");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [origin, setOrigin] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [description, setDescription] = useState();
  const [discountPercent, setDiscountPercent] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [img, setImg] = useState();
  const [categories, setCategories] = useState();
  const [dateMFG, setDateMFG] = useState(new Date().getTime());
  const [dateEXP, setDateEXP] = useState(new Date().getTime());
  const [editSelected, setEditSelected] = useState(-1);
  const [dateDiscountStart, setDateDiscountStart] = useState(
    new Date().getTime()
  );
  const [dateDiscountEnd, setDateDiscountEnd] = useState(new Date().getTime());
  var [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  var fadeAnim = new Animated.Value(1);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  useEffect(() => {
    setCategories(state.thach.categories);
    setProducts(state.thach.products);
  }, [state]);

  // Function
  // mode 1: setDateDiscountStart
  // mode 2: setDateDiscountEnd
  // mode 3: setDateMFG
  // mode 4: setDateEXP
  const openDatePicker = (mode) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (event, selectedDate) => {
        if (mode === 1) {
          setDateDiscountStart(Function.dateToTimestamp(selectedDate));
        } else if (mode === 2)
          setDateDiscountEnd(Function.dateToTimestamp(selectedDate));
        else if (mode === 3) setDateMFG(Function.dateToTimestamp(selectedDate));
        else if (mode === 4) setDateEXP(Function.dateToTimestamp(selectedDate));
      },
      mode: "date",
    });
  };

  const checkInput = () => {
    if (
      category === 0 ||
      name === "" ||
      branch === "" ||
      origin === "" ||
      ingredient === "" ||
      description === "" ||
      !img
    ) {
      Function.showToast("error", "Thông tin không được trống");
      return false;
    }
    if (price <= 0) {
      Function.showToast("error", "Giá tiền phải lớn hơn 0");
      return false;
    }
    return true;
  };

  const getNewProduct = () => {
    return {
      productID:
        editSelected === -1
          ? Number(Function.getMaxIndex(state.thach.products, "productID")) + 1
          : editSelected,
      name,
      price,
      quantity,
      img,
      categoryID: category,
      discountPercent,
      dateMFG: parseInt(dateMFG / 1000),
      dateEXP: parseInt(dateEXP / 1000),
      description,
      branch,
      origin,
      ingredient,
      dateDiscountStart: parseInt(dateDiscountStart / 1000),
      dateDiscountEnd: parseInt(dateDiscountEnd / 1000),
    };
  };

  const handleAddProduct = async () => {
    if (checkInput()) {
      if (quantity == 0) {
        Alert.alert(
          "Cảnh báo",
          "Bạn chưa thiết lập số lượng sản phẩm, mặc định sẽ là 0. Bạn có đồng ý?",
          [
            {
              text: "Hủy",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "Đồng ý",
              onPress: async () => {
                setIsLoading(true);
                let newProduct = getNewProduct();
                let res = await APICaller.addAPIProduct(newProduct);
                setIsLoading(false);
                if (res.status >= 200 && res.status <= 299) {
                  dispatch(Actions.addProduct(newProduct));
                } else {
                  Function.showToast("error", "Đã có lỗi xảy ra " + res.status);
                }
              },
            },
          ]
        );
      } else {
        setIsLoading(true);
        let newProduct = getNewProduct();
        let res = await APICaller.addAPIProduct(newProduct);
        setIsLoading(false);
        if (res.status >= 200 && res.status <= 299) {
          dispatch(Actions.addProduct(newProduct));
        } else {
          Function.showToast("error", "Đã có lỗi xảy ra " + res.status);
        }
      }
    }
  };

  // Edit category
  const handleSwitchEdit = (product) => {
    svRef.current.scrollTo({ y: 0, animated: true });
    setTitle("edit");
    setEditSelected(product.productID);
    setCategory(product.categoryID);
    setName(product.name);
    setBranch(product.branch);
    setQuantity(product.quantity);
    setPrice(product.price);
    setDiscountPercent(product.discountPercent);
    setOrigin(product.origin);
    setDateDiscountStart(product.dateDiscountStart);
    setDateDiscountEnd(product.dateDiscountEnd);
    setDateMFG(product.dateMFG);
    setDateEXP(product.dateEXP);
    setDescription(product.description);
    setIngredient(product.ingredient);
    setImg(product.img);
  };

  const handleBackToAdd = () => {
    setTitle("add");
    setEditSelected(-1);
    setCategory(0);
    setName("");
    setBranch("");
    setOrigin("");
    setQuantity();
    setPrice();
    setDiscountPercent();
    setDateDiscountStart(new Date().getTime());
    setDateDiscountEnd(new Date().getTime());
    setDateMFG(new Date().getTime());
    setDateEXP(new Date().getTime());
    setDescription("");
    setIngredient("");
    setImg();
  };

  const handleEdit = () => {
    Alert.alert("Cảnh báo", "Bạn có muốn cập nhật " + name, [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: async () => {
          setIsLoading(true);
          let res = await APICaller.editAPIProduct(getNewProduct());
          setIsLoading(false);
          if (res.status >= 200 && res.status <= 299) {
            dispatch(Actions.editProduct(getNewProduct()))
          } else {
            Function.showToast("error", "Đã có lỗi xảy ra " + res.status);
          }
        },
      },
    ]);
  };

  const handleDelete = () => {
    Alert.alert("Cảnh báo", "Bạn có muốn xóa " + name, [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: async () => {
          setIsLoading(true);
          let res = await APICaller.deleteAPIProduct(editSelected);
          setIsLoading(false);
          if (res.status >= 200 && res.status <= 299) {
            dispatch(Actions.deleteProduct(editSelected));
            handleBackToAdd();
          } else {
            Function.showToast("error", "Đã có lỗi xảy ra " + res.status);
          }
        },
      },
    ]);
  };

  const requestPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied");
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    let permission = await requestPermission();
    if (!permission) {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setImg(result.uri);
    }
  };

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
        <Text style={styles.headerTitle}>Quản lý sản phẩm</Text>
      </View>
      <ScrollView ref={svRef}>
        <View style={styles.controlWrapper}>
          {title === "edit" && (
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
            {title === "add" ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
          </Text>

          {/* Chọn danh mục sản phẩm */}
          <Picker
            selectedValue={category}
            style={styles.pickerCategory}
            onValueChange={(item) => {
              setCategory(item);
            }}
          >
            <Picker.Item label={"Chọn danh mục sản phẩm"} value={"0"} />
            {categories &&
              categories.map((item, index) => {
                return (
                  <Picker.Item
                    key={index}
                    label={item.name}
                    value={item.categoryID}
                  />
                );
              })}
          </Picker>

          <TextInput
            style={styles.controlName}
            placeholder="Nhập tên sản phẩm"
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />

          {/* Thương hiệu */}
          <View style={styles.controlNumberWrapper}>
            <TextInput
              style={[styles.controlName, { width: "48%" }]}
              placeholder="Nguồn gốc"
              value={origin}
              onChangeText={(text) => {
                setOrigin(text);
              }}
            />
            <TextInput
              style={[styles.controlName, { width: "48%" }]}
              placeholder="Thương hiệu"
              value={branch}
              onChangeText={(text) => {
                setBranch(text);
              }}
            />
          </View>

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
              placeholder="Giá tiền"
              value={price?.toString()}
              onChangeText={(text) => {
                setPrice(text);
              }}
            />
            <TextInput
              style={[styles.controlName, styles.controlNumber]}
              keyboardType="numeric"
              placeholder="Giảm giá"
              value={discountPercent?.toString()}
              onChangeText={(text) => {
                setDiscountPercent(text);
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
              Bắt đầu: {Function.timestampToDate(dateDiscountStart)}
            </Text>

            <Text
              style={styles.inputDate}
              onPress={() => {
                openDatePicker(2);
              }}
            >
              Kết thúc: {Function.timestampToDate(dateDiscountEnd)}
            </Text>
          </View>

          {/* Ngày */}
          <View style={styles.dateWrapper}>
            <Text
              style={styles.inputDate}
              onPress={() => {
                openDatePicker(3);
              }}
            >
              NSX: {Function.timestampToDate(dateMFG)}
            </Text>

            <Text
              style={styles.inputDate}
              onPress={() => {
                openDatePicker(4);
              }}
            >
              HSD: {Function.timestampToDate(dateEXP)}
            </Text>
          </View>

          {/* Thành phần */}
          <TextInput
            placeholder="Mô tả thành phần"
            multiline={true}
            value={ingredient}
            onChangeText={(text) => {
              setIngredient(text);
            }}
            style={[styles.description, { height: 80 }]}
          />

          {/* Mô tả */}
          <TextInput
            placeholder="Mô tả chi tiết sản phẩm"
            multiline={true}
            style={styles.description}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />

          <View style={styles.controlImgWrapper}>
            <Image
              source={{ uri: img ? img : EmptyImgUri }}
              style={styles.controlImg}
            />
            <TouchableOpacity
              style={styles.controlImgBtn}
              onPress={() => {
                pickImage();
              }}
            >
              <Text style={styles.controlImgBtnTxt}>Chọn ảnh</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.controlBtnWrapper}>
            {title === "add" && (
              <TouchableOpacity
                style={styles.controlAddBtn}
                onPress={() => {
                  handleAddProduct();
                }}
              >
                <Text style={styles.controlAddBtnTxt}>Thêm</Text>
              </TouchableOpacity>
            )}
            {title === "edit" && (
              <TouchableOpacity
                style={[
                  styles.controlAddBtn,
                  { backgroundColor: Color.colorInfo },
                ]}
                onPress={() => {
                  handleEdit();
                }}
              >
                <Text style={styles.controlAddBtnTxt}>Cập nhật</Text>
              </TouchableOpacity>
            )}
            {title === "edit" && (
              <TouchableOpacity
                style={[
                  styles.controlAddBtn,
                  { backgroundColor: "#ff4c4c", marginTop: 12 },
                ]}
                onPress={() => {
                  handleDelete();
                }}
              >
                <Text style={styles.controlAddBtnTxt}>Xóa</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.searchWrapper}>
            <FontAwesomeIcon
              icon={faSearch}
              size={20}
              color={Color.colorGray}
            />
            <TextInput
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
              }}
              style={styles.searchText}
              placeholder="Nhập tên sản phẩm"
            />
          </View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ flex: 1 }}>Mã sản phẩm</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>
                Tên sản phẩm
              </DataTable.Title>
              <DataTable.Title style={{ flex: 1 }}>Ảnh</DataTable.Title>
              <DataTable.Title style={{ flex: 1 }}>Tùy chọn</DataTable.Title>
            </DataTable.Header>
            {products &&
              products.map((item, index) => {
                if (item.name.toLowerCase().includes(searchText.toLowerCase()))
                  return (
                    <DataTable.Row key={index}>
                      <DataTable.Cell style={{ flex: 1 }}>
                        <Animated.View
                          style={
                            editSelected === item.productID
                              ? { opacity: fadeAnim }
                              : {}
                          }
                        >
                          <Text
                            style={
                              editSelected === item.productID
                                ? { fontWeight: "bold" }
                                : {}
                            }
                          >
                            {item.productID}
                          </Text>
                        </Animated.View>
                      </DataTable.Cell>
                      <DataTable.Cell style={{ flex: 2 }}>
                        <Animated.View
                          style={
                            editSelected === item.productID
                              ? { opacity: fadeAnim }
                              : {}
                          }
                        >
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={
                              editSelected === item.productID
                                ? { fontWeight: "bold" }
                                : {}
                            }
                          >
                            {Function.cropText(item.name)}
                          </Text>
                        </Animated.View>
                      </DataTable.Cell>
                      <DataTable.Cell style={{ flex: 1 }}>
                        <Animated.View
                          style={[
                            styles.tableImgWrapper,
                            editSelected === item.productID
                              ? { opacity: fadeAnim }
                              : {},
                          ]}
                        >
                          <Image
                            style={styles.tableImg}
                            source={{ uri: item.img }}
                            resizeMode={"cover"} // cover or contain its upto you view look
                          />
                        </Animated.View>
                      </DataTable.Cell>
                      <DataTable.Cell style={{ flex: 1 }}>
                        <Animated.View
                          style={[
                            styles.tableBtnWrapper,
                            editSelected === item.productID
                              ? { opacity: fadeAnim }
                              : {},
                          ]}
                        >
                          <TouchableOpacity
                            style={styles.controlImgBtn}
                            onPress={() => {
                              handleSwitchEdit(item);
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
        </View>
      </ScrollView>
    </View>
  );
};

export default Product;

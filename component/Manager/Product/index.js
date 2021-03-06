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
import * as FileSystem from 'expo-file-system';
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
  const [productImage, setProductImage] = useState("")
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
      Function.showToast("error", "Th??ng tin kh??ng ???????c tr???ng");
      return false;
    }
    if (price <= 0) {
      Function.showToast("error", "Gi?? ti???n ph???i l???n h??n 0");
      return false;
    }
    return true;
  };

  const getNewProduct = () => {
    let data =  {
      productID:
        editSelected === -1
          ? Number(Function.getMaxIndex(state.thach.products, "productID")) + 1
          : editSelected,
      name,
      price,
      quantity,
      img,
      productImage,
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

    return data
  };

  const handleAddProduct = async () => {
    if (checkInput()) {
      if (quantity == 0) {
        Alert.alert(
          "C???nh b??o",
          "B???n ch??a thi???t l???p s??? l?????ng s???n ph???m, m???c ?????nh s??? l?? 0. B???n c?? ?????ng ???",
          [
            {
              text: "H???y",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "?????ng ??",
              onPress: async () => {
                setIsLoading(true);
                let newProduct = getNewProduct();
                let res = await APICaller.addAPIProduct(newProduct);
                setIsLoading(false);
                if (res.status >= 200 && res.status <= 299) {
                  dispatch(Actions.addProduct(newProduct));
                } else {
                  Function.showToast("error", "???? c?? l???i x???y ra " + res.status);
                }
              },
            },
          ]
        );
      } else {
        setIsLoading(true);
        let newProduct = getNewProduct();
        console.log({newProduct});
        let res = await APICaller.addAPIProduct(newProduct);
        setIsLoading(false);
        if (res.status >= 200 && res.status <= 299) {
          // console.log(res)
          dispatch(Actions.addProduct(newProduct));
        } else {
          Function.showToast("error", "???? c?? l???i x???y ra " + res.status);
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
    setImg();
    setProductImage(product.productImage)
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
    setProductImage("")
  };

  const handleEdit = () => {
    Alert.alert("C???nh b??o", "B???n c?? mu???n c???p nh???t " + name, [
      {
        text: "H???y",
        style: "cancel",
      },
      {
        text: "?????ng ??",
        onPress: async () => {
          // console.log(getNewProduct())
          setIsLoading(true);
          let res = await APICaller.editAPIProduct(getNewProduct());
          setIsLoading(false);
          if (res.status >= 200 && res.status <= 299) {
            dispatch(Actions.editProduct(getNewProduct()))
          } else {
            Function.showToast("error", "???? c?? l???i x???y ra " + res.status);
          }
        },
      },
    ]);
  };

  const handleDelete = () => {
    Alert.alert("C???nh b??o", "B???n c?? mu???n x??a " + name, [
      {
        text: "H???y",
        style: "cancel",
      },
      {
        text: "?????ng ??",
        onPress: async () => {
          setIsLoading(true);
          let res = await APICaller.deleteAPIProduct(editSelected);
          setIsLoading(false);
          if (res.status >= 200 && res.status <= 299) {
            dispatch(Actions.deleteProduct(editSelected));
            handleBackToAdd();
          } else {
            Function.showToast("error", "???? c?? l???i x???y ra " + res.status);
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
      const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
      setProductImage('data:image/png;base64,' + base64);
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
        <Text style={styles.headerTitle}>Qu???n l?? s???n ph???m</Text>
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
            {title === "add" ? "Th??m s???n ph???m" : "C???p nh???t s???n ph???m"}
          </Text>

          {/* Ch???n danh m???c s???n ph???m */}
          <Picker
            selectedValue={category}
            style={styles.pickerCategory}
            onValueChange={(item) => {
              setCategory(item);
            }}
          >
            <Picker.Item label={"Ch???n danh m???c s???n ph???m"} value={"0"} />
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
            placeholder="Nh???p t??n s???n ph???m"
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />

          {/* Th????ng hi???u */}
          <View style={styles.controlNumberWrapper}>
            <TextInput
              style={[styles.controlName, { width: "48%" }]}
              placeholder="Ngu???n g???c"
              value={origin}
              onChangeText={(text) => {
                setOrigin(text);
              }}
            />
            <TextInput
              style={[styles.controlName, { width: "48%" }]}
              placeholder="Th????ng hi???u"
              value={branch}
              onChangeText={(text) => {
                setBranch(text);
              }}
            />
          </View>

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
              placeholder="Gi?? ti???n"
              value={price?.toString()}
              onChangeText={(text) => {
                setPrice(text);
              }}
            />
            <TextInput
              style={[styles.controlName, styles.controlNumber]}
              keyboardType="numeric"
              placeholder="Gi???m gi??"
              value={discountPercent?.toString()}
              onChangeText={(text) => {
                setDiscountPercent(text);
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
              B???t ?????u: {Function.timestampToDate(dateDiscountStart)}
            </Text>

            <Text
              style={styles.inputDate}
              onPress={() => {
                openDatePicker(2);
              }}
            >
              K???t th??c: {Function.timestampToDate(dateDiscountEnd)}
            </Text>
          </View>

          {/* Ng??y */}
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

          {/* Th??nh ph???n */}
          <TextInput
            placeholder="M?? t??? th??nh ph???n"
            multiline={true}
            value={ingredient}
            onChangeText={(text) => {
              setIngredient(text);
            }}
            style={[styles.description, { height: 80 }]}
          />

          {/* M?? t??? */}
          <TextInput
            placeholder="M?? t??? chi ti???t s???n ph???m"
            multiline={true}
            style={styles.description}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />

          <View style={styles.controlImgWrapper}>
            {productImage? <Image
              source={{ uri: img ? img : productImage }}
              style={styles.controlImg}
            />: <Image
              source={{ uri: img ? img : EmptyImgUri }}
              style={styles.controlImg}
            /> }
            
            <TouchableOpacity
              style={styles.controlImgBtn}
              onPress={() => {
                pickImage();
              }}
            >
              <Text style={styles.controlImgBtnTxt}>Ch???n ???nh</Text>
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
                <Text style={styles.controlAddBtnTxt}>Th??m</Text>
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
                <Text style={styles.controlAddBtnTxt}>C???p nh???t</Text>
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
                <Text style={styles.controlAddBtnTxt}>X??a</Text>
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
              placeholder="Nh???p t??n s???n ph???m"
            />
          </View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ flex: 1 }}>M?? s???n ph???m</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>
                T??n s???n ph???m
              </DataTable.Title>
              <DataTable.Title style={{ flex: 1 }}>???nh</DataTable.Title>
              <DataTable.Title style={{ flex: 1 }}>T??y ch???n</DataTable.Title>
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
                            source={{ uri: item.productImage }}
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

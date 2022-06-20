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
import * as FileSystem from 'expo-file-system';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSleigh, faUndo, faBars } from "@fortawesome/free-solid-svg-icons";
import { Function } from "../../../Constant/Function";
import APICaller from "../../../local-data/APICaller";
import Loading from "../../Loading";

const Category = (props) => {
  var fadeAnim = new Animated.Value(1);
  const [isLoading, setIsLoading] = useState(false);
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

  const [state, dispatch] = useContext(Context);
  const [categories, setCategories] = useState();
  const [title, setTitle] = useState("add");
  const [img, setImg] = useState();
  const [name, setName] = useState("");
  const [editSelected, setEditSelected] = useState(-1);
  const EmptyImgUri = Image.resolveAssetSource(EmptyImg).uri;
  useEffect(() => {
    setCategories(state.thach.categories);
  }, [state]);

  // Function
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

  //Add catgory
  const addCategory = async () => {
    if (!checkInput()) {
      return;
    }
    const base64 = await FileSystem.readAsStringAsync(img, { encoding: 'base64' });

    let category = {
      categoryID:
        Number(Function.getMaxIndex(state.thach.categories, "categoryID")) + 1,
      name: name,
      categoryImage: 'data:image/png;base64,' + base64,
      img: img,
    };
    setIsLoading(true)
    let res = await APICaller.addAPICategory(category);
    setIsLoading(false)
    if (res.status >= 200 && res.status <= 299) {
      dispatch(Actions.addCategory(category));
    } else {
      Function.showToast("error", "Đã có lỗi xảy ra "+res.status);
    }
  };

  //Delete category
  const handleDeleteCategory = (category) => {
    Alert.alert("Cảnh báo", "Bạn có muốn xóa " + category.name, [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: async () => {
          setIsLoading(true)
          let res = await APICaller.deleteAPICategory(category.categoryID);
          setIsLoading(false)
          if (res.status >= 200 && res.status <= 299) {
            dispatch(Actions.deleteCategory(category.categoryID));
            handleBackToAdd();
          } else {
            Function.showToast("error", "Đã có lỗi xảy ra " + res.status);
          }
        },
      },
    ]);
  };
  // Edit category
  const handleEditCategory = (category) => {
    setTitle("edit");
    setName(category.name);
    setImg(category.img);
    setEditSelected(category.categoryID);
  };

  const handleBackToAdd = () => {
    setTitle("add");
    setName("");
    setImg();
    setEditSelected(-1);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    if (!checkInput()) {
      return;
    }
    let category = {
      categoryID: editSelected,
      name: name,
      img: img,
    };
    let res = await APICaller.editAPICategory(category);
    setIsLoading(false);
    if (res.status >= 200 && res.status <= 299) {
      dispatch(Actions.editCategory(editSelected, category));
    } else {
      Function.showToast("error", "Đã có lỗi xảy ra " + res.status);
    }
  };

  const checkInput = () => {
    if (!name || !img) {
      Function.showToast("error", "Thiếu thông tin rồi");
      return false;
    }
    return true;
  };

  if (!categories) return <></>;

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <View style={styles.header}>
        <FontAwesomeIcon icon={faBars} size={28} color={'black'} onPress={()=>{props.navigation.openDrawer();}}/>
        <Text style={styles.headerTitle}>Quản lý danh mục sản phẩm</Text>
      </View>
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
          {title === "add" ? "Thêm danh mục sản phẩm" : "Cập nhật danh mục"}
        </Text>
        <TextInput
          style={styles.controlName}
          placeholder="Nhập tên loại sản phẩm"
          value={name}
          onChangeText={(text) => {
            setName(text);
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
                addCategory();
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
                handleUpdate();
              }}
            >
              <Text style={styles.controlAddBtnTxt}>Cập nhật</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.table}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 1 }}>Mã loại</DataTable.Title>
            <DataTable.Title style={{ flex: 2 }}>Tên loại</DataTable.Title>
            <DataTable.Title style={{ flex: 1 }}>Ảnh</DataTable.Title>
            <DataTable.Title style={{ flex: 1.5 }}>Tùy chọn</DataTable.Title>
          </DataTable.Header>
          {categories.map((item, index) => {
            return (
              <DataTable.Row key={index}>
                <DataTable.Cell style={{ flex: 1 }}>
                  <Animated.View
                    style={
                      editSelected === item.categoryID
                        ? { opacity: fadeAnim }
                        : {}
                    }
                  >
                    <Text
                      style={
                        editSelected === item.categoryID
                          ? { fontWeight: "bold" }
                          : {}
                      }
                    >
                      {item.categoryID}
                    </Text>
                  </Animated.View>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 2 }}>
                  <Animated.View
                    style={
                      editSelected === item.categoryID
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
                      {Function.cropText(item.name)}
                    </Text>
                  </Animated.View>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 1 }}>
                  <Animated.View
                    style={[
                      styles.tableImgWrapper,
                      editSelected === item.categoryID
                        ? { opacity: fadeAnim }
                        : {},
                    ]}
                  >
                    <Image
                      style={styles.tableImg}
                      source={{ uri: item.categoryImage }}
                      resizeMode={"cover"} // cover or contain its upto you view look
                    />
                  </Animated.View>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 1.5 }}>
                  <Animated.View
                    style={[
                      styles.tableBtnWrapper,
                      editSelected === item.categoryID
                        ? { opacity: fadeAnim }
                        : {},
                    ]}
                  >
                    <TouchableOpacity
                      style={styles.controlImgBtn}
                      onPress={() => {
                        handleEditCategory(item);
                      }}
                    >
                      <Text
                        style={[
                          styles.controlImgBtnTxt,
                          { color: Color.colorInfo },
                        ]}
                      >
                        Sửa
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.controlImgBtn}
                      onPress={() => {
                        handleDeleteCategory(item);
                      }}
                    >
                      <Text
                        style={[
                          styles.controlImgBtnTxt,
                          { color: Color.colorRed },
                        ]}
                      >
                        Xóa
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

export default Category;

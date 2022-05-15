import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { styles } from "./styles";
import Toast from "react-native-toast-message";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleLeft,
  faMinus,
  faPlus,
  faCartPlus,
  faCheckCircle,
  faStar,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import Pro1 from "../../../assets/img/product1.png";
import StarBlinkImg from "../../../assets/img/tien/star-blink.gif";
import { Function } from "../../../Constant/Function";
import Color from "../../../Constant/Color";
import Context from "../../../local-data/Context";
import * as Actions from "../../../local-data/Actions";
import Comment from "./Comment";
import BlinkSaleImg from "../../../assets/img/tien/blink-sale.gif";
import APICaller from "../../../local-data/APICaller";
import Loading from "../../Loading";

const ProductInfo = (props) => {
  // Variable
  const startImgRef = useRef();
  const [added, setAdded] = useState(false);
  const [state, dispatch] = useContext(Context);
  const isLogged = state.thach.currentUser.username ? true : false;
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [productList, setProductList] = useState(state.thach.products);
  const [product, setProduct] = useState();
  const [user, setUsers] = useState();
  const [currentUser, setCurentUser] = useState();
  const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProduct(() => {
      for (let i = 0; i < productList.length; i++) {
        if (productList[i].productID === props.route.params.productID) {
          return productList[i];
        }
      }
    });
    setComments(() => {
      let data = [];
      for (let i = 0; i < state.thach.comments.length; i++) {
        if (state.thach.comments[i].productID == props.route.params.productID) {
          data.push(state.thach.comments[i]);
        }
      }
      return data;
    });
    setCurentUser({ ...state.thach.currentUser });
  }, [state]);
  const [commentText, setCommentText] = useState();
  const [starNumber, setStarNumber] = useState(() => {
    for (let i = 0; i < state.thach.comments.length; i++) {
      if (
        state.thach.comments[i].productID == props.route.params.productID &&
        state.thach.currentUser.userID == state.thach.comments[i].userID
      ) {
        return state.thach.comments[i].starNumber;
      }
    }
    return 0;
  });
  // Kiểm tra sản phẩm đã thêm vào giỏ chưa
  const checkAdded = () => {
    if (isLogged) {
      const cart = [...state.thach.currentUser.userListCart];
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].productID === product.productID) {
          setAdded(true);
        }
      }
    }
  };

  const currentUserAfterAddCartItem = () => {
    let tam = { ...currentUser };
    //Phải làm như này nếu không thì tam.userListCart thay đổi thì currentUser.userListCart cũng sẽ bị thay đổi
    tam.userListCart = [...currentUser.userListCart];
    tam.userListCart.push({
      productID: product.productID,
      quantity: 1,
      check: false,
    });
    return tam;
  };

  // Thêm sản phẩm vào giỏ
  const addToCart = async () => {
    setIsLoading(true);
    let res = await APICaller.addProductToUserCart(
      state.thach.currentUser.userID,
      product
    );
    setIsLoading(false);
    if (res.status >= 200 && res.status <= 299) {
      dispatch(Actions.getCurrentUser(res.data));
      Function.showToast("success", "Đã thêm vào giỏ");
    } else {
      Function.showToast("error", "Đã có lỗi khi thêm vào giỏ" + res.status);
    }
  };

  // Đăng comment
  const handlePostComment = async () => {
    setIsLoading(true);
    let newComment = {
      productID: props.route.params.productID,
      content: commentText,
      starNumber: starNumber,
      date: Date.now() / 1000,
      userID: state.thach.currentUser.userID,
    };
    let res = await APICaller.addAPIComments(newComment);
    if (res.status <= 299 && res.status >= 200) {
      let res2 = await APICaller.getAPIComments();
      setIsLoading(false);
      if (res2.status <= 299 && res2.status >= 200) {
        Function.showToast("success", "Post comment thành công ");
        dispatch(Actions.setCommentsFromAPI(res2.data));
      } else {
        Function.showToast(
          "error",
          "Đã có lỗi xảy ra khi lấy comment về " + res.status
        );
      }
    } else {
      setIsLoading(false);
      Function.showToast(
        "error",
        "Đã có lỗi xảy ra khi post comment " + res.status
      );
    }
  };

  const backToHome = () => {
    props.navigation.navigate("Home", {});
  };
  const handleIncreaseQuantity = () => {
    setBuyQuantity(buyQuantity + 1);
  };
  const handleDecreaseQuantity = () => {
    setBuyQuantity(buyQuantity - 1);
  };

  // Code
  if (product && !added) checkAdded();

  if (!product || !comments) return <></>;

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <ScrollView>
        {/* Nut back */}
        <View style={styles.backWrapper}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} size={20} color={"black"} />
          </TouchableOpacity>
        </View>

        <View style={styles.productHeaderWrapper}>
          {Function.compareTimeNow(
            product.dateDiscountStart,
            product.dateDiscountEnd
          ) && <Image source={BlinkSaleImg} style={styles.blinkSaleImg} />}
          {/* Hinh san pham */}
          <View style={styles.productImgWrapper}>
            <Image source={{ uri: product.img }} style={styles.productImg} />
            <Text style={styles.productExpiry}>
              HSD: {Function.timestampToDate(product.dateMFG)}
            </Text>
            <View style={styles.starWrapper}>
              {[1, 2, 3, 4, 5].map((star, index) => {
                return (
                  <FontAwesomeIcon
                    icon={faStar}
                    size={20}
                    color={
                      Function.getProductStars(
                        product.productID,
                        state.thach.comments
                      ) >=
                      index + 1
                        ? Color.colorOrange
                        : Color.colorGray
                    }
                  />
                );
              })}
            </View>
            {product.quantity < 10 && product.quantity > 0 && (
              <Text style={styles.fewQuantityText}>
                Chỉ còn {product.quantity} sản phẩm
              </Text>
            )}
          </View>

          {/* Tên sản phẩm */}
          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.option}>
            <View style={styles.price}>
              <Text style={styles.priceText}>
                {Function.toVND(
                  Function.calculatePrice(
                    product.price,
                    Function.compareTimeNow(
                      product.dateDiscountStart,
                      product.dateDiscountEnd
                    )
                      ? product.discountPercent
                      : 0
                  )
                )}
              </Text>
              {Function.compareTimeNow(
                product.dateDiscountStart,
                product.dateDiscountEnd
              ) && (
                <Text style={styles.originPriceText}>
                  {Function.toVND(product.price)}
                </Text>
              )}
            </View>

            <View style={styles.buyWrapper}>
              {/* Nút thêm vào giỏ */}
              {!added && product.quantity > 0 && (
                <TouchableOpacity
                  activeOpacity={0.4}
                  style={[
                    styles.productBuyBtn,
                    // isLogged ? "" : styles.productBuyBtnDisable,
                  ]}
                  onPress={() => {
                    if (isLogged) {
                      addToCart();
                    } else {
                      props.navigation.navigate("LoginForm", {});
                      Function.showToast(
                        "info",
                        "Bạn cần đăng nhập để thực hiện chức năng này"
                      );
                    }
                  }}
                >
                  <Text style={styles.productBuyText}>Thêm vào giỏ</Text>
                  <FontAwesomeIcon
                    icon={faCartPlus}
                    size={30}
                    color={Color.colorPrimary}
                  />
                </TouchableOpacity>
              )}
              {/* Nút thêm vào giỏ thành công */}
              {added && (
                <View style={styles.productBuyBtn} onPress={() => {}}>
                  <Text style={styles.productBuyText}>Đã thêm vào giỏ</Text>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    size={24}
                    color={Color.colorPrimary}
                  />
                </View>
              )}
              {product.quantity === 0 && !added && (
                <View
                  style={[styles.productBuyBtn, styles.outOfStock]}
                  onPress={() => {}}
                >
                  <Text style={[styles.productBuyText, styles.outOfStockText]}>
                    Hết hàng
                  </Text>
                  <FontAwesomeIcon
                    icon={faFire}
                    size={24}
                    color={Color.colorGrayText}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
        {/* Mô tả sản phẩm */}
        <View style={styles.productInfoWrapper}>
          <Text style={[styles.productInfoTitle, styles.textLarge]}>
            Thông tin sản phẩm
          </Text>
          <Text style={[styles.productInfoContent, styles.textNormal]}>
            {product.description}
          </Text>
          {/* Bảng mô tả chi tiết sản phẩm */}
          <View style={styles.productInfoTable}>
            <View style={[styles.productInfoItemTitle, styles.flexCenter]}>
              <Text>Thương hiệu</Text>
            </View>
            <View style={styles.productInfoItemContext}>
              <Text>{product.branch}</Text>
            </View>
            <View style={[styles.productInfoItemTitle, styles.flexCenter]}>
              <Text>NSX</Text>
            </View>
            <View style={styles.productInfoItemContext}>
              <Text>{Function.timestampToDate(product.dateMFG)}</Text>
            </View>
            <View style={[styles.productInfoItemTitle, styles.flexCenter]}>
              <Text>HSD</Text>
            </View>
            <View style={styles.productInfoItemContext}>
              <Text>{Function.timestampToDate(product.dateEXP)}</Text>
            </View>
            <View style={[styles.productInfoItemTitle, styles.flexCenter]}>
              <Text>Xuất xứ</Text>
            </View>
            <View style={styles.productInfoItemContext}>
              <Text>{product.origin}</Text>
            </View>
            <View style={[styles.productInfoItemTitle, styles.flexCenter]}>
              <Text>Thành phần</Text>
            </View>
            <View style={styles.productInfoItemContext}>
              <Text>{product.ingredient}</Text>
            </View>
          </View>
        </View>

        <View style={styles.commentWrapper}>
          <Text>
            Có
            <Text style={{ fontWeight: "bold" }}> {comments.length} </Text>
            đánh giá về sản phẩm này
          </Text>
          {isLogged && (
            <View style={styles.myRateWrapper}>
              <View style={styles.rateWrapper}>
                <Text style={styles.rateText}>Đánh giá của bạn</Text>
                {[1, 2, 3, 4, 5].map((star, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.4}
                      key={index}
                      onPress={() => {
                        setStarNumber(index + 1);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        size={24}
                        style={{
                          marginHorizontal: 1,
                        }}
                        color={
                          starNumber > index
                            ? Color.colorStar
                            : Color.colorGrayText
                        }
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
              <TextInput
                value={commentText}
                onChangeText={(e) => {
                  setCommentText(e);
                }}
                placeholder="Mời bạn đánh giá sản phẩm"
                multiline={true}
                style={styles.commentInput}
              />
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => {
                  handlePostComment();
                  // Function.showToast("success", "Bạn đã đánh giá thành công");
                  // dispatch(
                  //   Actions.addComment(
                  //     props.route.params.productID,
                  //     commentText,
                  //     starNumber
                  //   )
                  // );
                }}
                style={styles.postCommentBtn}
              >
                <Text style={styles.postCommentBtnTxt}>Gửi</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Bình luận của mọi người */}
          <View style={styles.commentList}>
            {comments &&
              comments.map((comment, index) => {
                return <Comment key={index} comment={comment} setIsLoading={setIsLoading}/>;
              })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductInfo;

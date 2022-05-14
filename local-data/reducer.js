import { ActionSheetIOS } from "react-native";
import { Function } from "../Constant/Function";
import Context from "./Context";
import InitState from "./InitState";
import axios from "axios";
import APICaller from "./APICaller";

const reducer = (state, action) => {
  let stateTemp = { ...state.thach };
  switch (action.type) {
    case "editIsLogin":
      return {
        ...state,
        isLogin: action.payload,
      };
    //Check vào sản phẩm nào đó trong giỏ hàng
    case "selectCartProduct":
      // Không cần thiết phải cập nhật trong users
      for (let i = 0; i < stateTemp.currentUser.userListCart.length; i++) {
        if (
          stateTemp.currentUser.userListCart[i].productID === action.productID
        ) {
          stateTemp.currentUser.userListCart[i].check = action.mode;
          break;
        }
      }
      return {
        ...state,
        stateTemp,
      };
    case "setCartProductQuantity":
      // current user
      for (let i = 0; i < stateTemp.currentUser.userListCart.length; i++) {
        if (
          stateTemp.currentUser.userListCart[i].productID == action.productID
        ) {
          if (action.mode === 1) {
            stateTemp.currentUser.userListCart[i].quantity += 1;
          } else if (
            action.mode === -1 &&
            stateTemp.currentUser.userListCart[i].quantity > 1
          ) {
            stateTemp.currentUser.userListCart[i].quantity -= 1;
          }
        }
      }
      return {
        ...state,
        stateTemp,
      };
    // Thêm hoặc bỏ chọn voucher trong giỏ hàng
    case "applyVoucher":
      for (let i = 0; i < stateTemp.currentUser.userListVoucher.length; i++) {
        stateTemp.currentUser.userListVoucher[i].using = false;
        if (
          stateTemp.currentUser.userListVoucher[i].voucherID == action.voucherID
        ) {
          stateTemp.currentUser.userListVoucher[i].using = action.mode;
        }
      }
      return {
        ...state,
        stateTemp,
      };
    //Thêm sản phẩm vào giỏ hàng
    case "addToCart":
      let cartItem = {
        productID: action.product.productID,
        quantity: 1,
        check: false,
      };
      for (let i = 0; i < stateTemp.users.length; i++) {
        if (stateTemp.users[i].userID === stateTemp.currentUser.userID) {
          stateTemp.users[i].userListCart.push(cartItem);
          break;
        }
      }
      Function.showToast("success", "Sản phẩm đã được thêm vào giỏ");
      return {
        ...state,
        stateTemp,
      };
    // Xóa sản phẩm khỏi giỏ hàng
    case "removeFromCart":
      for (let i = 0; i < stateTemp.currentUser.userListCart.length; i++) {
        if (
          stateTemp.currentUser.userListCart[i].productID == action.productID
        ) {
          stateTemp.currentUser.userListCart.splice(i, 1);
          break;
        }
      }
      for (let i = 0; i < stateTemp.users.length; i++) {
        if (stateTemp.users[i].userID == stateTemp.currentUser.userID) {
          for (let j = 0; j < stateTemp.users[i].userListCart.length; j++) {
            if (
              stateTemp.users[i].userListCart[j].productID == action.productID
            ) {
              stateTemp.users[i].userListCart.splice(j, 1);
            }
          }
        }
      }
      Function.showToast("success", "Xóa thành công");
      return {
        ...state,
        stateTemp,
      };
    // Xóa những sản phẩm vừa mua khỏi giỏ hàng
    case "removeItemInCart":
      return {
        ...state,
        stateTemp,
      };
    // Xóa toàn bộ sản phẩm khỏi giỏ hàng
    case "removeFromCartAll":
      stateTemp.currentUser.userListCart.splice(
        0,
        stateTemp.currentUser.userListCart.length
      );
      for (let i = 0; i < stateTemp.users.length; i++) {
        if (stateTemp.users[i].userID === stateTemp.currentUser.userID) {
          stateTemp.users[i].userListCart.splice(
            0,
            stateTemp.users[i].userListCart.length
          );
          break;
        }
      }
      return {
        ...state,
        stateTemp,
      };
    //Chọn loại sản phẩm (ở trang sản phẩm)
    case "changeSelectedCategory":
      stateTemp.component.home.selectedCategory = action.productTypeCode;
      return {
        ...state,
        stateTemp,
      };
    // Lọc theo tên sản phẩm
    case "changeSearchNameText":
      stateTemp.component.home.searchNameText = action.searchNameText;
      return {
        ...state,
        stateTemp,
      };
    // Nhập tên đăng nhập
    case "typeUsername":
      stateTemp.component.loginForm.username = action.username;
      return {
        ...state,
        stateTemp,
      };
    // Nhập tên mật khẩu
    case "typePassword":
      stateTemp.component.loginForm.password = action.password;
      return {
        ...state,
        stateTemp,
      };
    // Lấy thông tin người dùng đang đăng nhập
    case "getCurrentUser":
      // stateTemp.user = {...action.user}
      for (const item in action.user) {
        stateTemp.currentUser[item] = action.user[item];
        stateTemp.component.profile[item] = action.user[item];
      }
      for (let i = 0; i < stateTemp.currentUser.userListVoucher.length; i++) {
        if (
          stateTemp.currentUser.userListVoucher[i].isUse.toLowerCase() ===
          "true"
        )
          stateTemp.currentUser.userListVoucher[i].use = true;
        else stateTemp.currentUser.userListVoucher[i].use = false;
      }
      return {
        ...state,
        stateTemp,
      };
    // Đăng xuất
    case "logout":
      for (const item in stateTemp.currentUser) {
        delete stateTemp.currentUser[item];
      }
      return {
        ...state,
        stateTemp,
      };
    // Đổi thông tin người dùng
    case "changeProfile":
      // stateTemp.user = {...action.user}
      for (const item in action.profileAfter) {
        stateTemp.currentUser[item] = action.profileAfter[item];
      }
      stateTemp.users.forEach((user, index) => {
        if (user.userID === action.profileAfter.userID) {
          for (const item in action.profileAfter) {
            user[item] = action.profileAfter[item];
          }
        }
      });
      Function.showToast("success", "Cập nhật thông tin thành công");
      return {
        ...state,
        stateTemp,
      };
    //Thêm bình luận
    case "addComment":
      let newComment = {
        commentID: Function.getMaxIndex(stateTemp.comments, "commentID") + 1,
        userID: stateTemp.currentUser.userID,
        productID: action.productID,
        content: action.content,
        date: Date.now() / 1000,
        starNumber: action.starNumber,
      };
      let commentFlag = 0;
      for (let i = 0; i < stateTemp.comments.length; i++) {
        if (
          stateTemp.comments[i].userID == stateTemp.currentUser.userID &&
          stateTemp.comments[i].productID == action.productID
        ) {
          stateTemp.comments[i].content = action.content;
          stateTemp.comments[i].starNumber = action.starNumber;
          commentFlag = 1;
          break;
        }
      }
      if (commentFlag === 0) {
        stateTemp.comments.unshift(newComment);
      }

      return {
        ...state,
        stateTemp,
      };
    // Đăng ký tài khoản
    case "register":
      stateTemp.users.push({
        userID: action.user.userID,
        fullName: action.user.fullName,
        username: action.user.username,
        password: action.user.password,
        phoneNumber: action.user.phoneNumber,
        email: action.user.email,
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        userType: "user",
        userToken: "",
        shippingAddress: "",
        userListCart: [],
        userListVoucher: [],
      });
      Function.showToast("success", "Đăng ký tài khoản thành công");
      return {
        ...state,
        stateTemp,
      };
    // Tạo otp lấy mật khẩu
    case "generateOtp":
      for (let i = 0; i < state.thach.users.length; i++) {
        if (state.thach.users[i].email === action.email) {
          let otp = Function.generateOtp();
          state.thach.users[i].userToken = otp;
          Function.showToast("info", otp);
          break;
        }
      }
      return {
        ...state,
        stateTemp,
      };
    //Xóa otp
    case "clearOtp":
      for (let i = 0; i < state.thach.users.length; i++) {
        if (state.thach.users[i].email === action.email) {
          state.thach.users[i].userToken = "";
          break;
        }
      }
      return {
        ...state,
        stateTemp,
      };
    //Thêm danh mục sản phẩm mới
    case "addCategory":
      stateTemp.categories.push(action.category);
      Function.showToast("success", "Thêm danh mục sản phẩm mới thành công");
      return {
        ...state,
        stateTemp,
      };
    //Xóa danh mục sản phẩm mới
    case "deleteCategory":
      for (let i = 0; i < stateTemp.categories.length; i++) {
        if (stateTemp.categories[i].categoryID === action.categoryID) {
          stateTemp.categories.splice(i, 1);
          break;
        }
      }
      Function.showToast("success", "Xóa thành công");
      return {
        ...state,
        stateTemp,
      };
    //Cập nhật danh mục sản phẩm
    case "editCategory":
      for (let i = 0; i < stateTemp.categories.length; i++) {
        if (stateTemp.categories[i].categoryID === action.categoryID) {
          stateTemp.categories[i].name = action.category.name;
          stateTemp.categories[i].img = action.category.img;
          break;
        }
      }
      Function.showToast(
        "success",
        "Cập nhật danh mục sản phẩm mới thành công"
      );
      return {
        ...state,
        stateTemp,
      };
    //Thêm sản phẩm mới
    case "addProduct":
      stateTemp.products.push(action.product);
      Function.showToast("success", "Thêm sản phẩm thành công");
      return {
        ...state,
        stateTemp,
      };
    //Sửa thông tin sản phẩm
    case "editProduct":
      stateTemp.products.forEach((item, index) => {
        if (item.productID == action.product.productID) {
          for (const attribute in item) {
            item[attribute] = action.product[attribute];
          }
          return true;
        }
      });
      Function.showToast("success", "Sửa thông tin sản phẩm thành công");
      return {
        ...state,
        stateTemp,
      };
    //Sửa thông tin sản phẩm
    case "deleteProduct":
      for (let i = 0; i < stateTemp.products.length; i++) {
        if (stateTemp.products[i].productID === action.productID) {
          stateTemp.products.splice(i, 1);
          break;
        }
      }
      Function.showToast("success", "Xóa sản phẩm thành công", 5000);
      return {
        ...state,
        stateTemp,
      };
    // Đổi trạng thái đơn hàng
    case "changeOrderStatus":
      for (let i = 0; i < stateTemp.orders.length; i++) {
        if (stateTemp.orders[i].id === action.order.id) {
          stateTemp.orders[i].orderStatus = action.status;
          break;
        }
      }
      let newAlert = {
        alertID: Number(Function.getMaxIndex(stateTemp.alerts, "alertID")) + 1,
        userID: action.order.userID,
        subject: "Cập nhật đơn hàng",
        content:
          action.order.orderStatus === "DELIVERING"
            ? "Đơn hàng #" +
              action.order.id +
              " đã được duyệt và đang được giao đến bạn"
            : "Hoàn tất đơn hàng #" +
              action.order.id +
              ". Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi",
        date: parseInt(new Date().getTime() / 1000),
        isRead: false,
      };
      stateTemp.alerts.push(newAlert);
      Function.showToast("success", "Chuyển trạng thái thành công");
      return {
        ...state,
        stateTemp,
      };
    // Tạo đơn hàng
    case "createOrder":
      stateTemp.orders.push(action.order);
      let newAlertCreateOrder = {
        alertID: Number(Function.getMaxIndex(stateTemp.alerts, "alertID")) + 1,
        userID: action.order.userID,
        subject: "Đặt hàng thành công",
        content:
          "Đơn hàng của bạn đang được duyệt, chúng tôi sẽ thông báo cho bạn sớm nhất có thể",
        date: parseInt(new Date().getTime() / 1000),
        isRead: false,
      };
      stateTemp.alerts.push(newAlertCreateOrder);
      // Đánh dấu voucher đã sử dụng
      if (action.voucherID) {
        for (let i = 0; i < stateTemp.currentUser.userListVoucher.length; i++) {
          if (
            action.voucherID ==
            stateTemp.currentUser.userListVoucher[i].voucherID
          ) {
            stateTemp.currentUser.userListVoucher[i].use = true;
            break;
          }
        }
        for (let i = 0; i < stateTemp.users.length; i++) {
          if (stateTemp.users[i].userID == stateTemp.currentUser.userID) {
            for (
              let j = 0;
              j < stateTemp.users[i].userListVoucher.length;
              j++
            ) {
              if (
                stateTemp.users[i].userListVoucher[j].voucherID ==
                action.voucherID
              ) {
                stateTemp.users[i].userListVoucher[j].use = true;
              }
            }
          }
        }
      }
      Function.showToast("success", "Đặt hàng thành công");
      return {
        ...state,
        stateTemp,
      };
    //Thêm đơn hàng
    case "addOrder":
      let newAddOrder = { ...action.order };
      newAddOrder.id = action.order.orderID;
      newAddOrder.voucherDiscount = action.order.voucherDiscount
      for (let i = 0; i < newAddOrder.listProductCart.length; i++) {
        newAddOrder.listProductCart[i].img =
          action.order.listProductCart[i].picture;
      }
      stateTemp.orders.push(newAddOrder);
      return {
        ...state,
        stateTemp,
      };
    // Đánh dấu đã đọc thông báo
    case "markAsReadNotify":
      if (action.all) {
        for (let i = 0; i < stateTemp.alerts.length; i++) {
          if (
            stateTemp.alerts[i].userID === "" ||
            stateTemp.alerts[i].userID == stateTemp.currentUser.userID
          ) {
            stateTemp.alerts[i].isRead = true;
          }
        }
      } else {
        for (let i = 0; i < stateTemp.alerts.length; i++) {
          if (stateTemp.alerts[i].alertID == action.alertID) {
            stateTemp.alerts[i].isRead = true;
            break;
          }
        }
      }
      return {
        ...state,
        stateTemp,
      };
    // Thêm voucher
    case "addVoucher":
      stateTemp.vouchers.push(action.voucher);
      if (action.alert) {
        let newVoucherAlert = {
          alertID:
            Number(Function.getMaxIndex(stateTemp.alerts, "alertID")) + 1,
          userID: "",
          subject: "Hãy thu thập mã giảm giá nào",
          content:
            "Có mã giảm giá mới, hãy nhanh tay thu thập và sử dụng để được nhiều ưu đã mới",
          date: parseInt(new Date().getTime() / 1000),
          isRead: false,
        };
        stateTemp.alerts.push(newVoucherAlert);
      }
      Function.showToast("success", "Thêm mã giảm giá thành công");
      return {
        ...state,
        stateTemp,
      };
    // Xóa voucher
    case "deleteVoucher":
      for (let i = 0; i < stateTemp.vouchers.length; i++) {
        if (stateTemp.vouchers[i].voucherID == action.voucherID) {
          stateTemp.vouchers.splice(i, 1);
          break;
        }
      }
      Function.showToast("success", "Xóa mã giảm giá thành công");
      return {
        ...state,
        stateTemp,
      };
    // Thêm alert
    case "addAlert":
      let newAddAlert = { ...action.alert };
      if (action.alert.isRead.toLowerCase() === "false")
        newAddAlert.isRead = false;
      else newAddAlert.isRead = true;
      stateTemp.alerts.push(newAddAlert);
      return {
        ...state,
        stateTemp,
      };

    // Xóa mấy cái dữ liệu không cần thiết đi
    case "refresh":
      return {
        ...state,
        stateTemp,
      };

    // =============================================================================================
    // DATABASE
    // Lấy toàn bộ products từ API gán vào Initstate
    case "setCategoriesFromAPI":
      stateTemp.categories.splice(0, stateTemp.categories.length);
      action.data.forEach((category, index) => {
        let newCategory = {};
        for (const attribute in category) {
          newCategory[attribute] = category[attribute];
        }
        newCategory.img = `https://bach-hoa.herokuapp.com/images/files/categories/${category.categoryID}`;
        stateTemp.categories.push(newCategory);
      });
      return {
        ...state,
        stateTemp,
      };
    // Lấy toàn bộ sản phẩm từ API gán vào Initstate
    case "setProductsFromAPI":
      stateTemp.products.splice(0, stateTemp.products.length);
      action.data.forEach((product, index) => {
        let newProduct = {};
        for (const attribute in product) {
          newProduct[attribute] = product[attribute];
        }
        newProduct.img = `https://bach-hoa.herokuapp.com/images/files/products/${product.productID}`;
        stateTemp.products.push(newProduct);
      });
      return {
        ...state,
        stateTemp,
      };
    // Lấy toàn bộ người dùng từ API gán vào Initstate
    case "setUsersFromAPI":
      stateTemp.users.splice(0, stateTemp.users.length);
      action.data.forEach((user, index) => {
        let newUser = {};
        for (const attribute in user) {
          newUser[attribute] = user[attribute];
        }
        newUser.avatar = `https://bach-hoa.herokuapp.com/images/files/users/${user.userID}`;
        newUser.email = user.emailAddress;
        stateTemp.users.push(newUser);
      });
      return {
        ...state,
        stateTemp,
      };
    // Lấy toàn bộ comments từ API gán vào Initstate
    case "setCommentsFromAPI":
      stateTemp.comments.splice(0, stateTemp.users.length);
      action.data.forEach((comment, index) => {
        let newComment = {};
        for (const attribute in comment) {
          newComment[attribute] = comment[attribute];
        }
        newComment.commentID = comment.id;
        stateTemp.comments.push(newComment);
      });
      return {
        ...state,
        stateTemp,
      };
    // Lấy toàn bộ vouchers từ API gán vào Initstate
    case "setVouchersFromAPI":
      stateTemp.vouchers.splice(0, stateTemp.vouchers.length);
      action.data.forEach((voucher, index) => {
        let newVoucher = {};
        for (const attribute in voucher) {
          newVoucher[attribute] = voucher[attribute];
        }
        stateTemp.vouchers.push(newVoucher);
      });
      return {
        ...state,
        stateTemp,
      };
    //Lấy toàn bộ Alerts từ API gán vào Initstate
    case "setAlertsFromAPI":
      stateTemp.alerts.splice(0, stateTemp.alerts.length);
      action.data.forEach((alert, index) => {
        let newAlert = {};
        for (const attribute in alert) {
          newAlert[attribute] = alert[attribute];
        }
        if (alert.isRead.toLowerCase() === "false") newAlert.isRead = false;
        else newAlert.isRead = true;
        stateTemp.alerts.push(newAlert);
      });
      return {
        ...state,
        stateTemp,
      };
    //Lấy toàn bộ Orders từ API gán vào Initstate
    case "setOrdersFromAPI":
      stateTemp.orders.splice(0, stateTemp.orders.length);
      action.data.forEach((order, index) => {
        let newOrder = {};
        for (const attribute in order) {
          newOrder[attribute] = order[attribute];
        }
        newOrder.id = order.orderID;
        newOrder.voucherDiscount = 0;
        for (let i = 0; i < newOrder.listProductCart.length; i++) {
          newOrder.listProductCart[i].img = order.listProductCart[i].picture;
        }
        stateTemp.orders.push(newOrder);
      });
      return {
        ...state,
        stateTemp,
      };
    // DATABASE
    // =============================================================================================

    // thach
    case "collectVoucher":
      let voucher = action.voucher;
      // add voucher to userListVoucher
      stateTemp.currentUser.userListVoucher = [
        ...stateTemp.currentUser.userListVoucher,
        { voucherID: voucher.voucherID, isUsed: false },
      ];

      // change voucher quantity
      let index = stateTemp.vouchers.findIndex((voc) => {
        return voc.voucherID === voucher.voucherID;
      });
      stateTemp.vouchers[index].quantity =
        stateTemp.vouchers[index].quantity - 1;
      Function.showToast("success", "Bạn đã thu thập voucher thành công!");

      // update users
      // stateTemp = {...stateTemp, users:[...stateTemp.users, stateTemp.currentUser]}
      return {
        ...state,
        stateTemp,
      };

    // thach
    case "deleteNotify":
      state.thach.alerts = state.thach.alerts.filter(
        (alert) => alert.alertID != action.alertID
      );
      return state;

    default:
      return {
        ...state,
      };
  }
};

export default reducer;

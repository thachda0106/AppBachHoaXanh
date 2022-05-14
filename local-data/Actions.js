export const editIsLogin = (payload) => {
  return {
    type: "editIsLogin",
    payload,
  };
};

// 1: chon, -1: bo chon
export const selectCartProduct = (productID, mode) => {
  // console.log(payload+" - "+mode)
  return {
    type: "selectCartProduct",
    productID,
    mode,
  };
};

// 1 tang, -1 giam
export const setCartProductQuantity = (productID, mode) => {
  return {
    type: "setCartProductQuantity",
    productID,
    mode,
  };
};

export const removeCartProduct = (payload) => {
  return {
    type: "removeCartProduct",
    payload,
  };
};

// Áp mã voucher, mode : 1 là chọn, -1 là bỏ
export const applyVoucher = (voucherID, mode) => {
  return {
    type: "applyVoucher",
    voucherID,
    mode,
  };
};

export const refresh = () => {
  return {
    type: "refresh",
  };
};

// Thêm sản phẩm vào giỏ hàng của người này
export const addToCart = (product) => {
  return {
    type: "addToCart",
    product,
  };
};

//Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = (productID) => {
  return {
    type: "removeFromCart",
    productID,
  };
};

//Xóa toàn bô sản phẩm khỏi giỏ hàng
export const removeFromCartAll = () => {
  return {
    type: "removeFromCartAll",
  };
};

// Khi chọn loại sản phẩm
export const changeSelectedCategory = (productTypeCode) => {
  return {
    type: "changeSelectedCategory",
    productTypeCode,
  };
};

// Khi lọc theo tên sản phẩm
export const changeSearchNameText = (searchNameText) => {
  return {
    type: "changeSearchNameText",
    searchNameText,
  };
};

// Nhập tên đăng nhập trong LoginForm
export const typeUsername = (username) => {
  return {
    type: "typeUsername",
    username,
  };
};

// Nhập mật khẩu trong LoginForm
export const typePassword = (password) => {
  return {
    type: "typePassword",
    password,
  };
};

// Lấy thông tin người dùng đang đăng nhập
export const getCurrentUser = (user) => {
  return {
    type: "getCurrentUser",
    user,
  };
};

// Đăng xuất
export const logout = () => {
  return {
    type: "logout",
  };
};

// Đổi thông tin người dùng
export const changeProfile = (profileAfter) => {
  return {
    type: "changeProfile",
    profileAfter,
  };
};

// Thêm bình luận
export const addComment = (productID, content, starNumber) => {
  return {
    type: "addComment",
    productID,
    content,
    starNumber,
  };
};
// Thu thập voucher
export const collectVoucher = (voucher) => {
  return {
    type: "collectVoucher",
    voucher,
  };
};
//Đăng ký tài khoản
export const register = (user) => {
  return {
    type: "register",
    user,
  };
};

// Tạo otp để lấy lại mật khẩu
export const generateOtp = (email) => {
  return {
    type: "generateOtp",
    email,
  };
};

// Xóa otp
export const clearOtp = (email) => {
  return {
    type: "clearOtp",
    email,
  };
};

// Thu thập voucher
export const deleteNotify = (alertID) => {
  return {
    type: "deleteNotify",
    alertID,
  };
};

// Thêm danh mục sản phẩm
export const addCategory = (category) => {
  return {
    type: "addCategory",
    category,
  };
};

// Cập nhật danh mục sản phẩm
export const editCategory = (categoryID, category) => {
  return {
    type: "editCategory",
    categoryID,
    category,
  };
};

// Xóa danh mục sản phẩm
export const deleteCategory = (categoryID) => {
  return {
    type: "deleteCategory",
    categoryID,
  };
};

// Thêm sản phẩm
export const addProduct = (product) => {
  return {
    type: "addProduct",
    product,
  };
};

// Sửa sản phẩm
export const editProduct = (product) => {
  return {
    type: "editProduct",
    product,
  };
};

// Xóa sản phẩm
export const deleteProduct = (productID) => {
  return {
    type: "deleteProduct",
    productID,
  };
};

// Đổi trạng thái đơn hàng
export const changeOrderStatus = (order, status) => {
  return {
    type: "changeOrderStatus",
    order,
    status,
  };
};

// Tạo đơn hàng
export const createOrder = (order, voucherID = "") => {
  return {
    type: "createOrder",
    order,
    voucherID,
  };
};

// Thêm đơn hàng
export const addOrder = (order) => {
  return {
    type: "addOrder",
    order,
  };
};

// Xóa những đơn hàng đã mua ở trong giỏ hàng
export const removeItemInCart = (listProductCart) => {
  return {
    type: "removeItemInCart",
    listProductCart,
  };
};

// Đánh dấu đã đọc thông báo, all = true là xóa tất cả
export const markAsReadNotify = (alertID, all = false) => {
  return {
    type: "markAsReadNotify",
    alertID,
    all,
  };
};

// Thêm voucher
export const addVoucher = (voucher, alert = false) => {
  return {
    type: "addVoucher",
    voucher,
    alert,
  };
};

// Xóa voucher
export const deleteVoucher = (voucherID) => {
  return {
    type: "deleteVoucher",
    voucherID,
  };
};

// Thêm thông báo
export const addAlert = (alert) => {
  return {
    type: "addAlert",
    alert,
  };
};

// =============================================================================================
// DATABASE
// Lấy toàn bộ categories từ API gán vào InitState
export const setCategoriesFromAPI = (data) => {
  return {
    type: "setCategoriesFromAPI",
    data,
  };
};
// Lấy toàn bộ products từ API gán vào InitState
export const setProductsFromAPI = (data) => {
  return {
    type: "setProductsFromAPI",
    data,
  };
};
//Lấy toàn bộ user từ API gán vào InitState
export const setUsersFromAPI = (data) => {
  return {
    type: "setUsersFromAPI",
    data,
  };
};
//Lấy toàn bộ comments từ API gán vào InitState
export const setCommentsFromAPI = (data) => {
  return {
    type: "setCommentsFromAPI",
    data,
  };
};
//Lấy toàn bộ Voucher từ API gán vào InitState
export const setVouchersFromAPI = (data) => {
  return {
    type: "setVouchersFromAPI",
    data,
  };
};
//Lấy toàn bộ Alert từ API gán vào InitState
export const setAlertsFromAPI = (data) => {
  return {
    type: "setAlertsFromAPI",
    data,
  };
};
//Lấy toàn bộ Order từ API gán vào InitState
export const setOrdersFromAPI = (data) => {
  return {
    type: "setOrdersFromAPI",
    data,
  };
};

// DATABASE
// =============================================================================================

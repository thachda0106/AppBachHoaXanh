import Toast from "react-native-toast-message";

export const Function = {
  toVND: (price) => {
    let priceStr = price.toString();
    let priceVND = "";
    let dem = 0;
    for (let i = priceStr.length - 1; i >= 0; i--) {
      priceVND = priceStr[i] + priceVND;
      dem += 1;
      if (dem === 3 && i !== 0) {
        dem = 0;
        priceVND = "." + priceVND;
      }
    }
    return priceVND + "₫";
  },

  calculatePrice: (price, sale) => {
    return (price * (100 - sale)) / 100;
  },

  getMaxIndex: (list, code) => {
    let max = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i][code] > max) max = list[i][code];
    }
    return max;
  },

  toastNeedLogin: () => {
    Toast.show({
      type: "info",
      text1: "Thông báo",
      text2: "Bạn cần phải đăng nhập trước",
      visibilityTime: 2000,
    });
  },

  showToast: (type, content, time = 2000) => {
    Toast.show({
      type,
      text1: "Thông báo",
      text2: content,
      text1Style: {
        fontSize: 20,
        fontWeight: "400",
      },
      visibilityTime: time,
    });
  },

  checkEmail: (text) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return regex.test(text);
  },
  checkPhone: (text) => {
    const regex = /^0[0-9]{9}$/;
    return regex.test(text);
  },
  // Tìm product theo productID
  findProduct: (products, productID) => {
    for (let i = 0; i < products.length; i++) {
      if (productID == products[i].productID) {
        return products[i];
      }
    }
  },
  // Convert kiểu date sang timestamp (không có giây)
  dateToTimestamp: (date) => {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();
  },
  // Convert timestamp sang ngày, mode để chỉ lấy tháng hoặc lấy năm
  timestampToDate: (timestamp, mode = "") => {
    timestamp = timestamp.toString()
    timestamp = timestamp.length < 11 ? timestamp * 1000 : timestamp;
    timestamp = parseInt(timestamp);
    var theDate = new Date(timestamp);
    if (mode === "month") return theDate.getMonth() + 1;
    else if (mode === "year") return theDate.getFullYear();
    else
      return (
        theDate.getDate() +
        "/" +
        Number(theDate.getMonth() + 1) +
        "/" +
        theDate.getFullYear()
      );
  },

  // Convert timestamp sang datetime
  timestampToDateTime: (timestamp) => {
    timestamp = timestamp.toString()
    timestamp = timestamp.length < 11 ? timestamp * 1000 : timestamp;
    timestamp = parseInt(timestamp);
    var theDate = new Date(timestamp);
    return (
      theDate.getHours() +
      ":" +
      theDate.getMinutes() +
      " " +
      theDate.getDate() +
      "/" +
      Number(theDate.getMonth() + 1) +
      "/" +
      theDate.getFullYear()
    );
  },
  // Generate otp
  generateOtp: () => {
    let res = "";
    for (let i = 0; i < 4; i++) {
      res += Math.floor(Math.random() * 10);
    }
    return res;
  },

  // Cắt ngắn chuỗi đi
  cropText: (text, length = 15) => {
    if (text.length < length) return text;
    else return text.slice(0, length - 3) + "...";
  },

  // Kiểm tra xem sản phẩm có được giảm giá không (để show chữ hot)
  checkHot: (item) => {
    const currentDate = new Date().getTime() / 1000;
    if (item.sale === 0) return false;
    if (
      currentDate < item.dateDiscountStart ||
      currentDate > item.dateDiscountEnd
    ) {
      return false;
    }
    return true;
  },

  // Sắp xếp list theo thuộc tính, mode = 1 tăng, mode = -1 giảm
  orderBy: (list, attribute, mode = 1) => {
    let newList = [...list];
    for (let i = 0; i < newList.length - 1; i++) {
      for (let j = i + 1; j < newList.length; j++) {
        if (Number(newList[i][attribute]) > Number(newList[j][attribute])) {
          // console.log("before: "+newList[i][attribute]+"-"+newList[j][attribute])
          let tam = { ...newList[i] };
          newList[i] = { ...newList[j] };
          newList[j] = { ...tam };
        }
        // console.log("after: "+newList[i][attribute]+"-"+newList[j][attribute])
      }
    }
    if (mode === -1) return newList.reverse();
    else return newList;
  },

  // Lấy tên đơn hàng
  getOrderName: (order) => {
    let res = "";
    for (let i = 0; i < order.listProductCart.length; i++) {
      res += order.listProductCart[i].productName + ", ";
    }
    res = res.slice(0, res.length - 2);
    // if (res.length > 32) {
    //   res = res.slice(0, 31) + "...";
    // }
    return res;
  },

  // Tính tổng tiền của đơn hàng (có voucher)
  getOrderAllPrice: (order) => {
    let price = 0;
    for (let i = 0; i < order.listProductCart.length; i++) {
      price +=
        ((order.listProductCart[i].price *
          (100 - order.listProductCart[i].priceDiscount)) /
          100) *
        order.listProductCart[i].quantity;
    }
    return price - order.voucherDiscount < 0
      ? 0
      : price - order.voucherDiscount;
  },

  // Tính tổng tiền của đơn hàng (chưa tính voucher)
  getOrderAllPriceNoVoucher: (order) => {
    console.log(order)
    let price = 0;
    for (let i = 0; i < order.listProductCart.length; i++) {
      price +=
        ((order.listProductCart[i].price *
          (100 - order.listProductCart[i].priceDiscount)) /
          100) *
        order.listProductCart[i].quantity;
    }
    return price;
  },

  // So sánh xem ngày hiện tại có nằm trong khoảng ngày này không
  compareTimeNow: (start, end) => {
    let now = parseInt(new Date().getTime() / 1000)
    if(now < start) return false
    if(now - end > 86400) return false
    return true
  },

  //Lấy số sao trung bình của một sản phẩm
  getProductStars: (productID, comments) =>{
    let rates = 0;
    let star = 0;
    let sum = 0;
    for(let i = 0; i<comments.length; i++){
      if(comments[i].productID == productID){
        sum += 5;
        star += comments[i].starNumber
      }
    }
    if(sum === 0) return 5
    rates = (star / sum) * 5
    return Math.round(rates * 10) / 10
  },
};

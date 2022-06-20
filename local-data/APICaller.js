import axios from "axios";
import { Function } from "../Constant/Function";
import TamImg from "../assets/img/tien/empty.png";
import * as FileSystem from 'expo-file-system';

// https://bach-hoa.herokuapp.com
//http://localhost:8080/
export default APICaller = {
  // Categories
  getAPICategories: async () => {
    return axios({
      method: "GET",
      url: "https://bach-hoa.herokuapp.com/categories/all",
      data: null,
    })
      .then((res) => res)
      .catch((error) => {
        return error.response;
      });
  },
  addAPICategory: async (category) => {
    const base64 = await FileSystem.readAsStringAsync(category.img, { encoding: 'base64' });
    var data = new FormData();
    data.append("file", {
      uri: category.img,
      name: "category.jpg",
      type: "image/jpg",
    });
    return axios({
      method: "POST",
      url:
        "https://bach-hoa.herokuapp.com/images/add/categories/" +
        category.categoryID,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    })
      .then(async () => {
        return axios({
          method: "POST",
          url: "https://bach-hoa.herokuapp.com/categories/add",
          data: JSON.stringify({
            categoryID: category.categoryID,
            name: category.name,
            categoryImage: 'data:image/png;base64,' + base64,
          }),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res)
          .catch((error) => {
            return error.response;
          });
      })
      .catch((error) => {
        console.log("loi: " + JSON.stringify(error.response));
        return error.response;
      });
  },
  editAPICategory: async (category) => {
    const base64 = await FileSystem.readAsStringAsync(category.img, { encoding: 'base64' });
    var data = new FormData();
    data.append("file", {
      uri: category.img,
      name: "category.jpg",
      type: "image/jpg",
    });
    return axios({
      method: "POST",
      url:
        "https://bach-hoa.herokuapp.com/images/add/categories/" +
        category.categoryID,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    })
      .then(async () => {
        return axios({
          method: "PUT",
          url: `https://bach-hoa.herokuapp.com/categories/update/${category.categoryID}`,
          data: JSON.stringify({
            name: category.name,
            categoryImage: 'data:image/png;base64,' + base64,

          }),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res)
          .catch((error) => {
            return error.response;
          });
      })
      .catch((error) => {
        console.log("loi: " + JSON.stringify(error.response));
        return error.response;
      });
  },
  deleteAPICategory: async (categoryID) => {
    return axios({
      method: "DELETE",
      url: `https://bach-hoa.herokuapp.com/categories/delete/${categoryID}`,
    })
      .then((res) => res)
      .catch((error) => {
        return error.response;
      });
  },

  //======================================================
  // Products
  getAPIProducts: async () => {
    return axios({
      method: "GET",
      url: "https://bach-hoa.herokuapp.com/products/all",
      data: null,
    })
      .then((res) => res)
      .catch((error) => {
        return error.response;
      });
  },
  addAPIProduct: async (product) => {
    var data = new FormData();
    data.append("file", {
      uri: product.img,
      name: "product.jpg",
      type: "image/jpg",
    });
    return axios({
      method: "POST",
      url:
        "https://bach-hoa.herokuapp.com/images/add/products/" +
        product.productID,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    })
      .then(async () => {
        let productJSON = JSON.stringify({
          productID: product.productID,
          productImage: product.productImage,
          name: product.name,
          price: product.price,
          discountPercent: product.discountPercent,
          quantity: product.quantity,
          categoryID: product.categoryID,
          dateMFG: product.dateMFG,
          dateEXP: product.dateEXP,
          description: product.description,
          branch: product.branch,
          origin: product.origin,
          ingredient: product.ingredient,
          dateDiscountStart: product.dateDiscountStart,
          dateDiscountEnd: product.dateDiscountEnd,
        });
        // console.log(productJSON);
        return axios({
          method: "POST",
          url: "https://bach-hoa.herokuapp.com/products/add",
          data: productJSON,
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res)
          .catch((error) => {
            console.log(
              "Lỗi khi add product: " + JSON.stringify(error.response)
            );
            return error.response;
          });
      })
      .catch((error) => {
        console.log(
          "Lỗi khi thêm ảnh add product: " + JSON.stringify(error.response)
        );
        return error.response;
      });
  },
  editAPIProduct: async (product) => {
    // console.log({"ss":product})
    var data = new FormData();
    data.append("file", {
      uri: product.img,
      name: "product.jpg",
      type: "image/jpg",
    });
    return axios({
      method: "POST",
      url:
        "https://bach-hoa.herokuapp.com/images/add/products/" +
        product.productID,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    })
      .then(async () => {
        return axios({
          method: "PUT",
          url: `https://bach-hoa.herokuapp.com/products/update/${product.productID}`,
          data: JSON.stringify({
            productID: product.productID,
            productImage: product.productImage,
            name: product.name,
            price: product.price,
            discountPercent: product.discountPercent,
            quantity: product.quantity,
            categoryID: product.categoryID,
            dateMFG: product.dateMFG,
            dateEXP: product.dateEXP,
            description: product.description,
            branch: product.branch,
            origin: product.origin,
            ingredient: product.ingredient,
            dateDiscountStart: product.dateDiscountStart,
            dateDiscountEnd: product.dateDiscountEnd,
          }),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res)
          .catch((error) => {
            return error.response;
          });
      })
      .catch((error) => {
        console.log("loi: " + JSON.stringify(error.response));
        return error.response;
      });
  },
  deleteAPIProduct: async (productID) => {
    return axios({
      method: "DELETE",
      url: `https://bach-hoa.herokuapp.com/products/delete/${productID}`,
    })
      .then((res) => res)
      .catch((error) => {
        return error.response;
      });
  },

  //======================================================
  //   Users
  //Lấy cả list users
  getAPIUsers: async () => {
    return axios({
      method: "GET",
      url: "https://bach-hoa.herokuapp.com/users/all",
      data: null,
    })
      .then((res) => res)
      .catch((error) => error.response);
  },
  //Lấy 1 user
  getAPIUser: async (userID) => {
    return axios({
      method: "GET",
      url: `https://bach-hoa.herokuapp.com/users/load/${userID}`,
      data: null,
    })
      .then((res) => res)
      .catch((error) => error.response);
  },
  //Gửi yêu cầu quên mật khẩu
  generateOtp: async (userID, email) => {
    console.log("=========")
    console.log(userID+"-"+email)
    return axios({
      method: "POST",
      url: "https://bach-hoa.herokuapp.com/users/forgot-password",
      data: JSON.stringify({
        id: Number(userID),
        emailAddress: email,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res)
      .catch((error) => {
        return error.response;
      });
  },
  //Đặt mật khẩu mới
  setNewPassword: async (userID, otp, newPassword) => {
    return axios({
      method: "POST",
      url: "https://bach-hoa.herokuapp.com/users/update-password",
      data: JSON.stringify({
        id: userID,
        otp: otp,
        password: newPassword,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res)
      .catch((error) => {
        return error.response;
      });
  },

  // Thêm sản phẩm vào giỏ hàng của người dùng
  addProductToUserCart: async (userID, productCart) => {
    return axios({
      method: "PUT",
      url: "https://bach-hoa.herokuapp.com/products/add-to-cart/" + userID,
      data: JSON.stringify({
        productID: productCart.productID,
        quantity: 1,
        productName: "tam",
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res)
      .catch((error) => {
        return error.response;
      });
  },

  // Xóa sản phẩm khỏi product
  deleteProductToUserCart: async (userID, productID) => {
    return axios({
      method: "GET",
      url: `https://bach-hoa.herokuapp.com/users/delete-product-from-cart/${userID}/${productID}`,
      data: null,
    })
      .then((res) => res)
      .catch((error) => error.response);
  },

  addAPIUsers: async (user) => {
    var data = new FormData();
    data.append("file", {
      uri: "https://image.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600w-1114445501.jpg",
      name: "user.jpg",
      type: "image/jpg",
    });
    return axios({
      method: "POST",
      url: "https://bach-hoa.herokuapp.com/images/add/users/" + user.userID,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    })
      .then(async () => {
        return axios({
          method: "POST",
          url: "https://bach-hoa.herokuapp.com/users/add",
          data: JSON.stringify({
            userID: user.userID,
            fullName: user.fullName,
            emailAddress: user.email,
            username: user.username,
            password: user.password,
            address: "Chưa nhập",
            phoneNumber: user.phoneNumber,
            userType: "USER",
            otp: "",
            emailAddress: user.email,
            shippingAddress: "Chưa nhập",
          }),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res)
          .catch((error) => {
            return error.response;
          });
      })
      .catch((error) => {
        console.log("loi: " + JSON.stringify(error.response));
        return error.response;
      });
  },

  editAPIUsers: async (user) => {
    var data = new FormData();
    data.append("file", {
      uri: user.avatar,
      name: "user.jpg",
      type: "image/jpg",
    });
    return axios({
      method: "POST",
      url: "https://bach-hoa.herokuapp.com/images/add/users/" + user.userID,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    })
      .then(async () => {
        return axios({
          method: "PUT",
          url: `https://bach-hoa.herokuapp.com/users/update/${user.userID}`,
          data: JSON.stringify({
            userID: user.userID,
            fullName: user.fullName,
            emailAddress: user.email,
            userImage: user.userImage,
            username: user.username,
            password: user.password,
            address: user.address,
            phoneNumber: user.phoneNumber,
            otp: "",
            shippingAddress: user.address,
            userListCart: user.userListCart,
            userListVoucher: user.userListVoucher,
            userType: user.userType,
            status: "ENABLE",
          }),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res)
          .catch((error) => {
            console.log("Lỗi khi editUser");
            return error.response;
          });
      })
      .catch((error) => {
        console.log(
          "Lỗi thêm hình khi editUser: " + JSON.stringify(error.response)
        );
        return error.response;
      });
    // console.log(
    //   JSON.stringify({
    //     userID: user.userID,
    //     fullName: user.fullName,
    //     emailAddress: user.email,
    //     username: user.username,
    //     password: user.password,
    //     address: user.address,
    //     phoneNumber: user.phoneNumber,
    //     otp: "",
    //     emailAddress: user.email,
    //     shippingAddress: "tam",
    //     userListCart: user.userListCart,
    //   })
    // );
  },

  setNewUserPassword: async (user) => {
    return axios({
      method: "PUT",
      url: `https://bach-hoa.herokuapp.com/users/update/${user.userID}`,
      data: JSON.stringify({
        userID: user.userID,
        fullName: user.fullName,
        emailAddress: user.email,
        username: user.username,
        password: user.password,
        address: user.address,
        phoneNumber: user.phoneNumber,
        otp: "",
        shippingAddress: user.address,
        userListCart: user.userListCart,
        userListVoucher: user.userListVoucher,
        userType: user.userType,
        status: "ENABLE",
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res)
      .catch((error) => {
        console.log("Lỗi khi set new password");
        return error.response;
      });
  },

  // ========================================= Comment
  getAPIComments: async () => {
    return axios({
      method: "GET",
      url: "https://bach-hoa.herokuapp.com/comments/all",
      data: null,
    })
      .then((res) => res)
      .catch((error) => error.response);
  },
  addAPIComments: async (comment) => {
    return axios({
      method: "POST",
      url: "https://bach-hoa.herokuapp.com/comments/add",
      data: JSON.stringify({
        userID: comment.userID,
        productID: comment.productID,
        content: comment.content,
        date: comment.date,
        starNumber: comment.starNumber,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res)
      .catch((error) => {
        return error.response;
      });
  },

  deleteComment: async (id) =>{
    return axios({
      method: "DELETE",
      url: `https://bach-hoa.herokuapp.com/comments/delete/${id}`,
    })
      .then((res) => res)
      .catch((error) => {
        return error.response;
      });
  },

  //API Voucher
  getAPIVouchers: async () => {
    return axios({
      method: "GET",
      url: "https://bach-hoa.herokuapp.com/vouchers/all",
      data: null,
    })
      .then((res) => res)
      .catch((error) => error.response);
  },

  // Thêm voucher
  addVoucher: async (voucher) => {
    return axios({
      method: "POST",
      url: "https://bach-hoa.herokuapp.com/vouchers/add",
      data: JSON.stringify({
        productID: voucher.productID,
        code: voucher.code,
        quantity: voucher.quantity,
        description: voucher.description,
        discountValue: voucher.discountValue,
        maxDiscountValue: voucher.maxDiscountValue,
        dateStart: voucher.dateStart,
        dateEnd: voucher.dateEnd,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res)
      .catch((error) => {
        return error.response;
      });
  },

  // Xóa voucher
  deleteVoucher: async (voucherID) => {
    return axios({
      method: "DELETE",
      url: `https://bach-hoa.herokuapp.com/vouchers/delete/${voucherID}`,
    })
      .then((res) => res)
      .catch((error) => {
        return error.response;
      });
  },

  // Thu thập voucher
  addVoucherToUser: async (userID, voucher) => {
    return axios({
      method: "PUT",
      url: `https://bach-hoa.herokuapp.com/vouchers/add-to-voucher/${userID}`,
      data: JSON.stringify({
        voucherID: voucher.voucherID,
        productID: voucher.productID,
        code: voucher.code,
        description: voucher.description,
        discountValue: voucher.discountValue,
        maxDiscountValue: voucher.maxDiscountValue,
        dateStart: voucher.dateStart,
        dateEnd: voucher.dateEnd,
        isUse: "FALSE",
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res)
      .catch((error) => {
        return error.response;
      });
  },

  // Alerts
  getAPIAlerts: async () => {
    return axios({
      method: "GET",
      url: "https://bach-hoa.herokuapp.com/alerts/all/2",
      data: null,
    })
      .then((res) => res)
      .catch((error) => error.response);
  },

  // Orders
  getAPIOrders: async () => {
    return axios({
      method: "GET",
      url: "https://bach-hoa.herokuapp.com/orders/all",
      data: null,
    })
      .then((res) => res)
      .catch((error) => error.response);
  },
  changeToDelivering: async (orderID) => {
    return axios({
      method: "POST",
      url: `https://bach-hoa.herokuapp.com/orders/purchase/${orderID}`,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res)
      .catch((error) => {
        return error.response;
      });
  },
  changeToReceived: async (orderID) => {
    return axios({
      method: "POST",
      url: `https://bach-hoa.herokuapp.com/orders/approval/${orderID}`,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res)
      .catch((error) => {
        return error.response;
      });
  },

  addOrder: async (order) => {
    return axios({
      method: "POST",
      url: `https://bach-hoa.herokuapp.com/orders/add`,
      data: JSON.stringify({
        userID: order.userID,
        orderStatus: order.orderStatus,
        dateCreate: order.dateCreate,
        dateDelivery: order.dateDelivery,
        shippingAddress: order.shippingAddress,
        listProductCart: order.listProductCart,
        voucherDiscount: order.voucherDiscount,
        voucherID: order.voucherID,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res)
      .catch((error) => {
        return error.response;
      });
  },

  // Tạo thông báo
  addAlert: async (userID, subject, content) => {
    return axios({
      method: "POST",
      url: `https://bach-hoa.herokuapp.com/alerts/add`,
      data: JSON.stringify({
        userID: userID,
        subject: subject,
        content: content,
        isRead: "FALSE",
        date: Date.now(),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res)
      .catch((error) => {
        return error.response;
      });
  },
};

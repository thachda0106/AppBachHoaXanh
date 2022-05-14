import TopPro1 from "../assets/img/top-product-1.png";
import TopPro2 from "../assets/img/top-product-2.png";
import TopPro4 from "../assets/img/top-product-4.png";
import TopPro3 from "../assets/img/top-product-3.png";
import TopPro5 from "../assets/img/top-product-5.png";
import Pro1 from "../assets/img/product1.png";
import ProductImg1 from "../assets/img/product1.png";
import ProductImg2 from "../assets/img/product2.png";
import ProductImg3 from "../assets/img/product3.png";
import ProductImg4 from "../assets/img/product4.png";
import ProductImg5 from "../assets/img/tien/product5.png";
import ProductImg6 from "../assets/img/tien/product6.png";
import ProductImg7 from "../assets/img/tien/product7.png";
import ProductImg8 from "../assets/img/tien/product8.png";
import ProductImg9 from "../assets/img/tien/product9.png";
import ProductImg10 from "../assets/img/tien/product10.png";
import ProductImg11 from "../assets/img/tien/product11.png";
import ProductImg12 from "../assets/img/tien/product12.png";
import ProductImg13 from "../assets/img/tien/product13.png";
import ProductImg14 from "../assets/img/tien/product14.png";
import User1Img from "../assets/img/tien/user.png";
import User2Img from "../assets/img/tien/user2.png";

import userAvatar1 from "../assets/img/thach/userAvatar1.jpg";
import userAvatar2 from "../assets/img/thach/userAvatar2.jpg";
import userAvatar3 from "../assets/img/thach/userAvatar3.jpg";
import { Image } from "react-native";

export default InitState = {
  thach: {
    currentUser: {
      // userID: "1",
      // fullName: "admin",
      // username: "tien",
      // password: "123",
      // email: "admin@gmail.com",
      // avatar:
      //   "https://haycafe.vn/wp-content/uploads/2022/02/Anh-Avatar-Doremon-dep-ngau-cute.jpg",
      // phoneNumber: "088182717",
      // userType: "ADMIN",
      // userToken: "abcxyz",
      // address: "97 Man Thien, Hiep Phu, q9 TP.HCM",
      // userListCart: [
      //   {
      //     productID: 1,
      //     quantity: 2,
      //   },
      //   {
      //     productID: 2,
      //     quantity: 1,
      //   },
      //   {
      //     productID: 3,
      //     quantity: 3,
      //   },
      // ],
      // userListVoucher: [
      //   {
      //     voucherID: 1,
      //     productID: 1,
      //     code: "abcdef",
      //     description: "Giảm 10% cho sữa Vinamilk",
      //     discountValue: 10,
      //     maxDiscountValue: 5000,
      //     dateStart: 1651713005,
      //     dateEnd: 1696468205,
      //     status: "",
      //     use: false,
      //   },
      //   {
      //     voucherID: 2,
      //     productID: 1,
      //     code: "abcdef",
      //     description: "Giảm 10% cho sữa Vinamilk",
      //     discountValue: 10,
      //     maxDiscountValue: 5000,
      //     dateStart: 1649690583,
      //     dateEnd: 1649690583,
      //     status: "",
      //     use: false,
      //   },
      // ],
    },
    users: [
      {
        userID: "1",
        fullName: "Nguyễn Văn A",
        username: "abc",
        password: "123",
        email: "abc@gmail.com",
        avatar:
          "https://photo-cms-tpo.zadn.vn/w890/Uploaded/2022/bpivpvoi/2018_09_05/tien_phong_ailatrieuphu_OMKH.JPG",
        phoneNumber: "088182717",
        userType: "user",
        userToken: "abcxyz",
        shippingAddress: "97 Man Thien, Hiep Phu, q9 TP.HCM",
        userListCart: [
          {
            productID: 1,
            quantity: 2,
            check: false,
          },
          {
            productID: 2,
            quantity: 1,
            check: false,
          },
          {
            productID: 3,
            quantity: 3,
            check: false,
          },
        ],
        userListVoucher: [
          {
            voucherID: "1",
            isUsed: false,
          },
          {
            voucherID: "2",
            isUsed: false,
          },
          {
            voucherID: "3",
            isUsed: false,
          },
          {
            voucherID: "4",
            isUsed: true,
          },
        ],
      },
      {
        userID: "2",
        fullName: "Nguyễn Văn b",
        username: "thachda",
        password: "123",
        email: "thachbovjp@gmail.com",
        avatar:
          "https://sohanews.sohacdn.com/160588918557773824/2020/10/10/u3-1602336759357906460178.jpg",
        phoneNumber: "088182717",
        userType: "user",
        userToken: "abcxyz",
        shippingAddress: "97 Man Thien, Hiep Phu, q9 TP.HCM",
        userListCart: [
          {
            productID: 1,
            quantity: 2,
          },
          {
            productID: 2,
            quantity: 1,
          },
          {
            productID: 3,
            quantity: 3,
          },
        ],
        userListVoucher: [
          {
            voucherID: "1",
            isUsed: false,
          },
          {
            voucherID: "2",
            isUsed: false,
          },
          {
            voucherID: "3",
            isUsed: false,
          },
          {
            voucherID: "4",
            isUsed: true,
          },
        ],
      },
      {
        userID: "3",
        fullName: "admin",
        username: "admin",
        password: "123",
        email: "admin@gmail.com",
        avatar:
          "https://haycafe.vn/wp-content/uploads/2022/02/Anh-Avatar-Doremon-dep-ngau-cute.jpg",
        phoneNumber: "088182717",
        userType: "admin",
        userToken: "abcxyz",
        shippingAddress: "97 Man Thien, Hiep Phu, q9 TP.HCM",
        userListCart: [
          {
            productID: 1,
            quantity: 2,
          },
          {
            productID: 2,
            quantity: 1,
          },
          {
            productID: 3,
            quantity: 3,
          },
        ],
        userListVoucher: [
          {
            voucherID: "1",
            isUsed: false,
          },
          {
            voucherID: "2",
            isUsed: false,
          },
          {
            voucherID: "3",
            isUsed: false,
          },
          {
            voucherID: "4",
            isUsed: true,
          },
        ],
      },
    ],
    categories: [
      {
        categoryID: 1,
        img: Image.resolveAssetSource(TopPro1).uri,
        name: "Thịt heo các loại",
      },
      {
        categoryID: 2,
        img: Image.resolveAssetSource(TopPro2).uri,
        name: "Sữa tươi",
      },
      {
        categoryID: 3,
        img: Image.resolveAssetSource(TopPro3).uri,
        name: "Nước ngọt",
      },
      {
        categoryID: 4,
        img: Image.resolveAssetSource(TopPro4).uri,
        name: "Mì ăn liền",
      },
      {
        categoryID: 5,
        img: Image.resolveAssetSource(TopPro5).uri,
        name: "Dầu ăn",
      },
    ],
    products: [
      {
        productID: 1,
        name: "Sữa tươi Vinamilk thùng 24 hộp",
        price: 24000,
        quantity: 10,
        img: "https://cdn.tgdd.vn/Products/Images/2386/85844/bhx/thung-48-hop-sua-tuoi-co-duong-vinamilk-100-sua-tuoi-180ml-202006101848226080.jpg",
        categoryID: 2,
        discountPercent: 10,
        dateMFG: "1652105776",
        dateEXP: "1652105776",
        description:
          "Được hế biến từ nguồn sữa tươi 100% chứa nhiều dưỡng chất như Vitamin A, D3, canxi... tốt cho xương và hệ miễn dịch. Sữa tươi Vinamilk là thương hiệu được tin dùng hàng đầu với chất lượng tuyệt vời. Lốc 4 hộp sữa tươi có đường Vinamilk 100% 180ml thơm ngon dễ uống",
        branch: "Vinamilk",
        origin: "Hà Lan",
        ingredient:
          "Nước bão hoà CO2, chất điều chỉnh độ axit, màu tổng hợp, hỗn hợp hương chanh tự nhiên, chất tạo ngọt tổng hợp, chất bảo quản, caffeine",
        dateDiscountStart: "1649517904",
        dateDiscountEnd: "1656602704",
      },
      {
        productID: 2,
        name: "1Kg Thịt ba chỉ ngon",
        price: 80000,
        quantity: 9,
        img: "https://cdn.tgdd.vn/Products/Images/8781/228329/bhx/ba-roi-heo-khay-500g-202111262049102381.jpg",
        categoryID: 1,
        discountPercent: 10,
        dateMFG: "1652105776",
        dateEXP: "1652105776",
        description:
          "Ba rọi heo của thương hiệu CP đạt các tiêu chuẩn về an toàn toàn thực phẩm, đảm bảo chất lượng, độ tươi ngon. Thịt heo mềm, vân nạc, mỡ rõ ràng nên rất phù hợp làm nguyên liệu để nấu thịt kho hột vịt, thịt nướng BBQ. Có thể dùng điện thoại quét mã QR trên tem sản phẩm để kiểm tra nguồn gốc.",
        branch: "Vinamilk",
        origin: "Hà Lan",
        ingredient:
          "Nước bão hoà CO2, chất điều chỉnh độ axit, màu tổng hợp, hỗn hợp hương chanh tự nhiên, chất tạo ngọt tổng hợp, chất bảo quản, caffeine",
        dateDiscountStart: "1652105776",
        dateDiscountEnd: "1654788304",
      },
      {
        productID: 3,
        name: "Thùng 24 lon Pepsi vị chanh không calo",
        price: 120000,
        quantity: 5,
        img: "https://cdn.tgdd.vn/Products/Images/2443/227311/bhx/thung-24-lon-nuoc-ngot-pepsi-khong-calo-vi-chanh-330ml-202103171424206498.jpg",
        categoryID: 3,
        discountPercent: 10,
        dateMFG: "1652105776",
        dateEXP: "1652105776",
        description:
          "Sự kết hợp hài hòa của vị chanh thanh mát, giải nhiệt và mang lại cảm giác sảng khoái dài lâu. Nước ngọt Pepsi không calo vị chanh 24 lon 330ml cực kỳ thích hợp cho những người thích uống nước ngọt nhưng vẫn muốn giữ lối sống ăn thanh đạm, ít đường. Sản phẩm chất lượng từ nhà Pepsi",
        branch: "Vinamilk",
        origin: "Hà Lan",
        ingredient:
          "Nước bão hoà CO2, chất điều chỉnh độ axit, màu tổng hợp, hỗn hợp hương chanh tự nhiên, chất tạo ngọt tổng hợp, chất bảo quản, caffeine",
        dateDiscountStart: "1652105776",
        dateDiscountEnd: "1654788304",
      },
      {
        productID: 4,
        name: "Thùng 30 gói mì Hảo Hảo chua cay",
        price: 90000,
        quantity: 0,
        img: "https://cdn.tgdd.vn/Products/Images/2565/85959/bhx/thung-30-goi-mi-hao-hao-tom-chua-cay-75g-202110110920329170.jpg",
        categoryID: 4,
        discountPercent: 10,
        dateMFG: "1652105776",
        dateEXP: "1652105776",
        description:
          "Sợi mì vàng dai ngon hòa quyện trong nước súp tôm chua cay Hảo Hảo, đậm đà thấm đẫm từng sợi sóng sánh cùng hương thơm quyến rũ ngất ngây. Mì Hảo Hảo tôm chua cay gói 75g là lựa chọn hấp dẫn không thể bỏ qua đặc biệt là những ngày bận rộn cần bổ sung năng lượng nhanh chóng đơn giản mà vẫn đủ chất",
        branch: "Vinamilk",
        origin: "Hà Lan",
        ingredient:
          "Nước bão hoà CO2, chất điều chỉnh độ axit, màu tổng hợp, hỗn hợp hương chanh tự nhiên, chất tạo ngọt tổng hợp, chất bảo quản, caffeine",
        dateDiscountStart: "1652105776",
        dateDiscountEnd: "1654788304",
      },
      {
        productID: 5,
        name: "Sườn heo cực ngon",
        price: 24000,
        quantity: 12,
        img: "https://vn-live-01.slatic.net/p/ae0ac9f2ea46c8b5ea3cd5afe6c53ce9.jpg",
        categoryID: 1,
        discountPercent: 0,
        dateMFG: "1652105776",
        dateEXP: "1652105776",
        description:
          "Được hế biến từ nguồn sữa tươi 100% chứa nhiều dưỡng chất như Vitamin A, D3, canxi... tốt cho xương và hệ miễn dịch. Sữa tươi Vinamilk là thương hiệu được tin dùng hàng đầu với chất lượng tuyệt vời. Lốc 4 hộp sữa tươi có đường Vinamilk 100% 180ml thơm ngon dễ uống",
        branch: "Vinamilk",
        origin: "Hà Lan",
        ingredient:
          "Nước bão hoà CO2, chất điều chỉnh độ axit, màu tổng hợp, hỗn hợp hương chanh tự nhiên, chất tạo ngọt tổng hợp, chất bảo quản, caffeine",
        dateDiscountStart: "1649517904",
        dateDiscountEnd: "1651332304",
      },
      {
        productID: 6,
        name: "Sữa milo vị socola",
        price: 24000,
        quantity: 0,
        img: "https://cdn.tgdd.vn/Products/Images/2945/84361/bhx/loc-4-hop-thuc-uong-lua-mach-milo-active-go-180ml-202104091059593418.jpg",
        categoryID: 2,
        discountPercent: 10,
        dateMFG: "1652105776",
        dateEXP: "1652105776",
        description:
          "Được hế biến từ nguồn sữa tươi 100% chứa nhiều dưỡng chất như Vitamin A, D3, canxi... tốt cho xương và hệ miễn dịch. Sữa tươi Vinamilk là thương hiệu được tin dùng hàng đầu với chất lượng tuyệt vời. Lốc 4 hộp sữa tươi có đường Vinamilk 100% 180ml thơm ngon dễ uống",
        branch: "Vinamilk",
        origin: "Hà Lan",
        ingredient:
          "Nước bão hoà CO2, chất điều chỉnh độ axit, màu tổng hợp, hỗn hợp hương chanh tự nhiên, chất tạo ngọt tổng hợp, chất bảo quản, caffeine",
        dateDiscountStart: "1652105776",
        dateDiscountEnd: "1654788304",
      },
      {
        productID: 7,
        name: "Sữa Ovaltine giúp trẻ cao hơn thùng 24 hộp",
        price: 24000,
        quantity: 8,
        img: "https://cdn.tgdd.vn/Products/Images/2945/84141/bhx/loc-4-hop-thuc-uong-lua-mach-huong-vi-socola-ovaltine-180ml-202104091359050776.jpg",
        categoryID: 2,
        discountPercent: 20,
        dateMFG: "1652105776",
        dateEXP: "1652105776",
        description:
          "Được hế biến từ nguồn sữa tươi 100% chứa nhiều dưỡng chất như Vitamin A, D3, canxi... tốt cho xương và hệ miễn dịch. Sữa tươi Vinamilk là thương hiệu được tin dùng hàng đầu với chất lượng tuyệt vời. Lốc 4 hộp sữa tươi có đường Vinamilk 100% 180ml thơm ngon dễ uống",
        branch: "Vinamilk",
        origin: "Hà Lan",
        ingredient:
          "Nước bão hoà CO2, chất điều chỉnh độ axit, màu tổng hợp, hỗn hợp hương chanh tự nhiên, chất tạo ngọt tổng hợp, chất bảo quản, caffeine",
        dateDiscountStart: "1649517904",
        dateDiscountEnd: "1651332304",
      },
      {
        productID: 8,
        name: "Sữa Kun cao lớn mỗi ngày",
        price: 24000,
        quantity: 0,
        img: "https://cdn.tgdd.vn/Products/Images/2386/206089/bhx/loc-4-hop-sua-uong-dinh-duong-lif-kun-cao-lon-co-duong-180ml-201907031555576112.jpg",
        categoryID: 2,
        discountPercent: 10,
        dateMFG: "1652105776",
        dateEXP: "1652105776",
        description:
          "Được hế biến từ nguồn sữa tươi 100% chứa nhiều dưỡng chất như Vitamin A, D3, canxi... tốt cho xương và hệ miễn dịch. Sữa tươi Vinamilk là thương hiệu được tin dùng hàng đầu với chất lượng tuyệt vời. Lốc 4 hộp sữa tươi có đường Vinamilk 100% 180ml thơm ngon dễ uống",
        branch: "Vinamilk",
        origin: "Hà Lan",
        ingredient:
          "Nước bão hoà CO2, chất điều chỉnh độ axit, màu tổng hợp, hỗn hợp hương chanh tự nhiên, chất tạo ngọt tổng hợp, chất bảo quản, caffeine",
        dateDiscountStart: "1652105776",
        dateDiscountEnd: "1654788304",
      },
      {
        productID: 9,
        name: "Fami đậu nành nguyên chất - lốc 3 hộp 170ml",
        price: 24000,
        quantity: 10,
        img: "https://bizweb.dktcdn.net/100/364/464/products/fami-sua-dau-nanh-200ml-x1-hop.jpg?v=1624423751973",
        categoryID: 2,
        discountPercent: 10,
        dateMFG: "1652105776",
        dateEXP: "1652105776",
        description:
          "Được hế biến từ nguồn sữa tươi 100% chứa nhiều dưỡng chất như Vitamin A, D3, canxi... tốt cho xương và hệ miễn dịch. Sữa tươi Vinamilk là thương hiệu được tin dùng hàng đầu với chất lượng tuyệt vời. Lốc 4 hộp sữa tươi có đường Vinamilk 100% 180ml thơm ngon dễ uống",
        branch: "Vinamilk",
        origin: "Hà Lan",
        ingredient:
          "Nước bão hoà CO2, chất điều chỉnh độ axit, màu tổng hợp, hỗn hợp hương chanh tự nhiên, chất tạo ngọt tổng hợp, chất bảo quản, caffeine",
        dateDiscountStart: "1652105776",
        dateDiscountEnd: "1654788304",
      },
      {
        productID: 10,
        name: "500g thịt heo cốt lết tươi",
        price: 24000,
        quantity: 0,
        img: "https://cdn.tgdd.vn/Products/Images/8781/228332/bhx/suon-cot-let-khay-500g-4-6-mieng-202111262103141169.jpg",
        categoryID: 1,
        discountPercent: 10,
        dateMFG: "1652105776",
        dateEXP: "1652105776",
        description:
          "Được hế biến từ nguồn sữa tươi 100% chứa nhiều dưỡng chất như Vitamin A, D3, canxi... tốt cho xương và hệ miễn dịch. Sữa tươi Vinamilk là thương hiệu được tin dùng hàng đầu với chất lượng tuyệt vời. Lốc 4 hộp sữa tươi có đường Vinamilk 100% 180ml thơm ngon dễ uống",
        branch: "Vinamilk",
        origin: "Hà Lan",
        ingredient:
          "Nước bão hoà CO2, chất điều chỉnh độ axit, màu tổng hợp, hỗn hợp hương chanh tự nhiên, chất tạo ngọt tổng hợp, chất bảo quản, caffeine",
        dateDiscountStart: "1652105776",
        dateDiscountEnd: "1654788304",
      },
      {
        productID: 11,
        name: "Sữa đậu nành Vinasoy thơm ngon",
        price: 24000,
        quantity: 0,
        img: "https://taphoa1a.com/wp-content/uploads/2021/06/b8067c6cdba7df2bedfad129152b0ca0-1.jpg",
        categoryID: 2,
        discountPercent: 10,
        dateMFG: "1652105776",
        dateEXP: "1652105776",
        description:
          "Được hế biến từ nguồn sữa tươi 100% chứa nhiều dưỡng chất như Vitamin A, D3, canxi... tốt cho xương và hệ miễn dịch. Sữa tươi Vinamilk là thương hiệu được tin dùng hàng đầu với chất lượng tuyệt vời. Lốc 4 hộp sữa tươi có đường Vinamilk 100% 180ml thơm ngon dễ uống",
        branch: "Vinamilk",
        origin: "Hà Lan",
        ingredient:
          "Nước bão hoà CO2, chất điều chỉnh độ axit, màu tổng hợp, hỗn hợp hương chanh tự nhiên, chất tạo ngọt tổng hợp, chất bảo quản, caffeine",
        dateDiscountStart: "1652105776",
        dateDiscountEnd: "1654788304",
      },
      {
        productID: 12,
        name: "Bịch sữa vinamilk 170ml vị socola thơm ngon",
        price: 24000,
        quantity: 0,
        img: "https://cdn.tgdd.vn/Products/Images/2386/79279/bhx/sua-dinh-duong-vinamilk-a-d3-so-co-la-bich-220ml-202001090904539524.JPG",
        categoryID: 2,
        discountPercent: 10,
        dateMFG: "1652105776",
        dateEXP: "1652105776",
        description:
          "Được hế biến từ nguồn sữa tươi 100% chứa nhiều dưỡng chất như Vitamin A, D3, canxi... tốt cho xương và hệ miễn dịch. Sữa tươi Vinamilk là thương hiệu được tin dùng hàng đầu với chất lượng tuyệt vời. Lốc 4 hộp sữa tươi có đường Vinamilk 100% 180ml thơm ngon dễ uống",
        branch: "Vinamilk",
        origin: "Hà Lan",
        ingredient:
          "Nước bão hoà CO2, chất điều chỉnh độ axit, màu tổng hợp, hỗn hợp hương chanh tự nhiên, chất tạo ngọt tổng hợp, chất bảo quản, caffeine",
        dateDiscountStart: "1652105776",
        dateDiscountEnd: "1654788304",
      },
      {
        productID: 13,
        name: "Sữa Nutrifood dạng lon cao lớn mỗi ngày",
        price: 24000,
        quantity: 10,
        img: "https://cdn.tgdd.vn/Products/Images/2945/84361/bhx/loc-4-hop-thuc-uong-lua-mach-milo-active-go-180ml-202104091059593418.jpg",
        categoryID: 2,
        discountPercent: 10,
        dateMFG: "1652105776",
        dateEXP: "1652105776",
        description:
          "Được hế biến từ nguồn sữa tươi 100% chứa nhiều dưỡng chất như Vitamin A, D3, canxi... tốt cho xương và hệ miễn dịch. Sữa tươi Vinamilk là thương hiệu được tin dùng hàng đầu với chất lượng tuyệt vời. Lốc 4 hộp sữa tươi có đường Vinamilk 100% 180ml thơm ngon dễ uống",
        branch: "Vinamilk",
        origin: "Hà Lan",
        ingredient:
          "Nước bão hoà CO2, chất điều chỉnh độ axit, màu tổng hợp, hỗn hợp hương chanh tự nhiên, chất tạo ngọt tổng hợp, chất bảo quản, caffeine",
        dateDiscountStart: "1652105776",
        dateDiscountEnd: "1654788304",
      },
      {
        productID: 14,
        name: "Sữa lon Anlene ngăn ngừa nguy cơ loãng xương",
        price: 24000,
        quantity: 10,
        img: "https://cdn.tgdd.vn/Products/Images/2945/84361/bhx/loc-4-hop-thuc-uong-lua-mach-milo-active-go-180ml-202104091059593418.jpg",
        categoryID: 2,
        discountPercent: 10,
        dateMFG: "1652105776",
        dateEXP: "1652105776",
        description:
          "Được hế biến từ nguồn sữa tươi 100% chứa nhiều dưỡng chất như Vitamin A, D3, canxi... tốt cho xương và hệ miễn dịch. Sữa tươi Vinamilk là thương hiệu được tin dùng hàng đầu với chất lượng tuyệt vời. Lốc 4 hộp sữa tươi có đường Vinamilk 100% 180ml thơm ngon dễ uống",
        branch: "Vinamilk",
        origin: "Hà Lan",
        ingredient:
          "Nước bão hoà CO2, chất điều chỉnh độ axit, màu tổng hợp, hỗn hợp hương chanh tự nhiên, chất tạo ngọt tổng hợp, chất bảo quản, caffeine",
        dateDiscountStart: "1652105776",
        dateDiscountEnd: "1654788304",
      },
    ],
    orders: [
      {
        id: 1,
        userID: 1,
        orderStatus: "PENDING",
        dateCreate: 1651768371000,
        dateDelivery: 1651768371000,
        voucherDiscount: 5000,
        shippingAddress: "Tuy Hòa, Phú Yên",
        listProductCart: [
          {
            productID: 1,
            productName: "Mì tôm",
            price: 1000,
            priceDiscount: 10,
            quantity: 2,
            img: "https://indianakitchen.com/wp-content/uploads/2015/03/Ham-Sandwich.jpg",
          },
          {
            productID: 2,
            productName: "Bánh sandwich",
            price: 12000,
            priceDiscount: 10,
            quantity: 10,
            img: "https://indianakitchen.com/wp-content/uploads/2015/03/Ham-Sandwich.jpg",
          },
        ],
      },
      {
        id: 2,
        userID: 2,
        orderStatus: "PENDING",
        dateCreate: 1651768371000,
        dateDelivery: 1651768371000,
        voucherDiscount: 5000,
        shippingAddress: "Tuy Hòa, Phú Yên",
        listProductCart: [
          {
            productID: 1,
            productName: "Mì tôm",
            price: 1000,
            priceDiscount: 10,
            quantity: 2,
            img: "https://indianakitchen.com/wp-content/uploads/2015/03/Ham-Sandwich.jpg",
          },
        ],
      },
      {
        id: 3,
        userID: 1,
        orderStatus: "RECEIVED",
        dateCreate: 1651768371000,
        dateDelivery: 1651768371000,
        voucherDiscount: 5000,
        shippingAddress: "Tuy Hòa, Phú Yên",
        listProductCart: [
          {
            productID: 1,
            productName: "Mì tôm",
            price: 1000,
            priceDiscount: 10,
            quantity: 2,
            img: "https://indianakitchen.com/wp-content/uploads/2015/03/Ham-Sandwich.jpg",
          },
        ],
      },
    ],
    vouchers: [
      {
        voucherID: "1",
        code: "FREE1",
        quantity: 50,
        description:
          "Mã giảm giá 50% Sữa tươi Vinamilk thùng 24 hộp, tối đa 50000đ",
        discountValue: 50,
        dateStart: "1651377465",
        dateEnd: "1653883065",
        productID: 1,
        maxDiscountValue: 5000,
      },
      {
        voucherID: 2,
        productID: 1,
        quantity: 50,
        code: "abcdef",
        description: "Giảm 10% cho sữa Vinamilk",
        discountValue: 10,
        maxDiscountValue: 5000,
        dateStart: 1649690583,
        dateEnd: 1649690583,
      },
      // {
      //   voucherID: "3",
      //   code: "FREE3",
      //   quantity: 10,
      //   description: "Mã giảm giá 20% thịt heo, tối đa 10000đ",
      //   discountValue: 20,
      //   dateStart: "1651377465",
      //   dateEnd: "1653883065",
      //   productID: 2,
      //   maxDiscountValue: 10000,
      // },
      // {
      //   voucherID: "4",
      //   code: "FREE4",
      //   quantity: 5,
      //   description:
      //     "Mã giảm giá 50% Thùng 24 lon Pepsi vị chanh không calo, tối đa 5000đ",
      //   discountValue: 50,
      //   dateStart: "1651377465",
      //   dateEnd: "1653883065",
      //   productID: 1,
      //   maxDiscountValue: 5000,
      // },
      // {
      //   voucherID: "5",
      //   code: "FREE5",
      //   quantity: 5,
      //   description: "Mã giảm giá 70%, tối đa 5000đ",
      //   discountValue: 70,
      //   dateStart: "1651377465",
      //   dateEnd: "1653883065",
      //   productID: 10,
      //   maxDiscountValue: 5000,
      // },
      // {
      //   voucherID: "6",
      //   code: "FREE6",
      //   quantity: 10,
      //   description:
      //     "Mã giảm giá 10% Sữa tươi Vinamilk thùng 24 hộp, tối đa 50000đ",
      //   discountValue: 10,
      //   dateStart: "1651377465",
      //   dateEnd: "1653883065",
      //   productID: 1,
      //   maxDiscountValue: 50000,
      // },
      // {
      //   voucherID: "7",
      //   code: "FREE7",
      //   quantity: 10,
      //   description:
      //     "Mã giảm giá 20% Sữa tươi Vinamilk thùng 24 hộp, tối đa 30000đ",
      //   discountValue: 20,
      //   dateStart: "1651377465",
      //   dateEnd: "1653883065",
      //   productID: 1,
      //   maxDiscountValue: 20000,
      // },
      // {
      //   voucherID: "8",
      //   code: "FREE8",
      //   quantity: 10,
      //   description: "Mã giảm giá 20% thịt heo, tối đa 10000đ",
      //   discountValue: 20,
      //   dateStart: "1651377465",
      //   dateEnd: "1653883065",
      //   productID: 2,
      //   maxDiscountValue: 10000,
      // },
    ],
    comments: [
      {
        commentID: 1,
        userID: 2,
        productID: 1,
        content:
          "Dở vãi, đừng mua nha ae Dở vãi, đừng mua nha ae Dở vãi, đừng mua nha ae Dở vãi, đừng mua nha ae Dở vãi, đừng mua nha ae",
        date: "1651824853",
        starNumber: 2,
      },
      {
        commentID: 2,
        userID: 2,
        productID: 1,
        content: "Cũng ngon, hợp túi tiền",
        date: "1651824853",
        starNumber: 5,
      },
    ],
    alerts: [
      {
        alertID: "1",
        userID: "3",
        subject: "Đơn hàng đã đặt",
        content: "Đơn hàng của bạn đã được giao cho shipper",
        date: "1651377466",
        isRead: false,
      },
      {
        alertID: "2",
        userID: "1",
        subject: "Đơn hàng đã đặt",
        content: "Đơn hàng của bạn sắp tới",
        date: "1651387465",
        isRead: false,
      },
      {
        alertID: "3",
        userID: "1",
        subject: "Đơn hàng đã đặt",
        content: "Đơn hàng của bạn đã được giao",
        date: "1651397467",
        isRead: false,
      },
      {
        alertID: "4",
        userID: "",
        subject: "Ưu đãi tháng 5",
        content:
          "Vào Voucher để thu thập các mã giảm giá hot hôm nay Vào Voucher để thu thập các mã giảm giá hot hôm nay",
        date: "1651407488",
        isRead: false,
      },
      {
        alertID: "5",
        userID: "",
        subject: "Ưu đãi tháng 4",
        content:
          "Vào Voucher để thu thập các mã giảm giá hot hôm nay Vào Voucher để thu thập các mã giảm giá hot hôm nay",
        date: "1651417422",
        isRead: true,
      },
      {
        alertID: "6",
        userID: "",
        subject: "Kỷ niệm sinh nhật",
        content: "Hot Deal sinh nhật Bach Hóa Xanh",
        date: "1651427322",
        isRead: true,
      },
    ],
    component: {
      loginForm: {
        username: "",
        password: "",
      },
      profile: {},
      home: {
        selectedCategory: 0,
        searchNameText: "",
      },
    },
  },
};

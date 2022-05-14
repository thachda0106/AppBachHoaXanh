import { Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';

import Context from '../../../../local-data/Context';
import * as Actions from '../../../../local-data/Actions';
import { Function } from '../../../../Constant/Function';
import { styles } from './styles.js';
import { collectVoucher } from '../../../../local-data/Actions';
import APICaller from '../../../../local-data/APICaller';
const VoucherCart = (props) => {
	const voucher = props.voucher;
	const [ state, dispatch ] = useContext(Context);
	const isCollectVoucher = state.thach.currentUser?.userListVoucher?.some((userVoucher) => {
		return voucher.voucherID == userVoucher.voucherID;
	});

	const productDiscount = state.thach.products.find((product) => {
		return (product.productID == voucher.productID)
	});


	// Thu thập voucher
	const handleCollect = async() => {
		if (!isCollectVoucher){
			props.setIsLoading(true)
			let res = await APICaller.addVoucherToUser(state.thach.currentUser.userID, voucher)
			if(res.status > 199 && res.status < 300){
				dispatch(Actions.getCurrentUser(res.data))
				let res2 = await APICaller.getAPIVouchers()
				props.setIsLoading(false)
				if(res2.status > 199 && res2.status < 300){
					dispatch(Actions.setVouchersFromAPI(res2.data))
					Function.showToast("success", "Thu thập voucher thành công")
				}
				else{
					Function.showToast("error", "Lỗi khi get currentUser")
				}
			}
			else{
				props.setIsLoading(false)
				Function.showToast("error", "Lỗi khi thu thập voucher")
			}
		}
		else {
			props.navigation.navigate('Cart', {});
		}
	};





	const imgProduct =
		typeof productDiscount === 'undefined'
			? 'http://cdn.shopify.com/s/files/1/0413/3502/9917/collections/all-products-s_1200x1200.png?v=1632536377'
			: productDiscount.img;

	return (
		<View style={[ styles.container, voucher.quantity == 0 ? styles.effeteContainer : styles.collectContainer ]}>
			<Text style={styles.branchText}>
				{
					voucher.description
				}
			</Text>
			<View style={styles.content}>
				<Image
					style={styles.productLogo}
					source={{
						uri: imgProduct,
					}}
				/>
				<View style={styles.voucherContent}>
					<Text style={styles.voucherContentText}>
						<Text style={styles.percentText}>{voucher.discountValue}</Text>% Giảm {' '}
					</Text>
					<Text style={styles.voucherContentText}>tối đa {voucher.maxDiscountValue} vnđ </Text>
				</View>

				{voucher.quantity > 0 ? (
					<TouchableOpacity
						style={[ styles.btn, isCollectVoucher ? styles.btnUse : styles.btnCollect ]}
						onPress={handleCollect}>
						<Text style={styles.btnText}> {isCollectVoucher ? 'Sử dụng' : 'Thu thập '}</Text>
					</TouchableOpacity>
				) : (
					<View style={styles.effete}>
						<Text style={styles.effeteText}>Hết</Text>
					</View>
				)}
			</View>
			<Text style={styles.voucherTimeText}>
				Voucher có hiệu lực từ {Function.timestampToDate(voucher.dateStart)} -{' '}
				{Function.timestampToDate(voucher.dateEnd)}
			</Text>
		</View>
	);
};

export default VoucherCart;

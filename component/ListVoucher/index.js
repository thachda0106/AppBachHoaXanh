import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Button } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { styles } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faAngleRight, faGift } from '@fortawesome/free-solid-svg-icons';
import Context from '../../local-data/Context';
import VoucherTopBar from './VoucherTopBar';
import VoucherListCart from './VoucherListCart';
import MenuBottom from '../../component/MenuBottom'
import Loading from '../Loading';

const Voucher = (props) => {
	const [isLoading, setIsLoading] = useState(false)
	const [ state, dispatch ] = useContext(Context);
	const [ voucher, setVoucher ] = useState({ type: 'Explore', list: state.thach.vouchers });
	// handle update TypeVoucher
	const handleChangedTypeVoucher = (type) => {
		switch (type) {
			case 'Explore':
				setVoucher({ type, list: state.thach.vouchers });
				break;
			case '20% Giảm':
				setVoucher((prev) => {
					let list = state.thach.vouchers.filter((voucher) => (voucher.discountValue >= 20 ? true : false));
					return { type, list };
				});
				break;
			case 'Áp dụng cho mọi đơn hàng':
				setVoucher((prev) => {
					let list = state.thach.vouchers.filter((voucher) => (voucher.productID === '' ? true : false));
					return { type, list };
				});
				break;
			default:  // lay danh sach voucher theo type category
				setVoucher((prev) => {
					let categoryID = state.thach.categories.find(category => (category.name === type )).categoryID
					let list = state.thach.vouchers.filter((voucher) => {
						let product = state.thach.products.find(product => {
							return (product.productID == voucher.productID)
						})
						return ( product && (product.categoryID === categoryID))
						
					});
					return { type, list};
				});
				break;
		}
	};
	return (
		<>
			<View style={styles.container}>
				{
					isLoading && <Loading/>
				}
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() => {
							props.navigation.goBack();
						}}>
						<FontAwesomeIcon icon={faAngleLeft} size={20} color={'white'} />
					</TouchableOpacity>
					<Text style={styles.headerTitle}>Mã giảm giá</Text>
				</View>
				<VoucherTopBar handle={handleChangedTypeVoucher} />

				<VoucherListCart navigation={props.navigation} voucher = {voucher} setIsLoading={setIsLoading}/>
			</View>
			<MenuBottom navigation={props.navigation} select={1} />
		
		</>
		
	);
};
export default Voucher;

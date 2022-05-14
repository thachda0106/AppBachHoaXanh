import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { useContext, useState } from 'react';

import Context from '../../../local-data/Context';
import { styles } from './styles';
import TypeVoucherItem from './TypeVoucherItem';
const Category = (props) => {
	const [ state, dispatch ] = useContext(Context);
	const [ voucher, setVoucher ] = useState('Explore');
	const  typeVouchers = [ 'Explore', ...state.thach.categories.map((category) => category.name) ];
	
	let handleSetVoucher = (text)=>{
		if(text !== voucher) {
			setVoucher(text)
			props.handle(text)
		}
	}
	return (
		<View style={styles.container}>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{typeVouchers.map((text, index) => {
					return (
						<TouchableOpacity key={index} onPress={()=>{handleSetVoucher(text)}}>
							<TypeVoucherItem text={text} active={voucher == text ? 'active' : 'text'} />
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default Category;

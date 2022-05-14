import { TouchableOpacity, Text, View } from 'react-native';
import React, {useState}  from 'react';
import { styles } from './styles.js';

const TypeVoucherItem = (props) => {
	return (
		<View style={styles.item}>
			<Text style={styles[props.active] }>{props.text}</Text>
		</View>
	);
};

export default TypeVoucherItem;

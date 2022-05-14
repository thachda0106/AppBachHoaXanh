import { StyleSheet } from 'react-native';
import Color from '../../../../Constant/Color';
export const styles = StyleSheet.create({
	item: {
		backgroundColor: '#fff',
		marginLeft: 20,
		justifyContent: 'space-around',
	},
	text: {
		color: '#000',
		fontWeight: 'bold',
		height: '100%',
		textAlignVertical: 'center',
		borderBottomWidth: 0,
	},
	active: {
		color: Color.colorOrange,
		fontWeight: 'bold',
		height: '100%',
		textAlignVertical: 'center',
		borderBottomWidth: 3,
		borderBottomColor: Color.colorPrimary
	},
});

import { StyleSheet } from 'react-native';
import Color from '../../../../Constant/Color';


export const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		paddingLeft: 20,
		paddingRight: 4,
		marginTop: 10,
		shadowColor: '#ddd',
		shadowOffset: {
			width: 0,
			height: 7,
		},
		shadowOpacity: 0.43,
		shadowRadius: 9.51,
		elevation: 12,
	},
	effeteContainer: {
		backgroundColor: '#ddd',
	},
	collectContainer: {
		backgroundColor: '#fff',
	},
	branchText: {
		marginTop: 5,
		marginLeft: 5,
		marginBottom: 2,
		fontSize: 12,
		fontWeight: 'bold',
	},
	content: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	voucherTimeText: {
		color: Color.colorGrayText,
		marginTop: 5,
		marginLeft: 5,
		marginBottom: 5,
		fontSize: 12,
		fontWeight: 'bold',
	},
	voucherContent: {
		marginRight: 10,
		marginLeft: 10,
	},
	voucherContentText: {
		color: 'red',
	},
	percentText: {
		fontSize: 20,
	},
	productLogo: {
		width: 50,
		height: 50,
		marginLeft: 5,
		marginRight: 5,
	},
	btn: {
		borderRadius: 5,
		width: 60,
		height: 26,
		alignSelf: 'flex-end',
	},
	btnCollect: {
		backgroundColor: Color.colorOrange,
	},
	btnUse: {
		backgroundColor: Color.colorPrimary,
	},
	btnText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 12,
		textAlign: 'center',
		marginTop: 'auto',
		marginBottom: 'auto',
	},
	effete:{
		backgroundColor: '#d1d1d1',
		width: 40,
		height: 40,
		borderRadius:20
	},
	effeteText:{
		textTransform: 'uppercase',
		fontWeight: 'bold',
		color: '#333',
		fontSize: 12,
		textAlign: 'center',
		marginTop: 'auto',
		marginBottom: 'auto'
	}
});

import {StyleSheet} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Color from '../../../Constant/Color'
import {Styles} from '../../../Constant/Styles'

export const styles = StyleSheet.create({
	container :
	{
		width: '100%', 
		height: 'auto',
		borderWidth: 2,
		borderColor: '#ddd',
		padding: 10,
		borderRadius: 20,
	},
	wrapperItem:{
		flexDirection: 'row',
		justifyContent: 'flex-start',
		padding: 3,
		marginVertical: 4,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}
	,
	icon : {
		marginRight:10,
	},
	text: {
		color: '#000',
		fontWeight: 'bold',
		fontSize: 14
	},
	userText: {
		fontSize: 16
	},
	shipAddressInput:{
		...Styles.BorderBottomGray,
		borderBottomColor: Color.colorGray,
		height: 40,
		width: 300,
		marginLeft: 4,
	},
	addressBtn:{
		color: Color.colorPrimary,
		textAlign: 'center',
		textDecorationLine: 'underline'
	}
})
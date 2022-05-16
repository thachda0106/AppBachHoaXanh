import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Provider from './local-data/Provider';
import StartScreen from './component/StartScreen';
import Home from './component/Home';
import Color from './Constant/Color';
import LeftBar from './component/LeftBar/';
import Address from './component/Address/';
import ProductInfo from './component/Home/ProductInfo';
import User from './component/User';
import Toast from 'react-native-toast-message';
import Cart from './component/Cart';
import Voucher from './component/Voucher';
import LoginForm from './component/User/LoginForm';
import RegisterForm from './component/User/RegisterForm';
import ForgetPass from './component/User/ForgetPass';
import Profile from './component/User/Profile';
import ListVoucher from './component/ListVoucher';
import Manager from './component/Manager';
import Notify from './component/Notify';
import Order from './component/Order'
import History from './component/User/History';
import OrderInfo from './component/User/History/OrderInfo';
import Success from './component/Order/Success'
import ChangePassword from './component/User/ChangePassword';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
const Stack = createNativeStackNavigator();
export default function App() {
	return (
		<Provider>
			<View style={styles.container}>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name='StartScreen' component={StartScreen} />
						<Stack.Screen name='Home' component={Home} options={{ animation: 'slide_from_left' }} />
						<Stack.Screen name='LeftBar' component={LeftBar} options={{ animation: 'slide_from_left' }} />
						<Stack.Screen
							name='ListVoucher'
							component={ListVoucher}
							options={{ animation: 'slide_from_right' }}
						/>
						<Stack.Screen name='Notify' component={Notify} options={{ animation: 'slide_from_right' }} />
						<Stack.Screen name='Address' component={Address} />
						<Stack.Screen name='ProductInfo' component={ProductInfo} />
						<Stack.Screen name='User' component={User} options={{ animation: 'slide_from_right' }} />
						<Stack.Screen name='Order' component={Order} options={{ animation: 'slide_from_right' }} />
						<Stack.Screen name='Cart' component={Cart} options={{ animation: 'slide_from_right' }} />
						<Stack.Screen name='Voucher' component={Voucher} options={{ animation: 'fade_from_bottom' }} />
						<Stack.Screen
							name='LoginForm'
							component={LoginForm}
							options={{ animation: 'fade_from_bottom' }}
						/>
						<Stack.Screen
							name='RegisterForm'
							component={RegisterForm}
							options={{ animation: 'slide_from_right' }}
						/>
						<Stack.Screen
							name='ForgetPass'
							component={ForgetPass}
							options={{ animation: 'slide_from_right' }}
						/>
						<Stack.Screen name='Profile' component={Profile} options={{ animation: 'slide_from_right' }} />
						<Stack.Screen name='Manager' component={Manager} options={{ animation: 'slide_from_right' }} />
						<Stack.Screen name='History' component={History} options={{ animation: 'fade_from_bottom' }} />
						<Stack.Screen name='OrderInfo' component={OrderInfo} options={{ animation: 'slide_from_right' }} />
						<Stack.Screen name='Success' component={Success} options={{ animation: 'fade_from_bottom' }} />
						<Stack.Screen name='ChangePassword' component={ChangePassword} options={{ animation: 'fade_from_bottom' }} />
					</Stack.Navigator>
				</NavigationContainer>
				<Toast />
			</View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.colorPrimary,
	},
});

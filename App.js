import "react-native-gesture-handler";
import * as React from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	Pressable,
	TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./Components/SignIn";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import Item from "./Components/Item";
import Header from "./Components/Header";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Chat from "./Screens/Chat";
import AddItem from "./Components/AddItem";
import { UserProvider } from "./Context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import ChatList from "./Components/ChatList";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { UserContext } from "./Context/UserContext";

function HomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Welcome to Tipping Point</Text>
		</View>
	);
}

function InitialLogin() {
	const [displayLogin, setDisplayLogin] = React.useState(false);
	const [displayRegister, setDisplayRegister] = React.useState(false);
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			{!displayLogin ? (
				<>
					<Text>Welcome to Tipping Point</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							setDisplayLogin(true);
						}}
					>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>
				</>
			) : (
				<View>
					{displayRegister ? (
						<Register setDisplayRegister={setDisplayRegister} />
					) : (
						<Login setDisplayRegister={setDisplayRegister} />
					)}
				</View>
			)}
		</View>
	);
}

function MainApp() {
	const { signedIn } = React.useContext(UserContext);
	return (
		<>
			{signedIn ? (
				<NavigationContainer>
					<Drawer.Navigator initialRouteName="Home">
						<Drawer.Screen name="Welcome" component={HomeScreen} />
						{/* <Drawer.Screen name="Register" component={Register} />
						<Drawer.Screen name="Login" component={Login} /> */}
						<Drawer.Screen name="Chat" component={Chat} />
						<Drawer.Screen name="View Items" component={Home} />
						<Drawer.Screen name="Item" component={Item} />
						<Drawer.Screen name="Add Item" component={AddItem} />
						<Drawer.Screen name="Chat List" component={ChatList} />
					</Drawer.Navigator>
				</NavigationContainer>
			) : (
				<InitialLogin />
			)}
		</>
	);
}

const Drawer = createDrawerNavigator();

function App() {
	return (
		<UserProvider>
			<Header />
			<MainApp />
		</UserProvider>
	);
}

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fbf9f1",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		width: "60%",
		padding: 10,
		borderRadius: 5,
		borderWidth: 1,
		backgroundColor: "#417969",
		margin: 5,
		textAlign: "center",
	},
	buttonText: {
		color: "white",
		textAlign: "center",
		fontWeight: "bold",
	},
});

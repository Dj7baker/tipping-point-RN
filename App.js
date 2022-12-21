import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
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



function HomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Welcome to Tipping Point</Text>
      <Pressable
				style={styles.button}
				onPress={() => navigation.navigate("Login")}
			>
				<Text>LOGIN</Text>
			</Pressable>
      <Pressable
				style={styles.button}
				onPress={() => navigation.navigate("Register")}
			>
				<Text>Register</Text>
			</Pressable>
			{/* <Pressable
				style={styles.button}
				onPress={() => navigation.navigate("Sign In To Your Account")}
			>
				<Text>Login</Text>
			</Pressable> */}

			{/* <Pressable
				style={styles.button}
				onPress={() => navigation.navigate("Sign Up For An Account")}
			>
				<Text>Sign Up</Text>
			</Pressable> */}
			{/* <Button
				title="Skip - view items"
				onPress={() => navigation.navigate("ViewItems")}
			/> */}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("View Items")}
      >
        <Text style={styles.buttonText}>Skip - view items</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Add Item")}
      >
        <Text style={styles.buttonText}>List An Item</Text>
      </Pressable>
    </View>
  );
}

const Stack = createNativeStackNavigator();


function App() {
	return (
    <> 
    <Header/>
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Welcome" component={HomeScreen} />
				<Stack.Screen name="Sign In To Your Account" component={SignIn} />
				<Stack.Screen name="Sign Up For An Account" component={SignUp} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Chat' component={Chat} />
				<Stack.Screen name="ViewItems" component={Home} />
				<Stack.Screen name="Item" component={Item} />
        <Stack.Screen name="Add Item" component={AddItem} />
			</Stack.Navigator>
		</NavigationContainer>
    </>
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

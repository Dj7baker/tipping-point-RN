import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from "axios";
import { postUser } from "../api";

const Register = ({ setDisplayRegister }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [avatar, setAvatar] = useState("");

	// const postUser = async (userInfo) => {
	// 	console.log(userInfo);
	// 	await axios.post("url", userInfo);
	// };

	const register = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Registered
				// console.log(userCredential);
				const user = userCredential.user;
				console.log(user.uid);
				updateProfile(user, {
					displayName: name,
					photoURL: avatar
						? avatar
						: "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x",
				})
					.then(() => {
						alert("Registered, please login.");
						setDisplayRegister(false);
					})
					.catch((error) => {
						alert(error.message);
					});
				const essentialUserData = {
					id: user.uid,
					email,
					chats: [],
					listedItems: [],
					avatar,
					name,
				};

				postUser(essentialUserData);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(errorMessage);
			});
	};

	return (
		<View style={styles.container}>
			<Input
				placeholder="Enter your name"
				label="Name"
				value={name}
				onChangeText={(text) => setName(text)}
			/>
			<Input
				placeholder="Enter your email"
				label="Email"
				value={email}
				onChangeText={(text) => setEmail(text)}
			/>
			<Input
				placeholder="Enter your password"
				label="Password"
				value={password}
				onChangeText={(text) => setPassword(text)}
				secureTextEntry
			/>
			<Input
				placeholder="Enter your image url"
				label="Profile Picture"
				value={avatar}
				onChangeText={(text) => setAvatar(text)}
			/>
			<Button title="register" onPress={register} style={styles.button} />

			<TouchableOpacity
				// style={{ color: "blue" }}
				onPress={() => setDisplayRegister(false)}
			>
				<Text>Return to Login</Text>
			</TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 10,
		marginTop: 100,
	},
	button: {
		width: 370,
		marginTop: 10,
	},
});

export default Register;

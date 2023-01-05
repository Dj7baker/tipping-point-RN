import { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { UserContext } from "../Context/UserContext";
import { Avatar } from "react-native-elements";

export default function Header() {
	const { setSignedIn, signedIn } = useContext(UserContext);
	const signOutNow = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				setSignedIn(false);
			})
			.catch((error) => {
				// An error happened.
			});
	};

	return (
		<View style={styles.header}>
			{signedIn ? (
				<View style={{ marginLeft: 20 }}>
					<Avatar
						rounded
						source={{
							uri: signedIn?.dbUser?.avatar,
						}}
					/>
				</View>
			) : (
				<Text style={styles.text} />
			)}
			<Text style={styles.title}>Tipping Point</Text>

			{signedIn ? (
				<TouchableOpacity onPress={() => signOutNow()}>
					<Text style={{ color: "white", fontWeight: "bold" }}>Logout</Text>
				</TouchableOpacity>
			) : (
				<Text style={styles.text} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		paddingTop: 50,
		backgroundColor: "#417969",
		paddingBottom: 20,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
	},
	title: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
	text: {
		minWidth: 30,
		color: "pink",
	},
});

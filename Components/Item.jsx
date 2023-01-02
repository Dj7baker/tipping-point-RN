import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useState, useEffect, useContext } from "react";
import { getItemById } from "../api";
import { UserContext } from "../Context/UserContext";

export default function Item({ route, navigation }) {
	const { signedIn } = useContext(UserContext);
	const { item_id } = route.params;

	const [item, setItem] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getItemById(item_id).then((result) => {
			setItem(result);
			setIsLoading(false);
		});
	}, [item_id]);
	return isLoading ? (
		<Text>Loading Item</Text>
	) : (
		<View style={styles.card}>
			<Text
				style={{
					fontSize: "24",
					fontWeight: "bold",
					marginBottom: 10,
				}}
			>
				{item.title}
			</Text>
			<Text>{signedIn ? "I am signed in :)" : "I am NOT signed in :("}</Text>
			<Image
				source={{ uri: item.image }}
				style={{
					width: "98%",
					height: 300,
					borderWidth: 1,
					borderColor: "#bebebe",
					borderRadius: 5,
					marginLeft: "1%",
					marginBottom: 10,
				}}
			/>
			<Text>
				{item.condition} | {item.likes} Likes
			</Text>
			<Text style={{ marginTop: 20 }}>{item.description}</Text>
			<Pressable
				style={styles.button}
				onPress={() => {
					if (signedIn) {
						navigation.replace("Chat", {
							chatName: `${item.id}+${signedIn.user.uid}`,
						});
					} else {
						navigation.navigate("Login");
					}
				}}
			>
				<Text>Message</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#bebebe",
		padding: 20,
		margin: 10,
		backgroundColor: "#FFF",
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

import {
	View,
	Text,
	StyleSheet,
	Button,
	ScrollView,
	Pressable,
	Image,
} from "react-native";
import { useState, useEffect } from "react";
import { getItems } from "../api";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Item from "./Item";
import AddItem from "./AddItem";

export default function Home({ navigation }) {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const today = new Date();

	useEffect(() => {
		getItems().then((result) => {
			setItems(result);
			setIsLoading(false);
		});
	}, []);

	items.sort((a, b) => {
		return a.id < b.id
	})

	const calculateTimeRemaining = (unixEndTime) => {
		const today = Date.now();
		let delta = Math.abs(unixEndTime - today) / 1000;
		const days = Math.floor(delta / 86400);
		delta -= days * 86400;
		const hours = Math.floor(delta / 3600) % 24;
		delta -= hours * 3600;
		const minutes = Math.floor(delta / 60) % 60;
		delta -= minutes * 60;

		let timeout = "";
		if (days > 0) {
			timeout = `${days} D | ${hours} H | ${minutes} M`;
		} else if (days < 1) {
			timeout = `${hours} H | ${minutes} M`;
		} else if (days < 1 && hours < 1) {
			timeout = `${minutes} minutes remaining`;
		}
		return timeout;
	};

	const Stack = createNativeStackNavigator();

	return (
		<ScrollView>
			<View>
				{isLoading ? (
					<Text>Loading Items</Text>
				) : (
					
					items.map((item) => {
						const timeout = calculateTimeRemaining(item.endDate);
						return (
							<Pressable
								key={item.id}
								style={styles.card}
								onPress={() => {
									navigation.navigate("Item", { item_id: item.id });
								}}
							>
								<Image
									source={{ uri: item.image }}
									style={{
										width: 100,
										height: 100,
										borderWidth: 1,
										borderRadius: 5,
										borderColor: "#bebebe",
									}}
								/>
								<View style={{ marginLeft: 20 }}>
									<Text
										style={{
											fontSize: 20,
											width: "100%",
											marginBottom: 10,
											fontWeight: "bold",
										}}
									>
										{item.title}
									</Text>
									<Text>{item.condition}</Text>

									<Text>{item.likes} Likes</Text>
									<Text>{timeout}</Text>
									<Pressable
										style={{
											borderRadius: 5,
											padding: 3,
											width: 80,
											alignItems: "center",
											backgroundColor: "#417969",
										}}
										onPress={() => {
											console.log("hello");
										}}
									>
										<Text style={{ color: "white" }}>Shortlist</Text>
									</Pressable>
								</View>
							</Pressable>
						);
					})
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		flexDirection: "row",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#bebebe",
		padding: 10,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 5,
		backgroundColor: "#FFF",
	},
});

import {
	View,
	Text,
	StyleSheet,
	Button,
	ScrollView,
	Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { getArticles } from "../api";

export default function Home({ navigation }) {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getArticles().then((result) => {
			setItems(result);
			setIsLoading(false);
		});
	}, []);
	return (
		<ScrollView>
			<View>
				<Text>Home - All items</Text>
				{isLoading ? (
					<Text>Loading Items</Text>
				) : (
					items.map((item) => {
						return (
							<Pressable
								key={item.article_id}
								style={styles.card}
								onPress={() => {
									navigation.navigate("Item", { item_id: item.title });
								}}
							>
								<Text>{item.title}</Text>
							</Pressable>
							// <View key={item.article_id} style={styles.card}>
							//   <Text>{item.title}</Text>
							//   <Button title={"View Item"} onPress={()=> {navigation.navigate('Item', {item_id:item.title})}} />
							// </View>
						);
					})
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	card: {
		borderWidth: 1,
		padding: 5,
		margin: 5,
	},
});

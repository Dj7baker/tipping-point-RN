import { useState, useEffect } from "react";
import {
	View,
	Text,
	ScrollView,
	Pressable,
	StyleSheet,
	Image,
} from "react-native";
import { getChatList } from "../api";

function ChatList({ navigation }) {
	const [chatList, setChatList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getChatList().then((result) => {
			setChatList(result);
			setIsLoading(false);
		});
	}, []);

	console.log(chatList);

	return (
		<ScrollView>
			<View>
				{isLoading ? (
					<Text>Loading Chats</Text>
				) : (
					chatList.map((chat) => {
						return (
							<Pressable
								key={chat.id}
								style={styles.card}
								onPress={() => {
									navigation.navigate("Chat", { chatName: chat.id });
								}}
							>
								<Image
									source={{ uri: chat.image }}
									style={{
										width: 100,
										height: 100,
										borderWidth: 1,
										borderRadius: 5,
										borderColor: "#bebebe",
									}}
								/>
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

export default ChatList;

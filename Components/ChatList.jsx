import { useState, useEffect, useContext } from "react";
import {
	View,
	Text,
	ScrollView,
	Pressable,
	StyleSheet,
	Image,
} from "react-native";
// import { getChatList } from "../api";
import { UserContext } from "../Context/UserContext";

function ChatList({ navigation }) {
	const [chatList, setChatList] = useState([]);
	const { signedIn } = useContext(UserContext);

	useEffect(() => {
		const { dbUser } = signedIn;
		console.log("dbUser: ", dbUser);

		setChatList(dbUser.chats);
	}, []);

	console.log("chatList: ", chatList);

	return (
		<ScrollView>
			<View>
				{chatList.map((chat) => {
					return (
						<Pressable
							key={chat.chatName}
							style={styles.card}
							onPress={() => {
								navigation.navigate("Chat", { chatName: chat.chatName });
							}}
						>
							<Image
								source={{ uri: chat.chateeAvatar }}
								style={{
									width: 100,
									height: 100,
									borderWidth: 1,
									borderRadius: 5,
									borderColor: "#bebebe",
								}}
							/>
							<Text>{chat.chateeName}</Text>
						</Pressable>
					);
				})}
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

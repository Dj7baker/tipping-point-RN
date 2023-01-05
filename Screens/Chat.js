import React, {
	useEffect,
	useCallback,
	useState,
	useLayoutEffect,
	useContext,
} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import { GiftedChat } from "react-native-gifted-chat";
import {
	collection,
	addDoc,
	query,
	orderBy,
	onSnapshot,
} from "firebase/firestore";
import { UserContext } from "../Context/UserContext";
import { patchUserChat, getUserById } from "../api";

const Chat = ({ navigation, route }) => {
	const { chatName } = route.params;
	const { setSignedIn, signedIn } = useContext(UserContext);
	const [chatInfo, setChatInfo] = useState({});
	const {
		dbUser: { chats },
	} = signedIn;

	useEffect(() => {
		async function runChat() {
			const thisChat = chats.find((e) => e.chatName === chatName);
			console.log("GOT TO USE EFFECT", chats, thisChat);

			if (!thisChat) {
				const chatUsersIdArray = chatName?.split("+");
				const listerReq = await getUserById(chatUsersIdArray[0]);
				setChatInfo({
					chatName,
					chateeAvatar: listerReq.avatar,
					chateeName: listerReq.name,
				});

				await patchUserChat(chatUsersIdArray[0], {
					chatName,
					chateeAvatar: signedIn.dbUser.avatar,
					chateeName: signedIn.dbUser.name,
				});
				await patchUserChat(chatUsersIdArray[1], {
					chatName,
					chateeAvatar: listerReq.avatar,
					chateeName: listerReq.name,
				});
				setSignedIn({
					...signedIn,
					dbUser: {
						...signedIn.dbUser,
						chats: [
							...signedIn.dbUser.chats,
							{
								chatName,
								chateeAvatar: listerReq.avatar,
								chateeName: listerReq.name,
							},
						],
					},
				});
			} else {
				console.log("GOT TO ELSE ", thisChat);
				setChatInfo(thisChat);
			}
		}
		runChat();
	}, []);

	// Need a useEffect that checks the user.chat to see if the chatName is listed in the array. If it is listed then no further action needed. If not, then a post request needs to be made to update both the current signed in user, and the item listed user, user.chat with this chatName.

	const [messages, setMessages] = useState([]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<View style={{ marginLeft: 20 }}>
					<Avatar
						rounded
						source={{
							uri: chatInfo?.chateeAvatar,
						}}
					/>
				</View>
			),
			headerRight: () => (
				<TouchableOpacity
					style={{
						marginRight: 10,
					}}
					onPress={() => navigation.navigate("Home")}
				>
					<Text>Home</Text>
				</TouchableOpacity>
			),
		});

		const q = query(
			collection(db, `${chatName}`),
			orderBy("createdAt", "desc")
		);
		const unsubscribe = onSnapshot(q, (snapshot) =>
			setMessages(
				snapshot.docs.map((doc) => ({
					_id: doc.data()._id,
					createdAt: doc.data().createdAt.toDate(),
					text: doc.data().text,
					user: doc.data().user,
				}))
			)
		);

		return () => {
			unsubscribe();
		};
	}, [navigation]);

	const onSend = useCallback((messages = []) => {
		const { _id, createdAt, text, user } = messages[0];

		addDoc(collection(db, `${chatName}`), { _id, createdAt, text, user });
	}, []);

	console.log("chatInfo: ", chatInfo);

	return (
		<GiftedChat
			messages={messages}
			showAvatarForEveryMessage={true}
			onSend={(messages) => onSend(messages)}
			user={{
				_id: auth?.currentUser?.email,
				name: auth?.currentUser?.displayName,
				avatar: auth?.currentUser?.photoURL,
			}}
		/>
	);
};

export default Chat;

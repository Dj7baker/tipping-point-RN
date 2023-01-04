import {
	Text,
	TextInput,
	View,
	Button,
	StyleSheet,
	Image,
	ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import { ErrorMessage, Formik } from "formik";
import { postItem } from "../api";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { NavigationHelpersContext } from "@react-navigation/native";
import { UserContext } from "../Context/UserContext";

export default function AddItem({ navigation }) {
	const [condition, setCondition] = useState();
	const [endDate, setEndDate] = useState("259200000");
	const [image, setImage] = useState(null);
	const { signedIn } = useContext(UserContext);
	console.log(signedIn.user.uid);
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};
	return (
		//     <View style={{ margin: 10, borderWidth: 1, padding: 20 }}>
		//       <Formik
		//         initialValues={{ title: "", description: "" }}
		//         onSubmit={(values) => {
		//           console.log(values);
		//           const newItem = {
		//             title: values.title,
		//             description: values.description,
		//             date: new Date(),
		//           };

		//           postItem(newItem).then((result) => {
		//             console.log(result);
		//           });
		//         }}
		//       >
		//         {(props) => (
		//           <View>
		//             <Text>Item Name</Text>
		//             <TextInput
		//               placeholder="Item Name"
		//               style={{ borderWidth: 1, padding: 10 }}
		//               onChangeText={props.handleChange("title")}
		//               value={props.values.title}
		//             ></TextInput>

		//             <Text>Description</Text>
		//             <TextInput
		//               multiline
		//               placeholder="Item Description"
		//               style={{ borderWidth: 1, padding: 10 }}
		//               onChangeText={props.handleChange("description")}
		//               value={props.values.description}
		//             ></TextInput>
		//             <Button title="Submit" onPress={props.handleSubmit} />
		//           </View>
		//         )}
		//       </Formik>
		//     </View>
		//   );
		// }
		<ScrollView>
			<View style={{ margin: 10, borderWidth: 1, padding: 10 }}>
				<Formik
					initialValues={{
						title: "",
						description: "",
						condition: "",
					}}
					onSubmit={(values) => {
						const today = Date.now();
						const itemExpiry = Number(endDate);

						const newItem = {
							title: values.title,
							description: values.description,
							likes: 0,
							condition: condition,
							date: new Date(),
							endDate: today + itemExpiry,
							user_id: signedIn.user.uid
						};

						postItem(newItem).then((result) => {
							navigation.navigate("Home");
							setCondition("");
							values.title = "";
							values.description = "";
							// console.log(result);
						});
					}}
				>
					{(props) => (
						<View>
							{image ? (
								<Button title="Change Image" onPress={pickImage} />
							) : (
								<Button
									title="Pick an image from camera roll"
									onPress={pickImage}
								/>
							)}

							{image && (
								<Image
									source={{ uri: image }}
									style={{ width: 200, height: 200 }}
								/>
							)}
							<View style={styles.inputWrapper}>
								<Text style={styles.label}>Item Name</Text>
								<TextInput
									placeholder="Item Name"
									style={styles.input}
									onChangeText={props.handleChange("title")}
									value={props.values.title}
								></TextInput>
							</View>

							<View style={styles.inputWrapper}>
								<Text style={styles.label}>Item Description</Text>
								<TextInput
									multiline
									placeholder="Item Description"
									style={styles.input}
									onChangeText={props.handleChange("description")}
									value={props.values.description}
								></TextInput>
							</View>
							<Text>Condition</Text>
							<Picker
								selectedValue={condition}
								onValueChange={(itemValue) => setCondition(itemValue)}
							>
								<Picker.Item label="As New" value="As New" />
								<Picker.Item label="Used" value="Used" />
								<Picker.Item label="Upcycle Project" value="Upcycle Project" />
							</Picker>
							{/* <DateTimePicker value={new Date()} onChange={setDate} /> */}
							<Text>Item Duration</Text>
							<Picker
								selectedValue={endDate}
								onValueChange={(itemValue) => setEndDate(itemValue)}
							>
								<Picker.Item label="24 Hours" value="86400000" />
								<Picker.Item label="36 Hours" value="259200000" />
								<Picker.Item label="7 Days" value="604800000" />
							</Picker>

							<Button title="Submit" onPress={props.handleSubmit} />
						</View>
					)}
				</Formik>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	inputWrapper: {
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		marginBottom: 15,
	},
	label: {
		width: "100%",
		marginBottom: 5,
	},
	input: {
		width: "100%",
		borderWidth: 1,
		borderRadius: 5,
		padding: 10,
	},
});

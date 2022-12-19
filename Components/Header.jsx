import { Text, View, StyleSheet } from "react-native";

export default function Header() {
	return (
		<View style={styles.header}>
			<Text>Tipping Point</Text>
		</View>
	);
}

const styles = StyleSheet.create({
    header: {paddingTop: 50, backgroundColor: 'green', paddingBottom: 10, justifyContent:'center', alignItems: 'center'}
})
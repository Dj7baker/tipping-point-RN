import { Text, View } from "react-native";

export default function Item({ route, navigation }) {
const {item_id} = route.params
return (
    <Text>
        {item_id}
    </Text>
)
}
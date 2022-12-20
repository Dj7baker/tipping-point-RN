import { Text, View, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getItemById } from "../api";

export default function Item({ route, navigation }) {
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
});

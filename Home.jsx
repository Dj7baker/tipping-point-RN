import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { getArticles } from "./api";

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
              <View key={item.article_id} style={styles.card}>
                <Text>{item.title}</Text>
                <Button title={"View Item"} />
              </View>
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

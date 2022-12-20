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
  return (
    <ScrollView>
      <View>
        {isLoading ? (
          <Text>Loading Items</Text>
        ) : (
          items.map((item) => {
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

import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function SignIn({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Sign In</Text>
      <TextInput
        style={{
          backgroundColor: "#EEE",
          borderWidth: 2,
          width: "100%",
          padding: 5,
        }}
      />
      <TextInput>Password</TextInput>
      <Button title="Submit" />
    </View>
  );
}

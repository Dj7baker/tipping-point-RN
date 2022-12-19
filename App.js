import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./SignIn";
import Home from "./Home";
import SignUp from "./SignUp";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome to Tipping Point</Text>
      <Button
        title="Sign In"
        onPress={() => navigation.navigate("Sign In To Your Account")}
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate("Sign Up For An Account")}
      />
      <Button
        title="Skip - view items"
        onPress={() => navigation.navigate("ViewItems")}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Welcome" component={HomeScreen} />
        <Stack.Screen name="Sign In To Your Account" component={SignIn} />
        <Stack.Screen name="Sign Up For An Account" component={SignUp} />
        <Stack.Screen name="ViewItems" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

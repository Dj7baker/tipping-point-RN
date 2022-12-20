import { Text, TextInput, View, Button } from "react-native";
import React from "react";
import { ErrorMessage, Formik } from "formik";
import { postItem } from "../api";

export default function AddItem() {
  return (
    <View style={{ margin: 10, borderWidth: 1, padding: 20 }}>
      <Formik
        initialValues={{ title: "", description: "" }}
        onSubmit={(values) => {
          console.log(values);
          const newItem = {
            title: values.title,
            description: values.description,
            date: new Date(),
          };

          postItem(newItem).then((result) => {
            console.log(result);
          });
        }}
      >
        {(props) => (
          <View>
            <Text>Item Name</Text>
            <TextInput
              placeholder="Item Name"
              style={{ borderWidth: 1, padding: 10 }}
              onChangeText={props.handleChange("title")}
              value={props.values.title}
            ></TextInput>

            <Text>Description</Text>
            <TextInput
              multiline
              placeholder="Item Description"
              style={{ borderWidth: 1, padding: 10 }}
              onChangeText={props.handleChange("description")}
              value={props.values.description}
            ></TextInput>
            <Button title="Submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

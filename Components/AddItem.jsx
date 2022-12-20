import { Text, TextInput, View, Button } from "react-native";
import { React, useState } from "react";
import { Formik, getActiveElement } from "formik";
import { postItem } from "../api";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddItem() {
  const [condition, setCondition] = useState();
  const [newDate, setNewDate] = useState();

  console.log(newDate);
  const setDate = (event, date) => {
    setNewDate(date);
    const {
      type,
      nativeEvent: { timestamp },
    } = event;
  };

  return (
    <View style={{ margin: 10, borderWidth: 1, padding: 10 }}>
      <Formik
        initialValues={{
          title: "",
          description: "",
          condition: "",
        }}
        onSubmit={(values) => {
          const newItem = {
            title: values.title,
            description: values.description,
            condition: condition,
            date: new Date(),
            endDate: newDate,
          };
          console.log(newItem);

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
            <Text>Condition</Text>
            <Picker
              selectedValue={condition}
              onValueChange={(itemValue) => setCondition(itemValue)}
            >
              <Picker.Item label="As New" value="As New" />
              <Picker.Item label="Used" value="Used" />
              <Picker.Item label="Upcycle Project" value="Upcycle Project" />
            </Picker>
            <DateTimePicker value={new Date()} onChange={setDate} />

            <Button title="Submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

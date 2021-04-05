import React from "react";
import { StyleSheet, View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select"

export default function Select(props) {

    const list = [];
    props.objects.map(cr => {
        list.push({label: cr, value: cr, inputLabel: cr})
    })

    return (
        <View>
            { props.error && (
                <Text style={styles.errorMessage}>{props.error.message}</Text>                
            )}
            <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={pickerStyles}
                items={list}
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  errorMessage: {
    color: "red",
    marginHorizontal: 30,
    marginBottom: 2,
  },
})

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    marginTop: 2,
    marginBottom: 8,
    marginHorizontal: "5%",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
	inputAndroid: {
    fontSize: 16,
    // paddingHorizontal: 10,
    // paddingVertical: 1,
    padding: 16,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8, 
    color: "black",
    marginTop: 2,
    marginBottom: 8,
    marginHorizontal: "5%",
    paddingRight: 30, // to ensure the text is never behind the icon
	},
})

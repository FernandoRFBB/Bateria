import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";


export default function Input(props) {
    return (
        <View>
            { props.error && (
                <Text style={styles.errorMessage}>{props.error.message}</Text>                
            )}
            <TextInput
                autoCapitalize='words'
                style={styles.boxInput}
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
boxInput: {
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 16,
        marginHorizontal: 20,
        marginTop: 2,
        marginBottom: 8,
        fontSize: 16,
    },
    errorMessage: {
        color: "red",
        marginHorizontal: 30,
        marginBottom: 2,
    }
})

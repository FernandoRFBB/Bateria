import React from 'react';
import { View, StyleSheet, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';

import colors from '../config/styles/colors'

export default function Login(props) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.boxMail}>
                <Text style={styles.boxText}>
                    Email
                </Text>
                <View style={styles.boxInside}>
                    <TextInput placeholder={"testando"} style={styles.boxInput} />
                </View>
            </View>
            <View style={styles.boxPassword}>
                <Text style={styles.boxText}>
                    Senha
                </Text>
                <View style={styles.boxInside}>
                    <TextInput placeholder={"testando"} style={styles.boxInput} />
                </View>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Roboto",
    },
    boxMail: {
        position: "absolute",
        width: "85%",
        top: "137px",
    },
    boxPassword: {
        position: "absolute",
        width: "85%",
        top: "237px",
    },
    boxText: {
        fontSize: "26px",
        fontStyle: "normal",
        lineHeight: "30px",
        marginLeft: '5px'
    },
    boxInside: {
        height: "50px",
        marginTop: "6px",
        borderColor: "#000",
        borderWidth: 2,
        justifyContent: "center"
    },
    boxInput: {
        height: "30px",
        borderColor: "#000",
        borderWidth: 1,
        paddingLeft: "5px",
    },
    button: {
        position: "absolute",
        backgroundColor: colors.black,
        top: "368px",
        width: "25%",
        height: "45px",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: "20px",
    }
})

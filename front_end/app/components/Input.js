import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import styles from '../css/styles'



export default function Input(props) {
    var temp = props.value
    
    if (props.value)
    {        
        if (props.cpf && props.value.length == 12) {
            temp = temp.replace(/^(\d{3})(\.{1})(\d{3})(\d{3})(\d{2})$/, "$1$2$3.$4-$5")
        } else if (props.cpf && props.value.length == 13) {
            temp = temp.replace(/^(\d{3})(\.{1})(\d{3})(\.{1})(\d{3})(\d{2})$/, "$1$2$3$4$5-$6")
        } else if (props.cpf && props.value.length == 11) {
            temp = temp.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
        }

        if (props.telefone && props.value.length == 9) {
            temp = temp.replace(/^(\d{5})(\d{4})$/, "$1-$2")
        }
        // if (props.cpf && props.value.length == 4) {
        //     var ch = props.value.charAt(4);
        //     if (ch != '.') {
        //         temp = temp.replace(/^(\d{3})(\d{1})$/, "$1.$2")
        //     }
            
        // }
    }
    
    return (
        <View>
          {!!props.error && (
            <Text style={styles.errorMessage}>{props.error}</Text>
          )}
          <TextInput
            autoCapitalize='words'
            style={props.style}
            onChangeText={props.onChangeText}
            error={props.error}
            onBlur={props.onBlur}
            value={temp}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            keyboardType={props.keyboardType}
            editable={props.editable}
            secureTextEntry={props.secureTextEntry}
          />
        </View>
    )
}
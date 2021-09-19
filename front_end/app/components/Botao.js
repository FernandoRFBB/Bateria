import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from '../css/styles'



export default function Botao(props) {
    return (
        <View>
            <TouchableOpacity
						style={[styles.botao, props.botaoStyle]}
						{...props}
						>
							<Text style={[styles.botaoTexto, props.textoStyle]}>{props.texto}</Text>
						</TouchableOpacity>
        </View>
    )
}
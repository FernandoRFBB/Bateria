import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import api from '../services/api';


import styles from '../css/styles'
import Botao from '../components/Botao';

export default function Config({ navigation, route }) {

	api.get("/login").then((response) => {
    console.log(response.data);
  })

	const logout = () => {
		console.log("Logout");
	}

	return (
    	<View style={styles.containerConfig}>
        <Botao
          botaoStyle={{ marginTop: 10, marginHorizontal: "25%" }}
          texto="Criar administrador"
          onPress={() => navigation.navigate("AdminForm", { tela: "Config" })}
        />
        <Botao
          botaoStyle={{ marginTop: 10, marginHorizontal: "25%" }}
          texto="Sair"
          onPress={logout}
        />
      </View>
    )
}

import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from "react-native-flash-message"

import api from '../services/api';
import message, { testarConexao } from "../services/errors";
import styles from '../css/styles'

export default function Config({ navigation, route }) {

  const [ disable, setDisable ] = useState(false);

	const logout = async () => {

    setDisable(true);

    const connection = await testarConexao();
    if (!connection) {
      setDisable(false);
      return;
    };
    
    await api.get("/login/logout")
    .then(() => {
      showMessage({
        message: "Saiu com sucesso",
        type: "danger"
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    })
    .catch(() => {
      message.erroDesconhecido();
    });
	}

	return (
    	<View style={styles.containerConfig}>
        <TouchableOpacity style={styles.configBotao} onPress={() => navigation.navigate("AdminForm", { tela: "Config" })}>
          <Text style={styles.botaoTexto}>Criar administrador</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.configBotao} onPress={logout} disabled={disable}>
          <Text style={styles.botaoTexto}>Sair</Text>
        </TouchableOpacity>
      </View>
    )
}

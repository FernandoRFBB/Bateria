import React, { useState } from 'react';
import { View } from 'react-native';
import { showMessage } from "react-native-flash-message"

import api from '../services/api';
import message, { testarConexao } from "../services/errors";
import styles from '../css/styles'
import Botao from '../components/Botao';

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
    });
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
          disabled={disable}
        />
      </View>
    )
}

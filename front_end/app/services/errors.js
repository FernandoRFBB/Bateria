// RESOLVER ERROS DE CONEXAO DE INTERNET / ERROS INESPERADOS

import { showMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo"

const erroDesconhecido = () => {
  showMessage({
    message: "Erro desconhecido, tente novamente",
    type: "danger",
    duration: 2850,
    titleStyle: { alignSelf: "center"}
  })
}

const testarConexao = async () => {
  return await NetInfo.fetch().then(state => {
    if (!state.isConnected) {
      showMessage({
        message: "Você está desconectado da internet. Tente novamente",
        type: "warning",
        duration: 3000,
        titleStyle: { alignSelf: "center" },
      });
    }
    return state.isConnected;
  });
}


module.exports = {
  erroDesconhecido,
  testarConexao
}
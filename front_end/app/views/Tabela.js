import React, { useEffect, useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Modal, RefreshControl } from "react-native"
import { FAB } from "react-native-paper";
// import Icon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Fontisto"
import { useIsFocused } from "@react-navigation/native"

import message, { testarConexao } from "../services/errors";
import styles from "../css/styles"
import api from '../services/api'
import { showMessage } from "react-native-flash-message";

export default function Tabela ({navigation, route}) {

  const isFocused = useIsFocused();

  const [ usuarios, setUsuarios ] = useState([]);

  // Preciso dessa variavel pra gambiarra, quando ela atualizar, no caso quando for deletar o usuario, ele vai dar refresh na pagina automaticamente
  const [ disable, setDisable ] = useState(false);

  // Ativar o modal para confirmar a exclusão do usuario
  const [ deletar, setDeletar ] = useState(false);

  // Nome do usuario a ser deletado, para aparecer no modal
  const [ deletarNome, setDeletarNome ] = useState("");

  // RECARREGAR A PAGINA 
  const [refreshing, setRefreshing] = useState(false);

  // SOBRE AS PAGINAS E TROCAR ELAS
    // Quantos itens aparecem por pagina || Meu medo desse método é ter que carregar muito usuario de uma vez, desencessariamente.
    const [ qtdPorPagina, setQtdPorPagina ] = useState(10);

    // Pagina atual
    const [ pagina, setPagina ] = useState(0);
    const [ ordemDecrescente, setOrdemDecrescente ] = useState(false);

    // Se esta aberto as opcoes do usuario
    const [ open, setOpen ] = useState(false);

    // Usuario selecionado
    const [ pressId, setPressId ] = useState(0);

    // Ordenar os usuarios
    const usuariosOrdenados = usuarios
      .slice()
      .sort((item1, item2) =>
        (ordemDecrescente ? item1.nome < item2.nome : item2.nome < item1.nome)
          ? 1
          : -1
      );

    // Seta o numero do primeiro item da lista naquela pagina
    const comeco = pagina * qtdPorPagina;
    const final = ( pagina + 1 ) * qtdPorPagina;

  // const [ deletado, setDeletado ] = useState(false);

  useEffect(() => {
    // Usando if isFocused porque se não ele vai carregar a pagina também quando eu sair dela
    if (isFocused) {
      getUsuarios();
      getNomeInstrumento();
    }
    return () => {
      setUsuarios([]);
    }
  }, [isFocused]);

  const getUsuarios = async () => {

    const connection = await testarConexao();
    if (!connection) {
      return;
    };

    await api.get("/usuarios/instrumento/" + route.params.instrumento_id)
    .then((response) => {
      // Colocando 0 no final porque ele traz um array dentro de um array
      setUsuarios(response.data.usuarios);
    })
    .catch((e) => {
      console.log(e);
      message.erroDesconhecido();
    });   
  }

  const getNomeInstrumento = async () => {
    try {
      const connection = await testarConexao();
      if (!connection) {
        return;
      }
      var url = "/instrumentos/" + route.params.instrumento_id;
      var response = await api.get(url);
      navigation.setOptions({ title: response.data.instrumento.nome});
    } catch (e) {
      message.erroDesconhecido();
    }
  }

  const remover = async () => {
    try {

      setDisable(true);
      const connection = await testarConexao();
      if (!connection) {
        return;
      }

      var url = "/usuarios/" + pressId;
      await api.delete(url);
      showMessage({
        message: "Usuario deletado com sucesso",
        type: "danger"
      });

      // setDeletado(true);
      setDeletar(false);
      setOpen(false);
      getUsuarios();

    } catch (e) {
      message.erroDesconhecido();
    }
    setDisable(false);
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUsuarios();
    setRefreshing(false);
  })

  return(
    <View style={{flex: 1}}>
      <ScrollView
        style={styles.containerTabela}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.header}>
          <View style={styles.primeiraColuna}>
            <TouchableOpacity onPress={() => setOrdemDecrescente(!ordemDecrescente)}>
              <Text style={styles.textoTitulo}>
                Nome
                <Icon name={ordemDecrescente ? "arrow-up-l" : "arrow-down-l"}/>
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.restoColunas}>
            <View style={styles.col}>
              <Text style={styles.textoTituloColuna}>D</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.textoTituloColuna}>Camisa</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.textoTituloColuna}>Calca</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.textoTituloColuna}>Sapato</Text>
            </View>
          </View>
        </View>
        {usuariosOrdenados.slice(comeco, final).map((usuario) =>
        <View key={usuario.id}>
          <TouchableOpacity
            onPress={() => {
              // Verificar se o user pressionado é o mesmo, se for ele so fecha as opcoes
              if (usuario.id != pressId) {
                setPressId(usuario.id);
                setOpen(true);
              } else {
                setOpen(!open)
              }
            }}>
              <View style={[styles.linha, {
                backgroundColor: open && pressId === usuario.id ? "#cfcfcf" : "#f0f0f0",
              }]}>
                <View style={styles.primeiraColuna}>
                  <Text>{usuario.nome}</Text>
                </View>
                <View style={styles.restoColunas}>
                  <View style={styles.col}>
                    {usuario.diretor != 0 && (
                      <Icon style={styles.textoColuna} name={"check"}/>
                    )}
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.textoColuna}>{usuario.tam_camisa}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.textoColuna}>{usuario.tam_calca}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.textoColuna}>{usuario.tam_calcado}</Text>
                  </View>
                </View>
              </View>
          </TouchableOpacity>
          {open && pressId == usuario.id && (
            <View
              style={styles.tabelaOp}>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate("UsuarioForm", { usuario: pressId, tela: "Tabela", ver: true, instrumentos: route.params.instrumentos })}>
                  <Icon
                    name="preview"
                    size={30}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate("UsuarioForm", { usuario: pressId, tela: "Tabela", editar: true, instrumentos: route.params.instrumentos})}>
                  <Icon
                    name="save-1"
                    size={30}
                  />
                </TouchableOpacity>
              </View>
              <View>
              <TouchableOpacity onPress={() => {setDeletar(true), setDeletarNome(usuario.nome)}}>
                  <Icon
                    name="close"
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        )}
        <View style={styles.paginacao}>
          <View style={styles.textoPaginacao}>
            <Text>
              {/* Para n ficar 9 - 13 por exemplo, sendo que só tem 10 pessoas, ai fica 9 - 10 || Caso não tenha usuarios, deixar 0 - 0 de 0 */}
              {usuarios.length > 0 ? `${comeco + 1} - ${final < usuarios.length ? final : usuarios.length} de ${usuarios.length}` : "0 - 0 de 0"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => comeco > 0 ? setPagina(pagina - 1) : ""}
            style={styles.botaoPaginacao}
          >
            <Icon
              name="angle-left"
              color={ comeco == 0 ? '#CACFD2': 'black' }
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => final < usuarios.length ? setPagina(pagina + 1) : ""}
            style={styles.botaoPaginacao}
          >
            <Icon
              name="angle-right"
              color={ final <= usuarios.length ? 'black' : '#CACFD2' }
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 100}}/>
      </ScrollView>
      <Modal 
        animationType="fade"
        transparent={true}
        visible={deletar}
        onRequestClose={() => setDeletar(false)}
      >
        <View style={[styles.modalView, { marginTop: "70%" }]}>
          <View style={{alignContent: 'center'}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>Tem certeza que deseja deletar {deletarNome}?</Text>
          </View>
          <View style={styles.deletarView}>
            <TouchableOpacity style={styles.deletarBotao} onPress={() => setDeletar(false)}>
              <Text style={styles.limiteBotaoTexto}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.deletarBotao, { backgroundColor: !disable ? 'black' : '#CACFD2' }]} onPress={remover} disabled={disable}>
              <Text style={styles.limiteBotaoTexto}>Deletar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("PegarImagem",
          { instrumento_id: route.params.instrumento_id, tela: "Tabela", instrumentos: route.params.instrumentos })}
      />
    </View> 
  )
}
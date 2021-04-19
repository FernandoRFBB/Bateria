import React, { useState } from "react"
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Pressable } from "react-native"
import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { showMessage } from "react-native-flash-message"

export default function Tabela ({navigation, route}) {

  const [ usuarios ] = useState([
      {
        id: 0,
        nome: "Fernando",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false
      },
      {
        id: 1,
        nome: "Bruno",
        idade: 111111111,
        camisa: "M",
        calca: "GG",
        sapato: "30",
        diretor: true,
      },
      {
        id: 6,
        nome: "Joao",
        idade: 111111111,
        camisa: "XG",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 2,
        nome: "Pedro",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true
      },

      {
        id: 3,
        nome: "Ana",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 4,
        nome: "Bruna",
        idade: 111111111,
        camisa: "M",
        calca: "XG",
        sapato: "30",
        diretor: false
      },
      {
        id: 5,
        nome: "Rodolfo",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 7,
        nome: "SSSSSSS",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 8,
        nome: "ZZZZZZZZZZ",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 0,
        nome: "Fernando",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false
      },
      {
        id: 1,
        nome: "Bruno",
        idade: 111111111,
        camisa: "M",
        calca: "GG",
        sapato: "30",
        diretor: true,
      },
      {
        id: 6,
        nome: "Joao",
        idade: 111111111,
        camisa: "XG",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 2,
        nome: "Pedro",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true
      },

      {
        id: 3,
        nome: "Ana",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 4,
        nome: "Bruna",
        idade: 111111111,
        camisa: "M",
        calca: "XG",
        sapato: "30",
        diretor: false
      },
      {
        id: 5,
        nome: "Rodolfo",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 7,
        nome: "SSSSSSS",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 8,
        nome: "ZZZZZZZZZZ",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
       {
        id: 0,
        nome: "Fernando",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false
      },
      {
        id: 1,
        nome: "Bruno",
        idade: 111111111,
        camisa: "M",
        calca: "GG",
        sapato: "30",
        diretor: true,
      },
      {
        id: 6,
        nome: "Joao",
        idade: 111111111,
        camisa: "XG",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 2,
        nome: "Pedro",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true
      },

      {
        id: 3,
        nome: "Ana",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 4,
        nome: "Bruna",
        idade: 111111111,
        camisa: "M",
        calca: "XG",
        sapato: "30",
        diretor: false
      },
      {
        id: 5,
        nome: "Rodolfo",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 7,
        nome: "SSSSSSS",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 8,
        nome: "ZZZZZZZZZZ",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
       {
        id: 0,
        nome: "Fernando",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false
      },
      {
        id: 1,
        nome: "Bruno",
        idade: 111111111,
        camisa: "M",
        calca: "GG",
        sapato: "30",
        diretor: true,
      },
      {
        id: 6,
        nome: "Joao",
        idade: 111111111,
        camisa: "XG",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 2,
        nome: "Pedro",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true
      },

      {
        id: 3,
        nome: "Ana",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 4,
        nome: "Bruna",
        idade: 111111111,
        camisa: "M",
        calca: "XG",
        sapato: "30",
        diretor: false
      },
      {
        id: 5,
        nome: "Rodolfo",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 7,
        nome: "SSSSSSS",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 8,
        nome: "ZZZZZZZZZZ",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 0,
        nome: "Fernando",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false
      },
      {
        id: 1,
        nome: "Bruno",
        idade: 111111111,
        camisa: "M",
        calca: "GG",
        sapato: "30",
        diretor: true,
      },
      {
        id: 6,
        nome: "Joao",
        idade: 111111111,
        camisa: "XG",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 2,
        nome: "Pedro",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true
      },

      {
        id: 3,
        nome: "Ana",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 4,
        nome: "Bruna",
        idade: 111111111,
        camisa: "M",
        calca: "XG",
        sapato: "30",
        diretor: false
      },
      {
        id: 5,
        nome: "Rodolfo",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 7,
        nome: "SSSSSSS",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 8,
        nome: "ZZZZZZZZZZ",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 0,
        nome: "Fernando",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false
      },
      {
        id: 1,
        nome: "Bruno",
        idade: 111111111,
        camisa: "M",
        calca: "GG",
        sapato: "30",
        diretor: true,
      },
      {
        id: 6,
        nome: "Joao",
        idade: 111111111,
        camisa: "XG",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 2,
        nome: "Pedro",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true
      },

      {
        id: 3,
        nome: "Ana",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 4,
        nome: "Bruna",
        idade: 111111111,
        camisa: "M",
        calca: "XG",
        sapato: "30",
        diretor: false
      },
      {
        id: 5,
        nome: "Rodolfo",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 7,
        nome: "SSSSSSS",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 8,
        nome: "ZZZZZZZZZZ",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 0,
        nome: "Fernando",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false
      },
      {
        id: 1,
        nome: "Bruno",
        idade: 111111111,
        camisa: "M",
        calca: "GG",
        sapato: "30",
        diretor: true,
      },
      {
        id: 6,
        nome: "Joao",
        idade: 111111111,
        camisa: "XG",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 2,
        nome: "Pedro",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true
      },

      {
        id: 3,
        nome: "Ana",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 4,
        nome: "Bruna",
        idade: 111111111,
        camisa: "M",
        calca: "XG",
        sapato: "30",
        diretor: false
      },
      {
        id: 5,
        nome: "Rodolfo",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 7,
        nome: "SSSSSSS",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 8,
        nome: "ZZZZZZZZZZ",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 0,
        nome: "Fernando",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false
      },
      {
        id: 1,
        nome: "Bruno",
        idade: 111111111,
        camisa: "M",
        calca: "GG",
        sapato: "30",
        diretor: true,
      },
      {
        id: 6,
        nome: "Joao",
        idade: 111111111,
        camisa: "XG",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 2,
        nome: "Pedro",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true
      },

      {
        id: 3,
        nome: "Ana",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 4,
        nome: "Bruna",
        idade: 111111111,
        camisa: "M",
        calca: "XG",
        sapato: "30",
        diretor: false
      },
      {
        id: 5,
        nome: "Rodolfo",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 7,
        nome: "SSSSSSS",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 8,
        nome: "ZZZZZZZZZZ",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 0,
        nome: "Fernando",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false
      },
      {
        id: 1,
        nome: "Bruno",
        idade: 111111111,
        camisa: "M",
        calca: "GG",
        sapato: "30",
        diretor: true,
      },
      {
        id: 6,
        nome: "Joao",
        idade: 111111111,
        camisa: "XG",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 2,
        nome: "Pedro",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true
      },

      {
        id: 3,
        nome: "Ana",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: false,
      },
      {
        id: 4,
        nome: "Bruna",
        idade: 111111111,
        camisa: "M",
        calca: "XG",
        sapato: "30",
        diretor: false
      },
      {
        id: 5,
        nome: "Rodolfo",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 7,
        nome: "SSSSSSS",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
      {
        id: 8,
        nome: "ZZZZZZZZZZ",
        idade: 111111111,
        camisa: "M",
        calca: "G",
        sapato: "30",
        diretor: true,
      },
  ]);
  // Quantos itens aparecem por pagina || Meu medo desse método é ter que carregar muito usuario de uma vez, desencessariamente.
  const [ qtdPorPagina, setQtdPorPagina ] = useState([50]);
  const [ pagina, setPagina ] = useState(0);
  const [ ordemDecrescente, setOrdemDecrescente ] = useState(false);
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
  return(
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.primeiraColuna}>
            <Text style={styles.textoTitulo}>Nome</Text>
          </View>
          <View style={styles.restoColunas}>
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
          <Pressable onPress={() => {
          console.log(usuario.id);
          }}>
            <View style={styles.linha}>
              <View style={styles.primeiraColuna}>
                <Text>{usuario.nome}</Text>
              </View>
              <View style={styles.restoColunas}>
                <View style={styles.col}>
                  <Text style={styles.text}>{usuario.camisa}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.text}>{usuario.calca}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.text}>{usuario.sapato}</Text>
                </View>
              </View>
            </View>
          </Pressable>
        )}
        <View style={styles.paginacao}>
          <View style={styles.textoPaginacao}>
            <Text>
              {`${comeco + 1} - ${final < usuarios.length ? final : usuarios.length} de ${usuariosOrdenados.length}`}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>  comeco > 0 ? setPagina(pagina - 1) : ""}
            style={styles.botaoPaginacao}
          >
            <Icon
              name="angle-left" 
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => final < usuarios.length ? setPagina(pagina + 1) : ""}
            style={styles.botaoPaginacao}
          >
            <Icon
              name="angle-right"
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 100}}/>
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("PegarImagem",
          { instrumento: route.params.instrumento_id, tela: "Tabela" })}
      />
      {route.params?.created &&
        showMessage({
        message: "Usuario criado com sucesso",
        type: "success"
        })
      }
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    maxHeight: 30,
    minHeight: 20,
  },
  linha: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    maxHeight: 40,
    minHeight: 40,
    alignItems: "center"
  },
  primeiraColuna: {
    flex: 1,
    marginLeft: 10
  },
  restoColunas: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
  },
  text: {
    alignSelf: "center"
  },
  textoTituloColuna: {
    alignSelf: "center",
    fontWeight: "bold"
  },
  textoTitulo: {
    fontWeight: "bold",
  },
  col: {
    flex: 1,
  },
  paginacao: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10
  },
  textoPaginacao: {
    alignSelf: "center"
  },
  botaoPaginacao: {
    padding: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
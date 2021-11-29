import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, ScrollView, Modal, Platform, RefreshControl, TouchableOpacity } from "react-native";
import { showMessage } from "react-native-flash-message"
import { Formik } from 'formik'
import * as yup from "yup";
import { Button, Card, FAB, Title } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native"

import message, { testarConexao } from "../services/errors"
import styles from '../css/styles'
import api from '../services/api'
import Loading from '../components/Loading';

const schema = yup.object().shape({
    limite: yup.number()
        .typeError("Limite precisa ser numero")
        .min(0, "Tamanho muito pequeno")
        .max(200, "Tamanho muito grande")
        .required("Não pode deixar em branco")
})

export default function Home({ navigation, route }) {

  const [ instrumentos, setInstrumentos ] = useState([]);
  const [ mudarLimite, setMudarLimite ] = useState(false);

  // Limite padrao do objeto para colocar no textinput
  const [ objLimite, setObjLimite ] = useState();

  // Id do instrumento, para passar para o Modal
  const [ instrumentoLimite, setInstrumentoLimite ] = useState();

  // EVITAR QUE A PESSOA ENVIE O FORMULARIO 2 VEZES OU MAIS SEGUIDOS
  const [ disable, setDisable ] = useState(false);

  // RECARREGAR A PAGINA
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    // Usando if isFocused porque se não ele vai carregar a pagina também quando eu sair dela
    if (isFocused) {
      getInstrumentos();
    }
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getInstrumentos();
    setRefreshing(false);
  })

  const onSubmit = async (data) => {
    
    setDisable(true);

    const connection = await testarConexao();
    if (!connection) {
      setDisable(false);
      return;
    }

    var url = "http://34.67.164.46/api/limites/" + data.id;
    await api.put(url, {limite: data.limite})
    .then(() => {
      onRefresh();
      setMudarLimite(false);
      showMessage({
        message: "Limite atualizado",
        type: "success"
      })
    })
    .catch(() => {
      setMudarLimite(false);
      message.erroDesconhecido();
    });
    setMudarLimite(false);
    setDisable(false);
  }

  const getInstrumentos = async () => {

    const connection = await testarConexao();
    if (!connection) {
      return;
    };

    await api.get("/instrumentos")
    .then((response) => {
      // Colocando 0 no final porque ele traz um array dentro de um array
      setInstrumentos(response.data.instrumento[0]);
    })
    .catch(() => {
      message.erroDesconhecido();
    });
  }

  return (
    <View>
      <Loading loading={disable}/>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {instrumentos.map((i) =>
        <View key={i.id}>
          <Title style={styles.cardTitulo}>{i.nome}</Title>
          <Text
            style={{alignSelf: 'center'}}
            onPress={() => {
              setMudarLimite(true);
              setInstrumentoLimite(i.id);
              setObjLimite(i.limite);
            }}
          >
            Limite: {i.limite}
          </Text>
          <Text style={styles.cardQtdPessoas}>Faltam {i.qtdPessoas} pessoas</Text>
          <Card style={styles.card}>
            <Card.Cover source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Repique.JPG" }} />
            <Card.Actions style={{alignSelf: "center"}}>
              <Button
                onPress={() => navigation.navigate("Tabela",
                  { instrumento_id: i.id, instrumentos: instrumentos })} // setando o instrumento pra n ficar carregando depois para inserir usuario || procurar outro jeito
              >
                Mais informações
              </Button>
            </Card.Actions>
          </Card>
        </View>
        )}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={mudarLimite}
        onRequestClose={() => {setMudarLimite(false)}}
      >
        <View style={styles.centerView}>
          <View style={styles.modalView}>
            <Title style={styles.limiteText}>Limite</Title>
            <View>
              <Formik
                initialValues={{limite: objLimite, id: instrumentoLimite}}
                validationSchema={schema}
                onSubmit={(values) => onSubmit(values)}
              >
                {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
                  <View>
                    <View>
                      {errors.limite && (
                        <Text style={{color: 'red'}}>{errors.limite}</Text>
                      )}
                    </View>
                    <TextInput
                      defaultValue={objLimite}
                      onBlur={handleBlur("limite")}
                      onChangeText={handleChange('limite')}
                      textAlign={"center"}
                      keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                      maxLength={2}
                      value={values.limite}
                      style={styles.limiteInput}
                    />
                    <TouchableOpacity
                      style={[styles.limiteBotao, { backgroundColor: !disable ? 'black' : '#CACFD2' }]}
                      onPress={handleSubmit}
                      disabled={disable}
                    >
                      <Text style={styles.limiteBotaoTexto}>Trocar</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </View>
      </Modal>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("PegarImagem",
          { instrumento: "", tela: "Home", instrumentos: instrumentos, instrumento_id: instrumentos[0].id })}
      />
    </View>
  );
}
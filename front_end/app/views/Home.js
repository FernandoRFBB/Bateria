import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Modal, Platform, RefreshControl } from "react-native";
import { showMessage } from "react-native-flash-message"
import { Formik } from 'formik'
import * as yup from "yup";
import { Button, Card, FAB, Title } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native"

import message, { testarConexao } from "../services/errors"

import Botao from "../components/Botao"


import styles from '../css/styles'
import api from '../services/api'
import Input from "../components/Input"

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
      setDisable(false);
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

  useEffect(() => {
    // Usando if isFocused porque se não ele vai carregar a pagina também quando eu sair dela
    if (isFocused) {
      getInstrumentos();
    }
  }, [isFocused]);

  return (
    <View>
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
          <Title style={{alignSelf: "center", marginTop: 10}}>{i.nome}</Title>
          <Text style={styles.limiteText} onPress={() => {setMudarLimite(true); setInstrumentoLimite(i.id); setObjLimite(i.limite);}}>Limite: {i.limite}</Text>
          <Text style={{alignSelf: "center", color: "red", marginBottom: 10,}}>Faltam {i.qtdPessoas} pessoas</Text>
          <Card style={{ marginBottom: 20, marginHorizontal: 20}}>
            <Card.Cover source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Repique.JPG" }} />
            <Card.Actions style={{alignSelf: "center"}}>
              <Button
                onPress={() => navigation.navigate("Tabela",
                  { instrumento_id: i.id, instrumento: i.nome })}
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
                {({ handleChange, handleBlur, handleSubmit, errors, values, isValid }) => (
                  <View>
                    <Input
                      defaultValue={objLimite}
                      error={errors.limite}
                      onBlur={handleBlur("limite")}
                      onChangeText={handleChange('limite')}
                      textAlign={"center"}
                      keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                      maxLength={2}
                      value={values.limite}
                      style={[styles.boxInput, { borderColor: "black", paddingLeft: 75 }]}
                    />
                    <Botao
                      botaoStyle={{marginTop: 10, backgroundColor: (!disable || isValid) ? 'black' : '#CACFD2', borderRadius: 0 }} // verificando se o usuario ja tiver apertado, ficar com a cor de disable
                      texto={'Enviar'}
                      onPress={handleSubmit}
                      disabled={!isValid || disable}
                    />
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
          { instrumento: "", tela: "Home" })}
      />
    </View>
  );
}
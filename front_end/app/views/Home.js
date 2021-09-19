import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Modal, Platform } from "react-native";
import { showMessage } from "react-native-flash-message"
import { Formik, getIn } from 'formik'
import * as yup from "yup";
import { Button, Card, FAB, Title } from "react-native-paper";
import Botao from "../components/Botao"

import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [ objLimite, setObjLimite ] = useState(999);

  const onSubmit = data => {
    console.log(data);
    setMudarLimite(false);
    showMessage({
      message: "Limite atualizado",
      type: "success"
    })
    navigation.navigate("Home", { limite: true });
  }

  const getInstrumentos = async () => {
    try {
      var response = await api.get("/instrumentos");
      
      // COlocando 0 no final porque ele traz um array dentro de um array
      setInstrumentos(response.data.instrumento[0]);
    } catch (error) {
      console.error(error.message)
    }
  }
  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@isLogged')
      if(value !== null) {
        console.log("Foi :)")
      } else {
        console.log("nao foi D:")
      }
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getInstrumentos();
    getData();
  }, []);

  return (
    <View>
      <ScrollView>
        {instrumentos.map((i) =>
        <View key={i.id}>
          <Title style={{alignSelf: "center", marginTop: 10}}>{i.nome}</Title>
          <Text style={styles.limiteText} onPress={() => {setMudarLimite(true); setObjLimite(i.id);}}>Limite: {i.limite}</Text>
          <Text style={{alignSelf: "center", color: "red", marginBottom: 10,}}>Faltam 4 pessoas</Text>
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
      {/* <Modal 
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
                initialValues={{limite: '40', id: objLimite}}
                validationSchema={schema}
                onSubmit={(values) => onSubmit(values)}
              >
                {({ handleChange, handleBlur, handleSubmit, errors, values, isValid }) => (
                  <View>
                    <Input
                      defaultValue={'40'}
                      error={errors.sapato}
                      onBlur={handleBlur("limite")}
                      onChangeText={handleChange('limite')}
                      textAlign={"center"}
                      keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                      maxLength={2}
                      value={values.limite}
                      style={[styles.boxInput, { borderColor: "black", paddingLeft: 75 }]}
                    />
                    <Botao
                      botaoStyle={{marginTop: 10, backgroundColor: isValid ? 'black' : '#CACFD2', borderRadius: 0 }}
                      texto={'Enviar'}
                      onPress={handleSubmit}
                      disabled={!isValid}                      
                    />
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </View>
      </Modal> */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("PegarImagem",
          { instrumento: "1", tela: "Home" })}
      />
    </View>
  );
}
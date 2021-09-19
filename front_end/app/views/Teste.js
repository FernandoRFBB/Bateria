import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, Platform, TextInput, StyleSheet } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import * as yup from "yup";
import { Formik } from "formik"
import { TextInputMask } from "react-native-masked-text"
import { showMessage } from "react-native-flash-message";

import { Picker } from "@react-native-picker/picker"

import styles from "../css/styles"
// import Select from "../components/Select";
import Botao from "../components/Botao";
import api from '../services/api'

export default function UsuarioForm({ navigation, route }) {

  const [tamanhos] = useState(["P", "M", "G", "GG", "XG", "XXG"]);
  const [instrumentos] = useState([
    "Caixa",
    "Chocalho",
    "Cuica",
    "Pandeiro",
    "Repique",
    "Surdo 1",
    "Surdo 2",
    "Tamborim",
  ]);

  // const getUsuario = async () => {
  //   try {
  //     var response = await api.get("/usuarios/39");
  //     console.log("Usuario: ",response.data.usuario);
  //     setUsuario(response.data.usuario);
  //     setUri("http://34.67.164.46/api/usuarios/foto/44.jpeg");
  //     console.log("nome: ",usuario.nome);
  //     console.log("uri: ",uri)
  //   } catch (error) {
  //     console.log("Usuario: " + error);
  //   }
  // }

  // const [ usuario, setUsuario ] = useState([]);

  // const [ uri, setUri ] = useState();

  // useEffect(() => {
  //     getUsuario();
  //     setUri("http://34.67.164.46/api/usuarios/foto/44.jpeg");
  // }, []); // precisa desse array se não fica infinito carregando

  // const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <ScrollView>
      <View>
        <View style={{paddingTop: 50}}>
            <Botao
              botaoStyle={{ marginTop: 10, backgroundColor: "black"/*isValid ? "black" : "#CACFD2"*/, paddingBottom: 20 }}
              texto={"Enviar"}
              onPress={() => console.log("waw")}
              // disabled={!isValid}
            />
            <Image source={{uri: 'http://34.67.164.46/api/usuarios/foto/44.jpeg?' + new Date()}} style={{width: 50, height: 50}} />
        </View>
      </View>
    </ScrollView>
  );
}


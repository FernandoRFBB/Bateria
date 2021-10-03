import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, Platform, TextInput, StyleSheet, Modal, TouchableOpacity } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import * as yup from "yup";
import { Formik } from "formik"
import { TextInputMask } from "react-native-masked-text"
import { showMessage } from "react-native-flash-message";
import Icon from "react-native-vector-icons/Ionicons";

import { Picker } from "@react-native-picker/picker"

import styles from "../css/styles"
// import Select from "../components/Select";
import Botao from "../components/Botao";
import api from '../services/api'

export default function UsuarioForm({ navigation, route }) {

  const [ verSenha, setVerSenha ] = useState(false);

  return (
    <View>
      <View>
        <View style={{flex: 1, alignItems: 'center', marginTop: 20, minHeight: 15, marginBottom: 80}}>
            <Text style={styles.errorMessage}>Email inválido</Text>
            <Text style={styles.errorMessage}>Senha inválida</Text>
        </View>
        <View style={style.textoView}>
          <Text
            style={style.textoForm}
          >
            Email
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", minHeight: 60, justifyContent: "center", marginBottom: 30, borderWidth: 1, borderColor: "black", marginHorizontal: 20, borderRadius: 10 }}>
          <TextInput
            placeholder="Email"
            maxLength={40}
            style={[style.textInp, { flex: 1, borderWidth: 0 }]}
            secureTextEntry={verSenha}
          />
        </View>
        <View style={style.textoView}>
          <Text
            style={style.textoForm}
          >
            Senha
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: "row", minHeight: 60, justifyContent: "center", marginBottom: 30, borderWidth: 1, borderColor: "black", marginHorizontal: 20, borderRadius: 10}}>
          <TextInput
            placeholder="Senha"
            maxLength={40}
            style={[style.textInp, { flex: 1, borderWidth: 0 }]}
            secureTextEntry={verSenha}
          />
          <Icon
            name={verSenha ? "eye" : "eye-off"}
            size={20}
            style={{alignSelf: 'center', marginHorizontal: 20}}
            onPress={() => setVerSenha(!verSenha)}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Botao
            botaoStyle={{backgroundColor: 'black'}}
            textoStyle={{fontSize: 17}}
            texto={"Entrar"}
          />
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  textoView: {
    marginLeft: 32,
    marginBottom: 5
  },
  textoForm: {
    fontSize: 20
  },
  textInp: {
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 16,
    // marginTop: 2,
    // marginBottom: 8,
    fontSize: 16,
    paddingRight: 0,
    marginRight: 0,
  }
})
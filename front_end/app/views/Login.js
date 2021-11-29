import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import * as yup from 'yup'
import { Formik } from 'formik'
import { showMessage } from "react-native-flash-message"
import Icon from "react-native-vector-icons/Ionicons";

import message, { testarConexao } from "../services/errors"

import styles from '../css/styles'
import api from '../services/api'
import Loading from '../components/Loading';

const schema = yup.object().shape({
  	email: yup.string()
			.email("Email inválido")
			.required("Email é obrigatório"),
		senha: yup.string()
			.required("Senha é obrigatório")
})

export default function Login({navigation, route}) {

  // EVITAR QUE A PESSOA ENVIE O FORMULARIO 2 VEZES OU MAIS SEGUIDOS
  const [ disable, setDisable ] = useState(false);

  const [ esconderSenha, setEsconderSenha ] = useState(true);

	const onSubmit = async (data) => {
    
    setDisable(true);
    
    const connection = await testarConexao();
    if (!connection) {
      setDisable(false);
      return;
    }
    await api.post("/login/auth", {
      email: data.email,
      senha: data.senha
      // email: "ts@gmail.com",
      // senha: "123"
    })
    .then(() => {
      showMessage({
        message: "Bem vindo",
        type: "success"
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    })
    .catch((error) => {
      if (error.response) {
        showMessage({
          message: error.response.data.message,
          type: "danger",
          duration: 2850,
          titleStyle: {alignSelf: "center"}
        });
      } else {
        message.erroDesconhecido();
      }
    });
    setDisable(false);
	}

  return (
     <View>
      <Loading loading={disable}/>
      <Formik
        initialValues={{ email: '', senha: '' }}
        validationSchema={schema}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, values, isValid, touched }) => (
          <View>
            <View style={{flex: 1, alignItems: 'center', marginTop: 20, minHeight: 15, marginBottom: 80}}>
              {errors.email && touched.email && (
                <Text style={styles.errorMessage}>{errors.email}</Text>
              )}
              {errors.senha && touched.senha && (
                <Text style={styles.errorMessage}>{errors.senha}</Text>
              )}
            </View>
            <View style={styles.formView}>
              <Text
                style={styles.formTexto}
              >
                Email
              </Text>
            </View>
            <View style={styles.formInputView}>
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
                maxLength={40}
                style={styles.formInput}
                autoCapitalize="none"
                autoCompleteType="email"
                autoCorrect={false}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.formView}>
              <Text
                style={styles.formTexto}
              >
                Senha
              </Text>
            </View>
            <View style={styles.formInputView}>
              <TextInput
                onChangeText={handleChange("senha")}
                onBlur={handleBlur("senha")}
                value={values.senha}
                placeholder="Senha"
                maxLength={40}
                style={styles.formInput}
                secureTextEntry={esconderSenha}
              />
              <TouchableOpacity onPress={() => setEsconderSenha(!esconderSenha)}>
                <Icon
                  name={esconderSenha ? "eye-off" : "eye"}
                  style={styles.iconSenha}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              style={[styles.botao, {backgroundColor: !disable ? 'black' : '#CACFD2'}]}
              onPress={handleSubmit}
              disabled={disable}
            >
              <Text style={styles.botaoTexto}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
   </View>
  );
}
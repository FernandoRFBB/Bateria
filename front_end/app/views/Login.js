import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableNativeFeedbackBase } from 'react-native';
import * as yup from 'yup'
import { Formik } from 'formik'
import { showMessage } from "react-native-flash-message"

import message, { testarConexao } from "../services/errors"

import styles from '../css/styles'
import Botao from '../components/Botao'
import api from '../services/api'

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
      <Formik
        initialValues={{ email: '', senha: '' }}
        validationSchema={schema}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, values, isValid, touched }) => (
          <View>
            <View style={{flex: 1, alignItems: 'center', marginTop: 20, maxHeight: 13, minHeight: 13}}>
              {errors.email && touched.email && (
                <Text style={styles.errorMessage}>{errors.email}</Text>
              )}
              {errors.senha && touched.senha && (
                <Text style={styles.errorMessage}>{errors.senha}</Text>
              )}
            </View>
            <View style={{marginTop: 80}}>
              <View style={{marginBottom: 20}}>
                <View style={{marginLeft: 32, marginBottom: 5}}>
                  <Text
                    style={{fontSize: 20}}
                  >
                    Email
                  </Text>
                </View>
                <View>
                  <TextInput
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="Email"
                    maxLength={40}
                    style={[styles.boxInput, { borderColor: 'black', borderWidth: 1 }]}
                    autoCapitalize="none"
                    autoCompleteType="email"
                  />
                </View>
            </View>
            <View style={{marginBottom: 15}}>
              <View style={{marginLeft: 32, marginBottom: 4}}>
                <Text
                  style={{fontSize: 20}}
                >
                  Senha
                </Text>
              </View>
              <View>
                <TextInput
                  onChangeText={handleChange("senha")}
                  onBlur={handleBlur("senha")}
                  value={values.senha}
                  placeholder="Senha"
                  maxLength={40}
                  style={[styles.boxInput, { borderColor: 'black', borderWidth: 1 }]}
                  secureTextEntry={true}
                />
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Botao
                botaoStyle={{backgroundColor: !disable ? 'black' : '#CACFD2'}}
                textoStyle={{fontSize: 17}}
                texto={"Entrar"}
                onPress={handleSubmit}
                disabled={!isValid || disable}
              />
            </View>
          </View>
         </View>
       )}
     </Formik>
   </View>
  );
}
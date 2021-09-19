import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import * as yup from 'yup'
import { Formik } from 'formik'
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../css/styles'
import Botao from '../components/Botao'
import api from '../services/api'

const schema = yup.object().shape({
  	// email: yup.string()
		// 	.email("Email inválido")
		// 	.required("Email é obrigatório"),
		// senha: yup.string()
		// 	.required("Senha é obrigatório")
})

export default function Login({navigation, route}) {

  useEffect(()=> {

  }, [])

  const checkLogged = async () => {
    if (AsyncStorage.getItem("@isLogged") == true) {
      navigation.navigate("Teste")
    }
  }

	const onSubmit = async (data) => {
    try {
      const auth = await api.post("/login/auth", {
        // email: data.email,
        // senha: data.senha
        email: "tt@gmail.com",
        senha: "123"
      })

      storeData("true");
      console.log(auth.data.message);
      navigation.navigate("Home");
      // navigation.navigate("Teste");
    } catch (error) {
      console.log(error.message);
    }
	}


  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@isLogged', value);
      console.log(await AsyncStorage.getItem('@isLogged'))
    } catch (e) {
      console.error(e);
    }
  }
  
  return (
     <View>
      <Formik
        initialValues={{ email: '', senha: '' }}
        validationSchema={schema}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, values, isValid }) => (
          <View>
            <View style={{flex: 1, alignItems: 'center', marginTop: 20, maxHeight: 13, minHeight: 13}}>
              {!!errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
              )}
              {!!errors.senha && (
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
                botaoStyle={{backgroundColor: isValid ? 'black' : '#CACFD2'}}
                textoStyle={{fontSize: 17}}
                texto={"Entrar"}
                onPress={handleSubmit}
                // disabled={!isValid}
              />
            </View>
          </View>
         </View>
       )}
     </Formik>
   </View>
  );
}

const style = StyleSheet.create({
    containerLogin: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    boxMailLogin: {
        position: "absolute",
        width: "85%",
        top: 137,
    },
    boxPasswordLogin: {
        position: "absolute",
        width: "85%",
        top: 260,
    },
    boxTextLogin: {
        fontSize: 26,
        fontStyle: "normal",
        lineHeight: 30,
        marginLeft: 12,
        fontFamily: "Roboto",
    },
    boxInsideLogin: {
        height: 50,
        marginTop: 6,
        justifyContent: "center"
    },
    boxInputLogin: {
        height: 50,
        borderColor: "#000",
        borderWidth: 2,
        paddingLeft: 15,
				borderRadius: 10,
				fontSize: 16,
    },
    buttonLogin: {
        position: "absolute",
        backgroundColor: "black",
        top: 420,
        width: "25%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
				borderRadius: 20
    },
    buttonTextLogin: {
        color: "#fff",
        fontSize: 20,
        fontFamily: 'sans-serif-light',
    }
})

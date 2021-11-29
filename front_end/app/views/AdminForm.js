import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import * as yup from "yup";
import { Formik } from 'formik';
import { showMessage } from "react-native-flash-message"
import Icon from "react-native-vector-icons/Ionicons";

import message, { testarConexao } from "../services/errors";
import styles from '../css/styles';
import api from '../services/api';
import Loading from '../components/Loading';

const schema = yup.object().shape({
  nome: yup.string()
        .required("Nome é obrigatório"),
  email: yup.string()
        .email("Email inválido")
        .required("Email é obrigatório"),
  senha: yup.string()
        .required("Senha é obrigatório")
})

export default function AdminForm({ navigation, route }) {

  const [ disable, setDisable ] = useState(false);

  const [ esconderSenha, setEsconderSenha ] = useState(true);

	const onSubmit = async (data) => {

		setDisable(true);
		
		const connection = testarConexao();
		if (!connection) {
			setDisable(false);
			return;
		}

		await api.post("/login", {
			nome: data.nome,
			email: data.email,
			senha: data.senha
		})
		.then(() => {
			showMessage({
				message: "Administrador criado com sucesso",
				type: "success"
			})

      // Se tiver acabado de criar a escola, vai pra home, se n volta pra config
      if (route.params.criando_escola) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } else {
        navigation.navigate("Config");
      }
		})
		.catch((error) => {
			console.log(error);
			message.erroDesconhecido();
      setDisable(false);
		});
	}

  return (
    <ScrollView>
      <Loading loading={disable}/>
      <Formik
				initialValues={{ nome: '', email: '', senha: '' }}
				validationSchema={schema}
				onSubmit={(values) => onSubmit(values)}
			>
				{({ handleChange, handleBlur, handleSubmit, errors, values }) => (				
					<View style={{marginTop: 10}}>
            <View style={{flex: 1, alignItems: 'center', marginBottom: 50, maxHeight: 20, minHeight: 20}}>
              { errors.nome && (
                <Text style={styles.errorMessage}>{errors.nome}</Text>
              )}
              { errors.email && (
                <Text style={styles.errorMessage}>{errors.email}</Text>
              )}
              { errors.senha && (
                <Text style={styles.errorMessage}>{errors.senha}</Text>
              )}
            </View>
            <View style={styles.formView}>
              <Text
                style={styles.formTexto}
              >
                Nome
              </Text>
            </View>
            <View style={styles.formInputView}>
              <TextInput
                onChangeText={handleChange("nome")}
                onBlur={handleBlur("nome")}
                value={values.nome}
                placeholder="Nome"
                maxLength={40}
                style={styles.formInput}
              />
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
						<View>
              <TouchableOpacity
                style={[styles.botao, { backgroundColor: !disable ? "black" : "#CACFD2" }]}
                onPress={handleSubmit}
                disabled={disable}
              >
                <Text style={styles.botaoTexto}>Cadastrar</Text>
              </TouchableOpacity>
						</View>
					</View>
				)}
      </Formik>
    </ScrollView>
  )
}

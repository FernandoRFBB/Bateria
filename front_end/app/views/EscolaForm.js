import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import * as yup from "yup";
import { Formik } from 'formik';
import { showMessage } from "react-native-flash-message"

import message, { testarConexao } from "../services/errors";
import styles from '../css/styles';
import api from '../services/api';

const schema = yup.object().shape({
  nome: yup.string()
        .required("Nome é obrigatório"),
})

export default function EscolaForm({ navigation, route }) {

  const [ disable, setDisable ] = useState(false);

	const onSubmit = async (data) => {

		setDisable(true);
		
		const connection = testarConexao();
		if (!connection) {
			setDisable(false);
			return;
		}

		await api.post("/escolas", {
			nome: data.nome
		})
		.then(() => {
			showMessage({
				message: "Escola criada com sucesso",
				type: "success"
			})
			navigation.navigate("AdminForm", {criando_escola: true});
		})
		.catch((error) => {
			console.log(error);
			message.erroDesconhecido();
		});
    setDisable(false);
	}

  return (
    <ScrollView>
      <Formik
				initialValues={{ nome: '' }}
				validationSchema={schema}
				onSubmit={(values) => onSubmit(values)}
			>
				{({ handleChange, handleBlur, handleSubmit, values, errors }) => (				
					<View style={{marginTop: "50%"}}>
            <View>
              { errors.nome && (
                <Text style={styles.errorMessage}>{errors.nome}</Text>
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
						<View>
              <TouchableOpacity
			  	      style={[styles.botao, { backgroundColor: !disable ? "black" : "#CACFD2" }]}
                onPress={handleSubmit}
                disabled={disable}
              >
                <Text style={styles.botaoTexto}>Criar</Text>
              </TouchableOpacity>
						</View>
					</View>
				)}
      </Formik>
    </ScrollView>
  )
}

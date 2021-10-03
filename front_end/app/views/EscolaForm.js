import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import * as yup from "yup";
import { Formik } from 'formik';
import { showMessage } from "react-native-flash-message"

import message, { testarConexao } from "../services/errors";
import styles from '../css/styles';
import Botao from '../components/Botao';
import api from '../services/api';

const schema = yup.object().shape({
  escola: yup.string()
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
			nome: data.escola
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
			setDisable(false);
		});
	}

  return (
    <ScrollView>
      <Formik
				initialValues={{ escola: '' }}
				validationSchema={schema}
				onSubmit={(values) => onSubmit(values)}
			>
				{({ handleChange, handleBlur, handleSubmit, values, isValid }) => (				
					<View style={{marginTop: 10}}>
						<View style={{marginBottom: 40}}>
							<View style={{marginLeft: 35, marginBottom: 4}}>
								<Text
									style={{fontSize: 18}}
								>
									Nome da Escola
								</Text>
							</View>
							<View>
								<TextInput
									onChangeText={handleChange("escola")}
									onBlur={handleBlur("escola")}
									value={values.escola}
									placeholder="Nome da Escola"
									maxLength={40}
									style={[styles.boxInput, { borderColor: 'black', borderWidth: 1 }]}
								/>
							</View>
						</View>
						<View>
              <Botao
			  	      botaoStyle={{ backgroundColor: !disable ? "black" : "#CACFD2" }}
                texto="Criar"
                onPress={handleSubmit}
                disabled={!isValid || disable}
              />
						</View>
					</View>
				)}
      </Formik>
    </ScrollView>
  )
}

import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableNativeFeedback } from 'react-native';
import * as yup from "yup";
import { Formik } from 'formik'


import styles from '../css/styles'
import Botao from '../components/Botao';

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

  const [ escola_id ] = useState(2)

	const onSubmit = (data) => {
		console.log(data);
		showMessage({
			message: "Administrador criado com sucesso",
			type: "success"
		})
		navigation.navigate("Config", { created: true })
	}

  return (
    <ScrollView>
      <Formik
				initialValues={{ nome: '', email: '', senha: '', escola_id: escola_id }}
				validationSchema={schema}
				onSubmit={(values) => onSubmit(values)}
			>
				{({ handleChange, handleBlur, handleSubmit, errors, values, isValid }) => (				
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
						<View style={{marginBottom: 20}}>
							<View style={{marginLeft: 35, marginBottom: 5}}>
								<Text
									style={{fontSize: 18}}
								>
									Nome
								</Text>
							</View>
							<View>
								<TextInput
									onChangeText={handleChange("nome")}
									onBlur={handleBlur("nome")}
									value={values.nome}
									placeholder="Nome"
									maxLength={40}
									style={[styles.boxInput, { borderColor: 'black', borderWidth: 1 }]}
								/>
							</View>
						</View>
						<View style={{marginBottom: 20}}>
							<View style={{marginLeft: 35, marginBottom: 5}}>
								<Text
									style={{fontSize: 18}}
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
                  keyboardType="email-address"
								/>
							</View>
						</View>
						<View style={{marginBottom: 40}}>
							<View style={{marginLeft: 35, marginBottom: 4}}>
								<Text
									style={{fontSize: 18}}
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
						<View>
              <Botao
			  	      botaoStyle={{ backgroundColor: isValid ? "black" : "#CACFD2" }}
                texto="Cadastrar"
                onPress={handleSubmit}
                disabled={!isValid}
              />
						</View>
					</View>
				)}
      </Formik>
    </ScrollView>
  )
}

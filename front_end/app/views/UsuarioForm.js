import React, { useState } from 'react';
import {  StyleSheet, TouchableOpacity, View, Text, ScrollView, Image, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CheckBox from "@react-native-community/checkbox";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";

import Input from "../components/Input";
import Select from "../components/Select";

// const schema = yup.object().shape({
//     nome: yup.string()
//         .required("Nome é obrigatório"),
//     cpf: yup.string()
//         .matches(/^[0-9]{11}$/, 'CPF precisa ter apenas números')
//         .required("CPF é obrigatório"),
//     telefone: yup.string()
//         .matches(/^[0-9]{8}(?:[0-9]{1})?(?:[0-9]{2})?(?:[0-9]{1})?$/, "Telefone precisa ter apenas números")
//         .required("Telefone é obrigatório"),
//     instrumento: yup.string()
//         .required("Selecione um instrumento"),
//     camisa: yup.string()
//         .required("Selecione um tamanho de camisa"),
//     calca: yup.string()
//         .required("Selecione um tamanho de calça"),
//     sapato: yup.number()
//         .typeError("Tamanho do sapato precisa ser apenas número")
//         .min(32, "Tamanho muito pequeno")
//         .max(47, "Tamanho muito grande")
//         .required("Digite um tamanho de sapato"),
// })

export default function UsuarioForm({ navigation, route }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
  });
  const [tamanhos] = useState(['P', 'M', 'G', 'GG', 'XG', 'XXG']);
  const [instrumentos] = useState([
    'Caixa',
    'Chocalho',
    'Cuica',
    'Pandeiro',
    'Repique',
    'Surdo 1',
    'Surdo 2',
    'Tamborim',
  ]);

  const onSubmit = (data) => {
    console.log(data);
    navigation.navigate(route.params.tela, { created: true });
  }

  return (
    <ScrollView>
      <View>
        <Controller
          defaultValue={route.params.uri}
          control={control}
          render={() => (
            <Image source={{ uri: route.params.uri }} style={styles.avatar} />
          )}
          name="foto"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={{ color: 'white' }}>Alterar foto</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Controller
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              error={errors.nome}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Nome"
              maxLength={40}
            />
          )}
          name="nome"
        />
      </View>
      <View>
        <Controller
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              error={errors.cpf}
              placeholder="CPF"
              maxLength={14}
              keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="cpf"
        />
      </View>
      <View>
        <Controller
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              error={errors.telefone}
              placeholder="Telefone"
              maxLength={12}
              keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="telefone"
        />
      </View>
      <View>
        <Controller
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              error={errors.instrumento}
              placeholder={{ label: 'Instrumento', value: '' }}
              onValueChange={(value) => onChange(value)}
              value={value}
              objects={instrumentos}
            />
          )}
          name="instrumento"
        />
      </View>
      <View>
        <Controller
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              error={errors.camisa}
              placeholder={{ label: 'Tamanho da camisa', value: '' }}
              onValueChange={(value) => onChange(value)}
              value={value}
              objects={tamanhos}
            />
          )}
          name="camisa"
        />
      </View>
      <View>
        <Controller
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              error={errors.calca}
              placeholder={{ label: 'Tamanho da calça', value: '' }}
              onValueChange={(value) => onChange(value)}
              value={value}
              objects={tamanhos}
            />
          )}
          name="calca"
        />
      </View>
      <View>
        <Controller
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              error={errors.sapato}
              placeholder="Tamanho do sapato"
              keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
              maxLength={2}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="sapato"
        />
      </View>
      <View>
        <Text style={styles.diretor}>O usuario é diretor?</Text>
        <Controller
          defaultValue={false}
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              <CheckBox
                value={value}
                onValueChange={(value) => onChange(value)}
                style={{ alignSelf: 'center' }}
              />
            </View>
          )}
          name="diretor"
        />
      </View>
      <View>
        <TouchableOpacity
          style={[styles.button, { marginTop: 10 }]}
          onPress={handleSubmit(onSubmit)}>
          <Text style={{ color: 'white' }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
    marginHorizontal: '20%',
    marginBottom: 20,
    padding: 10,
  },
  diretor: {
    alignSelf: 'center',
    padding: 4,
  },
  avatar: {
    width: 200,
    height: 200,
    margin: 20,
    alignSelf: 'center',
  },
});

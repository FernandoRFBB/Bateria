import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, Platform, TextInput } from "react-native";
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

const schema = yup.object().shape({
    nome: yup.string()
        .required("Nome é obrigatório"),
    cpf: yup.string()
        // .min(14, "CPF inválido")
        .required("CPF é obrigatório"),
    telefone: yup.string()
        // .min(14, "Telefone inválido")
        .required("Telefone é obrigatório"),
    instrumento: yup.string()
        .required("Selecione um instrumento"),
    tam_camisa: yup.string()
        .required("Selecione um tamanho de camisa"),
    tam_calca: yup.string()
        .required("Selecione um tamanho de calça"),
    // tam_calcado: yup.number()
        // .typeError("Tamanho do sapato precisa ser apenas número")
        // .min(32, "Tamanho muito pequeno")
        // .max(47, "Tamanho muito grande")
        // .required("Digite um tamanho de sapato"),
})

export default function UsuarioForm({ navigation, route }) {

  const [tamanhos] = useState(["P", "M", "G", "GG", "XG"]);  

  const getInstrumentos = async () => {
    try {
      var response = await api.get("/instrumentos");
      
      // COlocando 0 no final porque ele traz um array dentro de um array
      // console.log(response.data.instrumento[0]);
      setInstrumentos(response.data.instrumento[0]);
    } catch (error) {
      console.log(error.message);
    }
  }

  const [ instrumentos, setInstrumentos ] = useState([]);

  const getUsuario = async () => {
    try {
      var response = await api.get("/usuarios/" + route.params.usuario);
      setUsuario(response.data.usuario);
      setUri("http://34.67.164.46/api/usuarios/foto/" + route.params.usuario + '?' + new Date()); // Tem que colocar um codigo aleatorio do lado pra n ficar em cache a imagem, bug na hora de editar
    } catch (error) {
      console.log("Usuario: " + error);
    }
  }

  const [ usuario, setUsuario ] = useState([]);

  const [ uri, setUri ] = useState();

  useEffect(() => {
    getInstrumentos();
    if (route.params.usuario) {
      getUsuario();
    }
    console.log("uri: " + uri);
  }, []); // precisa desse array se não fica infinito carregando

  const onSubmit = async (data) => {
    try {
      data.cpf = data.cpf.replace(/\D/g, "");
      data.telefone = data.telefone.replace(/\D/g, "");

      const formData = new FormData();
      
      if (route.params.uri) {
        var picture = route.params.uri.split('/')
        picture = picture[picture.length - 1]
        console.log(picture)
        var foto = {
          uri: route.params.uri,
          type: 'image/jpeg',
          name: picture,
        }
        formData.append("foto", foto);
      }

      formData.append("nome", data.nome);
      formData.append("cpf", data.cpf);
      formData.append("telefone", data.telefone);
      formData.append("instrumento_id", data.instrumento);
      formData.append("tam_camisa", data.tam_camisa);
      formData.append("tam_calca", data.tam_calca);
      // formData.append("tam_calcado", data.tam_calcado);
      // formData.append("diretor", data.diretor === true ? 1 : 0);

      if (route.params.editar) {
        var url = "/usuarios/" + usuario.id; // Se não for assim, não funciona colocar o id do usuario na var Response
        var response = await api.put(url, formData);
        showMessage({
          message: "Usuario atualizado com sucesso",
          type: "success"
        });
      } else {
        var response = await api.post("/usuarios/", formData);
        showMessage({
          message: "Usuario criado com sucesso",
          type: "success"
        });
      }
      console.log(response);
      navigation.navigate(route.params.tela);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ScrollView>
      <Formik
        initialValues={{foto: route.params.uri ? route.params.uri : ''/* se for ver/atualizar o usuario sem mudar a foto, ela fica como '' */,
                        diretor: false, tam_camisa: route.params.usuario ? usuario.tam_camisa : "", tam_calca: route.params.usuario ? usuario.tam_calca : "",
                        /*tam_calcado: "40",*/ nome: route.params.usuario ? usuario.nome : "", cpf: route.params.usuario ? usuario.cpf : "",
                        telefone: route.params.usuario ? usuario.telefone : "", instrumento: route.params.usuario ? usuario.instrumento_id : route.params.instrumento_id }}
        enableReinitialize={true}
        validationSchema={schema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, errors, values, touched, isValid }) => (
          <View>
            <View>
              <Image source={{ uri: !route.params.uri ? uri : route.params.uri }} style={styles.previaFoto} />
              {!route.params.ver && ( // se for so visualizacao, nao precisa trocar a foto
                <Botao
                  botaoStyle={{ marginHorizontal: "20%", paddingVertical: 10 }}
                  onPress={() => route.params.editar ? navigation.navigate("PegarImagem", { tela: route.params.tela }) : navigation.goBack()}
                  texto={"Trocar foto"}
                />
              )}
            </View>
            <View style={styles.viewForm}>
              {touched.nome && errors.nome && (
                <Text style={styles.errorMessage}>{errors.nome}</Text>
              )}
              {/* { errors && console.log({errors})} */}
              <TextInput
                autoCapitalize={'words'}
                onChangeText={handleChange("nome")}
                onBlur={handleBlur("nome")}
                value={values.nome}
                // defaultValue={route.params.usuario ? usuario.nome : ""}
                placeholder={"Nome"}
                maxLength={40}
                style={styles.boxInput}
                editable={route.params.ver ? false : true}
              />
            </View>
            <View style={styles.viewForm}>
              {touched.cpf && errors.cpf && (
                <Text style={styles.errorMessage}>{errors.cpf}</Text>
              )}
              <TextInputMask
                type={'cpf'}
                value={values.cpf}
                // defaultValue={usuario.cpf}
                placeholder={"CPF"}
                onChangeText={handleChange('cpf')}
                onBlur={handleBlur("cpf")}
                style={styles.boxInput}
                editable={route.params.ver ? false : true}
              />
            </View>
            <View style={styles.viewForm}>
              {touched.telefone && errors.telefone && (
                <Text style={styles.errorMessage}>{errors.telefone}</Text>
              )}
              <TextInputMask
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                value={values.telefone}
                // defaultValue={usuario.telefone}
                placeholder={"Telefone"}
                onChangeText={handleChange('telefone')}
                onBlur={handleBlur('telefone')}
                style={styles.boxInput}
                editable={route.params.ver ? false : true}
              />
            </View>
            <View style={styles.select}>
              <Picker
                selectedValue={values.instrumento}
                onValueChange={nextValue => setFieldValue("instrumento", nextValue)}
                style={{marginRight: -30, color: route.params.ver ? 'grey' : 'black'}}
                enabled={route.params.ver ? false : true}
                > 
                  {instrumentos.map((i) =>
                    <Picker.Item key={i.id} label={i.nome} value={i.id} />
                  )}
              </Picker>
            </View>
            <View style={{paddingBottom: 10}}/>
            {touched.tam_camisa && errors.tam_camisa && (
              <Text style={styles.errorMessage}>{errors.tam_camisa}</Text>
            )}
            <View style={styles.select}>
              <Picker
                selectedValue={values.tam_camisa}
                onValueChange={nextValue => setFieldValue("tam_camisa", nextValue)}
                style={{marginRight: -30, color: values.tam_camisa === "" || route.params.ver ? 'grey' : 'black'}}
                enabled={route.params.ver ? false : true}
              >
                <Picker.Item label="Tamanho da camisa" value="" />
                {tamanhos.map((t) =>
                  <Picker.Item key={t} label={t} value={t} />
                )}
              </Picker>
            </View>
            <View style={{paddingBottom: 10}}/>
            { touched.tam_calca && errors.tam_calca && (
              <Text style={styles.errorMessage}>{errors.tam_calca}</Text>
            )}
            <View style={styles.select}>
              <Picker
                selectedValue={values.tam_calca}
                onValueChange={nextValue => setFieldValue("tam_calca", nextValue)}
                style={{marginRight: -30, color: values.tam_calca === "" || route.params.ver ? 'grey' : 'black'}}
                enabled={route.params.ver ? false : true}
                >
                  <Picker.Item label="Tamanho da calca" value="" />
                  {tamanhos.map((t) =>
                    <Picker.Item key={t} label={t} value={t} />
                  )}
              </Picker>
            </View>
            <View style={{paddingBottom: 10}}/>
            {/* <View style={styles.viewForm}>
              {touched.tam_calcado && errors.tam_calcado && (
                <Text style={styles.errorMessage}>{errors.tam_calcado}</Text>
              )}
              <TextInput
                placeholder="Tamanho do sapato"
                value={"40"}
                defaultValue={"40"}
                onChangeText={handleChange("tam_calcado")}
                onBlur={handleBlur("tam_calcado")}
                style={styles.boxInput}
                keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
                editable={route.params.ver ? false : true }
                maxLength={2}
              />
            </View> */}
            <View style={styles.viewForm}>
              <Text style={styles.diretor}>A pessoa é diretora?</Text>
              <CheckBox
                onValueChange={nextValue => setFieldValue("diretor", nextValue)}
                style={{ alignSelf: "center" }}
                value={values?.diretor}
                disabled={route.params.ver ? true : false}
              />
            </View>
            <View>
              {!route.params.ver && ( // Verificando se é so para ler as informações ou para editar / criar
                <Botao
                  botaoStyle={{ marginTop: 10, backgroundColor: isValid ? "black" : "#CACFD2" }}
                  texto={"Enviar"}
                  onPress={handleSubmit}
                  disabled={!isValid}
                />
              )}
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}


{/* <Formik
        initialValues={{foto: route.params.uri, diretor: false, tam_camisa: "", tam_calca: "", tam_calcado: "", nome: "", instrumento: 2}}
        validationSchema={schema}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, errors, values, touched }) => (
          <View>
            <View>
              <Image source={{ uri: !route.params.uri ? uri : route.params.uri }} style={styles.previaFoto} />
              {!route.params.ver && (
                <Botao
                  botaoStyle={{ marginHorizontal: "20%", paddingVertical: 10 }}
                  onPress={() => route.params.editar ? navigation.navigate("PegarImagem", { tela: route.params.tela }) : navigation.goBack()}
                  texto={"Trocar foto"}
                />
              )}
            </View>
            <View style={styles.viewForm}>
              {touched.nome && errors.nome && (
                <Text style={styles.errorMessage}>{errors.nome}</Text>
              )}
              {/* { errors && console.log({errors})} */}
      //         <TextInput
      //           autoCapitalize={'words'}
      //           onChangeText={handleChange("nome")}
      //           onBlur={handleBlur("nome")}
      //           value={values.nome}
      //           placeholder={"Nome"}
      //           maxLength={40}
      //           style={styles.boxInput}
      //           editable={route.params.ver ? false : true}
      //         />
      //       </View>
      //       <View style={styles.viewForm}>
      //         {touched.cpf && errors.cpf && (
      //           <Text style={styles.errorMessage}>{errors.cpf}</Text>
      //         )}
      //         <TextInputMask
      //           type={'cpf'}
      //           value={values.cpf}
      //           placeholder={"CPF"}
      //           onChangeText={handleChange('cpf')}
      //           onBlur={handleBlur("cpf")}
      //           style={styles.boxInput}
      //           editable={route.params.ver ? false : true}
      //         />
      //       </View>
      //       <View style={styles.viewForm}>
      //         {touched.telefone && errors.telefone && (
      //           <Text style={styles.errorMessage}>{errors.telefone}</Text>
      //         )}
      //         <TextInputMask
      //           type={'cel-phone'}
      //           options={{
      //             maskType: 'BRL',
      //             withDDD: true,
      //             dddMask: '(99) '
      //           }}
      //           value={values.telefone}
      //           placeholder={"Telefone"}
      //           onChangeText={handleChange('telefone')}
      //           onBlur={handleBlur('telefone')}
      //           style={styles.boxInput}
      //           editable={route.params.ver ? false : true}
      //         />
      //       </View>
      //       {/* <View style={styles.viewForm}>
      //         { errors.instrumento && (
      //           <Text style={styles.errorMessage}>{errors.instrumento}</Text>
      //         )}
      //         <Select
      //           placeholder={{ label: "Instrumento", value: "" }}
      //           onValueChange={handleChange("instrumento")}
      //           onBlur={handleBlur("instrumento")}
      //           value={values.instrumento}
      //           objects={instrumentos}
      //           disabled={route.params.ver ? true : false}
      //         />
      //       </View>
      //       <View style={styles.viewForm}>
      //         { errors.tam_camisa && (
      //           <Text style={styles.errorMessage}>{errors.tam_camisa}</Text>
      //         )}
      //           <Select
      //             placeholder={{ label: "Tamanho da camisa", value: "" }}
      //             onValueChange={handleChange("tam_camisa")}
      //             onBlur={handleBlur("tam_camisa")}
      //             value={values.tam_camisa}
      //             objects={tamanhos}
      //             disabled={route.params.ver ? true : false}
      //           />
      //       </View>
      //       <View style={styles.viewForm}>
      //         { errors.tam_calca && (
      //           <Text style={styles.errorMessage}>{errors.tam_calca}</Text>
      //         )}
      //         <Select
      //           placeholder={{ label: "Tamanho da calça", value: "" }}
      //           onValueChange={handleChange("tam_calca")}
      //           onBlur={handleBlur("tam_calca")}
      //           value={values.tam_calca}
      //           objects={tamanhos}
      //           disabled={route.params.ver ? true : false}
      //         />
      //       </View> */}
      //       <View>
      //         <SelectPicker
      //           selectedValue={values.tam_camisa}
      //           onValueChange={handleChange("tam_camisa")}
      //         >
      //           {tamanhos.map((tam) => 
      //           <SelectPicker.Item key={tam.id} label={tam.nome} value={tam.id} />
      //           )}
      //         </SelectPicker>
      //       </View>
      //       <View style={styles.viewForm}>
      //         {touched.tam_calcado && errors.tam_calcado && (
      //           <Text style={styles.errorMessage}>{errors.tam_calcado}</Text>
      //         )}
      //         <TextInput
      //           placeholder="Tamanho do sapato"
      //           value={values.tam_calcado}
      //           onChangeText={handleChange("tam_calcado")}
      //           onBlur={handleBlur("tam_calcado")}
      //           style={styles.boxInput}
      //           keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
      //           editable={route.params.ver ? false : true }
      //           maxLength={2}
      //         />
      //       </View>
      //       <View style={styles.viewForm}>
      //         <Text style={styles.diretor}>A pessoa é diretora?</Text>
      //         <CheckBox
      //           onValueChange={nextValue => setFieldValue("diretor", nextValue)}
      //           style={{ alignSelf: "center" }}
      //           value={values?.diretor}
      //           disabled={route.params.ver ? true : false}
      //         />
      //       </View>
      //       <View>
      //         {!route.params.ver && ( // Verificando se é so para ler as informações ou para editar / criar
      //           <Botao
      //             botaoStyle={{ marginTop: 10, backgroundColor: "black"/*isValid ? "black" : "#CACFD2"*/ }}
      //             texto={"Enviar"}
      //             onPress={handleSubmit}
      //             disabled={!isValid}
      //           />
      //         )}
      //       </View>
      //     </View>
      //   )}
      // </Formik> */}
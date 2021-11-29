import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, Platform, TextInput, TouchableOpacity } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import * as yup from "yup";
import { Formik } from "formik"
import { TextInputMask } from "react-native-masked-text"
import { showMessage } from "react-native-flash-message";
import { useIsFocused } from "@react-navigation/native"
import { Picker } from "@react-native-picker/picker"

import styles from "../css/styles"
import message, { testarConexao } from "../services/errors"
import api from '../services/api'
import Loading from "../components/Loading";

const schema = yup.object().shape({
    nome: yup.string()
        .required("Nome é obrigatório"),
    cpf: yup.string()
        .matches(/(\d{3}\.\d{3}\.\d{3}\-\d{2})|(\d{11})/, "CPF inválido")
        .required("CPF é obrigatório"),
    telefone: yup.string()
        .matches(/(\(?\d{2}?\)? ?\d{4}\d?\-?\d{4})/, "Telefone inválido")
        .required("Telefone é obrigatório"),
    instrumento: yup.string()
        .required("Selecione um instrumento"),
    tam_camisa: yup.string()
        .required("Selecione um tamanho de camisa"),
    tam_calca: yup.string()
        .required("Selecione um tamanho de calça"),
    tam_calcado: yup.number()
        .typeError("Tamanho do sapato precisa ser apenas número")
        .min(32, "Tamanho muito pequeno")
        .max(47, "Tamanho muito grande")
        .required("Digite um tamanho de sapato"),
})

export default function UsuarioForm({ navigation, route }) {

  const isFocused = useIsFocused();

  const [ tamanhos ] = useState(["P", "M", "G", "GG", "XG"]);
  const [ diretor, setDiretor ] = useState(false); // Diretor sendo marcado separado, por conta de erro
  const [ instrumentos, setInstrumentos ] = useState([]);
  const [ usuario, setUsuario ] = useState([]);
  const [ uri, setUri ] = useState("http://34.67.164.46/api/usuarios/foto/padrao");

  // Prevenindo da pessoa apertar o botao de enviar 2 vezes
  const [ disable, setDisable ] = useState(false);

  useEffect(() => {
    if (isFocused) {
      // getInstrumentos();
      if (route.params.usuario) {
        getUsuario();
      }
    }
  }, [isFocused]); // precisa desse array se não fica infinito carregando

  // const getInstrumentos = async () => {

  //   const connection = await testarConexao();
  //   if (!connection) {
  //     setDisable(false);
  //     return;
  //   }
    
  //   await api.get("/instrumentos")
  //   .then(async (response) => {
  //     // Colocando 0 no final porque ele traz um array dentro de um array
  //     console.log(response.data.instrumento[0]);
  //     await setInstrumentos(response.data.instrumento[0]);
  //   })
  //   .catch(() => {
  //     message.erroDesconhecido();
  //   });     
  // }

  const getUsuario = async () => {

    const connection = await testarConexao();
    if (!connection) {
      setDisable(false);
      return;
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    await api.get("/usuarios/" + route.params.usuario)
    .then((response) => {
      setUsuario(response.data.usuario);
      if (response.data.usuario.foto != null) {
        setUri("http://34.67.164.46/api/usuarios/foto/" + route.params.usuario + '?' + new Date()); // Tem que colocar um codigo aleatorio do lado pra n ficar em cache a imagem, bug na hora de editar
      };
      response.data.usuario.diretor ? setDiretor(true) : setDiretor(false); // Setar o diretor
    })
    .catch(() => {
      message.erroDesconhecido();
    });
  }

  const onSubmit = async (data) => {
      
    setDisable(true);

    const connection = await testarConexao();
    if (!connection) {
      setDisable(false);
      return;
    }

    data.cpf = data.cpf.replace(/\D/g, "");
    data.telefone = data.telefone.replace(/\D/g, "");

    const formData = new FormData();

    if (route.params.uri && route.params.uri != "") {
      var picture = route.params.uri.split('/')
      picture = picture[picture.length - 1]
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
    formData.append("tam_calcado", data.tam_calcado);
    formData.append("diretor", diretor === true ? "1" : "0");

    try {
      if (route.params.editar) {
        var url = "/usuarios/" + usuario.id; // Se não for assim, não funciona colocar o id do usuario na var Response
        await api.put(url, formData)
        showMessage({
          message: "Usuario atualizado com sucesso",
          type: "success"
        });
      } else {
        await api.post("/usuarios/", formData);
        showMessage({
          message: "Usuario criado com sucesso",
          type: "success"
        });
      }

      setDisable(false);
      navigation.navigate(route.params.tela, { instrumento_id: data.instrumento, instrumentos: route.params.instrumentos });

    } catch (error) {
      setDisable(false);

      // Separando para poder pegar o status code do erro
      var temp = error.message.split(" ");

      // Pegando a ultima palavra do array, que é o status code
      temp = temp[temp.length - 1];

      if (temp == "409") {
        showMessage({
          message: "CPF já está cadastrado",
          type: "danger"
        })
      } else {
        message.erroDesconhecido();
      }      
    }
  }

  return (
    <ScrollView>
      <Loading loading={disable}/>
      <Formik
        initialValues={{foto: route.params.uri ? route.params.uri : ''/* se for ver/atualizar o usuario sem mudar a foto, ela fica como '' */,
                        diretor: route.params.usuario ? usuario.diretor : false, tam_camisa: route.params.usuario ? usuario.tam_camisa : "", tam_calca: route.params.usuario ? usuario.tam_calca : "",
                        tam_calcado: route.params.usuario ? usuario.tam_calcado : "", nome: route.params.usuario ? usuario.nome : "", cpf: route.params.usuario ? usuario.cpf : "",
                        telefone: route.params.usuario ? usuario.telefone : "", instrumento: route.params.usuario ? usuario.instrumento_id : route.params.instrumento_id }}
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, errors, values, touched }) => (
          <View>
            <View>
              <Image source={{ uri: !route.params.uri ? uri : route.params.uri }} style={styles.previaFoto} />
              {!route.params.ver && ( // se for so visualizacao, nao precisa trocar a foto
                <TouchableOpacity
                  style={styles.botao}
                  onPress={() => navigation.navigate("PegarImagem",
                  { tela: route.params.tela, instrumento_id: route.params.instrumento_id, usuario: route.params.usuario, editar: route.params.editar, instrumentos: route.params.instrumentos }
                )}>
                  <Text style={styles.botaoTexto}>Trocar foto</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.viewForm}>
              {touched.nome && errors.nome && (
                <Text style={styles.errorMessage}>{errors.nome}</Text>
              )}
              <TextInput
                autoCapitalize={'words'}
                onChangeText={handleChange("nome")}
                onBlur={handleBlur("nome")}
                value={values.nome}
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
                type={"cpf"}
                value={values.cpf}
                placeholder={"CPF"}
                onChangeText={handleChange("cpf")}
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
                type={"cel-phone"}
                options={{
                  maskType: "BRL",
                  withDDD: true,
                  dddMask: "(99) "
                }}
                value={values.telefone}
                placeholder={"Telefone"}
                onChangeText={handleChange("telefone")}
                onBlur={handleBlur("telefone")}
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
                  {route.params.instrumentos.map((i) => {
                    return (
                    <Picker.Item key={i.id} label={i.nome} value={i.id} />
                  )})}
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
            <View style={styles.viewForm}>
              {touched.tam_calcado && errors.tam_calcado && (
                <Text style={styles.errorMessage}>{errors.tam_calcado}</Text>
              )}
              <TextInput
                placeholder="Tamanho do sapato"
                value={values.tam_calcado}
                onChangeText={handleChange("tam_calcado")}
                onBlur={handleBlur("tam_calcado")}
                style={styles.boxInput}
                keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
                editable={route.params.ver ? false : true }
                maxLength={2}
              />
            </View>
            <View style={styles.viewForm}>
              <Text style={styles.diretor}>A pessoa é diretora?</Text>
              <CheckBox
                onValueChange={() => setDiretor(!diretor)}
                style={{ alignSelf: "center" }}
                value={diretor}
                disabled={route.params.ver ? true : false}
              />
            </View>
            <View style={{marginTop: 10}}>
              {!route.params.ver && ( // Verificando se é so para ler as informações ou para editar / criar
                <TouchableOpacity
                  style={[styles.botao, { backgroundColor: !disable ? "black" : "#CACFD2" }]}
                  onPress={handleSubmit}
                  disabled={disable}
                >
                  <Text style={styles.botaoTexto}>Enviar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}
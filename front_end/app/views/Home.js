import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { showMessage } from "react-native-flash-message"

// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";
import { Button, Card, FAB, Title } from "react-native-paper";

import Input from "../components/Input";

// const schema = yup.object().shape({
    // limite: yup.number()
    //     .typeError("Limite precisa ser numero")
    //     .min(0, "Tamanho muito pequeno")
    //     .max(200, "Tamanho muito grande")
    //     .required("Nome é obrigatório")
// })

export default function Home({ navigation, route }) {
  const [ instrumentos ] = useState([
    {
      id: 0,
      nome: "Caixa",
    },
    {
      id: 1,
      nome: "Chocalho",
    },
    {
      id: 2,
      nome: "Cuica",
    },
    {
      id: 3,
      nome: "Pandeiro",
    },
    {
      id: 4,
      nome: "Repique",
    },
    {
      id: 5,
      nome: "Surdo 1",
    },
    {
      id: 6,
      nome: "Surdo 2",
    },
    {
      id: 7,
      nome: "Tamborim",
    },
  ]);
  const [ mudarLimite, setMudarLimite ] = useState(false);
  const [ limite, setLimite ] = useState("");
  const { control, handleSubmit, errors } = useForm({
        // resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    console.log(data);
    setMudarLimite(false);
  }

  return (
    <View>
      <ScrollView>
        {instrumentos.map((i) =>
        <View>
          <Title style={{alignSelf: "center", marginTop: 10}}>{i.nome}</Title>
          <Text style={{alignSelf: "center"}} onPress={() => {setMudarLimite(true); setLimite(40)}}>Limite: 40</Text>
          <Text style={{alignSelf: "center", color: "red", marginBottom: 10,}}>Faltam 4 pessoas</Text>
          <Card style={{ marginBottom: 20, marginHorizontal: 20}}>
            <Card.Cover source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Repique.JPG" }} />
            <Card.Actions style={{alignSelf: "center"}}>
              <Button
                onPress={() => navigation.navigate("Tabela",
                  { instrumento_id: i.id, instrumento: i.nome })}
              >
                Mais informações
              </Button>
            </Card.Actions>
          </Card>
        </View>
        )}
      </ScrollView>
      <Modal 
        animationType="fade"
        transparent={true}
        visible={mudarLimite}
        onRequestClose={() => {setMudarLimite(false)}}
      >
        <View style={styles.centerView}>
          <View style={styles.modalView}>
            <Title style={{alignSelf: "center"}}>Limite:</Title>
            <Controller
              defaultValue="40"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  keyboardType={Platform.OS === 'ios'? "number-pad" : "numeric" }
                  maxLength={3}
                />
              )}
              name="limite"
            />
            <TouchableOpacity style={[styles.button, {marginTop: 10}]}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={{color: "white"}}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("PegarImagem",
          { instrumento: "", tela: "Home" })}
      />
      {route.params?.created &&
        showMessage({
          message: "Usuario criado com sucesso",
          type: "success"
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  button: {
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 10,
    marginHorizontal: "20%",
    marginBottom: 20,
    padding: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});
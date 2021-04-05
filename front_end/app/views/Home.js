import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, Modal, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { showMessage, hideMessage } from "react-native-flash-message";
import { FAB, Card, Button, Title } from "react-native-paper";

export default function Home({ navigation, route }) {
  const [ instrumentos ] = useState([
        'Caixa', 'Chocalho', 'Cuica', 'Pandeiro', 'Repique', 'Surdo 1', 'Surdo 2', 'Tamborim'
    ]);
  const [ modalLimite, setModalLimite ] = useState(false);
  const [ limite, setLimite ] = useState("")
  return (
    <View>
      <ScrollView>
        {instrumentos.map(i =>
        <View>
          <Title style={{alignSelf: "center", marginTop: 10}}>{i}</Title>
          <Text style={{alignSelf: "center"}} onPress={() => {
            setModalLimite(true);
            setLimite(40);
            }}>Limite: 40</Text>
          <Text style={{alignSelf: "center", color: "red", marginBottom: 10,}}>Faltam 4 pessoas</Text>
          <Card style={{ marginBottom: 20, marginHorizontal: 20}}>
            <Card.Cover source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Repique.JPG" }} />
            <Card.Actions style={{alignSelf: "center"}}>
              <Button onPress={() => navigation.navigate("Info", {instrumento: i})}>Mais informações</Button>
            </Card.Actions>
          </Card>
        </View>
        )}
      </ScrollView>
      <Modal
      animationType="fade"
      transparent={true}
      visible={modalLimite}
      onRequestClose={() => setModalLimite(false)}
      >
        <View style={styles.modalView}>
          <Title style={{alignSelf: "center"}}>Limite:</Title>
          <TextInput style={{alignSelf: "center"}}>{limite}</TextInput>
        </View>
        
      </Modal>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("PegarImagem")}
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
    elevation: 5,
  }
});

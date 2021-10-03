import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity, Platform, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from "./app/views/Home";
import PegarImagem from "./app/views/PegarImagem";
import Tabela from "./app/views/Tabela";
import UsuarioForm from "./app/views/UsuarioForm";
import Quantidade from './app/views/Quantidade';
import Login from "./app/views/Login";
import Config from "./app/views/Config";
import AdminForm from "./app/views/AdminForm";
import Teste from "./app/views/Teste";
import Loading from "./app/views/Loading";
import EscolaForm from "./app/views/EscolaForm";

const Stack = createStackNavigator();
 
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Loading" component={Loading} options={{title: false}} />
        <Stack.Screen name="Login" component={Login} options={({ navigation }) => ({
          title: "Login",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("EscolaForm")}
              style={{padding: 20}}
            >
              <Text>Criar Escola</Text>
            </TouchableOpacity>
          )
        })} />
        <Stack.Screen name="Home" component={Home} options={({ navigation }) => ({
          title: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Quantidade")}
              style={{padding: 20}}
            >
              <Icon
                name="shirt-outline"
                size={25}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Config")}
              style={{padding: 20}}
            >
              <Icon
                name={Platform.OS === 'ios' ? 'ios-options' : 'options'}
                size={30}
              />
            </TouchableOpacity>
          )
        })} />
        <Stack.Screen name="UsuarioForm" component={UsuarioForm} options={{title: "Adicionar usuario"}} />
        <Stack.Screen name="PegarImagem" component={PegarImagem} options={{title: false}} />
        <Stack.Screen name="Tabela" component={Tabela} options={({ route }) => ({ title: route.params.instrumento })} />
        <Stack.Screen name="Quantidade" component={Quantidade} options={{title: "Fantasias"}} />
        <Stack.Screen name="Config" component={Config} options={{title: "Configurações"}} />
        <Stack.Screen name="AdminForm" component={AdminForm} options={{title: "Adicionar admin"}} />
        <Stack.Screen name="EscolaForm" component={EscolaForm} options={{title: "Criar escola"}} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

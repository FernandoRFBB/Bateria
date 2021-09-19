import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity, Platform } from 'react-native';

import Home from "./app/views/Home";
import PegarImagem from "./app/views/PegarImagem";
import Tabela from "./app/views/Tabela";
import UsuarioForm from "./app/views/UsuarioForm";
import Quantidade from './app/views/Quantidade';
import Login from "./app/views/Login";
import Config from "./app/views/Config";
import AdminForm from "./app/views/AdminForm";
import Teste from "./app/views/Teste";
import Auth from "./app/views/Auth";



const Stack = createStackNavigator();
 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
        <Stack.Screen name="Login" component={Login} options={{title: "Login"}} />
        <Stack.Screen name="Config" component={Config} options={{title: "Configurações"}} />
        <Stack.Screen name="AdminForm" component={AdminForm} options={{title: "Adicionar admin"}} />
        <Stack.Screen name="Teste" component={Teste} options={{title: "TESTE"}} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
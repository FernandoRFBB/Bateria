import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";

import Home from "./app/views/Home";
import PegarImagem from "./app/views/PegarImagem";
import Tabela from "./app/views/Tabela";
import UsuarioForm from "./app/views/UsuarioForm";

const Stack = createStackNavigator();
 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UsuarioForm" component={UsuarioForm} options={{title: "Adicionar usuario"}} />
        <Stack.Screen name="PegarImagem" component={PegarImagem} options={{title: false}} />
        <Stack.Screen name="Tabela" component={Tabela} options={({ route }) => ({ title: route.params.instrumento })} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
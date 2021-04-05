import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";

import UsuarioForm from "./app/views/UsuarioForm";
import Home from "./app/views/Home";
import PegarImagem from "./app/views/PegarImagem";

const Stack = createStackNavigator();
 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UsuarioForm" component={UsuarioForm} options={{title: "Adicionar usuario"}} />
        <Stack.Screen name="PegarImagem" component={PegarImagem} options={{title: false}} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
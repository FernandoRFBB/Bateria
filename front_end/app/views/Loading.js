import React, { useEffect, useState } from "react"
import { View } from "react-native"

import api from '../services/api';

export default function Loading ({navigation, route}) {

	useEffect(() => {
		isLogged();
	}, [])

  // Verifica se esta logado, se estiver vai para home se não vai para login
	const isLogged = async () => {

    await api.get("/login/isLogged")
    .then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    })
    .catch(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    });
	}

  return (
    <View>
    </View>
  )
}
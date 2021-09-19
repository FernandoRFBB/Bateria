import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react"
import { View, StatusBar, ActivityIndicator } from "react-native"

export default function Auth ({navigation, route}) {

  useEffect(() => {
		isAuth();
  }, []);

	const isAuth = async () => {
		const userToken = await AsyncStorage.getItem("userLogged");

		// Verifica se o usuario esta logado, se sim para home se não ele vai para login
		navigation.navigate(userLogged ? "Home" : "Login");
	}
  return (
    <View>
			<ActivityIndicator/>
			<StatusBar barStyle="default" />
    </View>
  )
}
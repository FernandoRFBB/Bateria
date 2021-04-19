import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from "expo-image-picker"

export default function PegarImagem({ navigation, route }) {
    const [image, setImage] = useState(null);

    const pegarImagemGaleria = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (granted) {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

          if (!result.cancelled) {
              console.log(result.uri);
              setImage(result.uri);
          }
        } else {
          Alert.alert("Você precisa nos dar permissão para funcionar");
        }
    }
    const pegarImagemCamera = async () => {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (granted) {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        })
        
        if (!result.cancelled) {
          console.log(result.uri);
          setImage(result.uri);
        }
      } else {
        Alert.alert("Você precisa nos dar permissão para funcionar");
      }
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={pegarImagemGaleria}>
          <Text style={styles.buttonText}>Escolher imagem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pegarImagemCamera}>
          <Text style={styles.buttonText}>Abrir Camera</Text>
        </TouchableOpacity>
        {image &&
          <View>
            <Image source={{ uri: image }} style={styles.avatar}/>
            <TouchableOpacity style={styles.button}
              onPress={() => navigation.navigate("UsuarioForm",
                { uri: image, instrumento: route.params.instrumento, tela: route.params.tela })}
            >
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-around',
      flexDirection: 'row',
      flexWrap: "wrap",
    },
    button: {
      width: 150,
      height: 50,
      borderRadius: 3,
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginTop: 40,
    },
    buttonText: {
      color: '#fff'
    },
    avatar: {
      width: 200,
      height: 200,
      margin: 20,
    }
})
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from "expo-image-picker"

import styles from '../css/styles'
import api from '../services/api';

export default function PegarImagem({ navigation, route }) {
    const [image, setImage] = useState(null);

    const pegarImagemGaleria = async () => {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (granted) {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 4],
          quality: 1,
        })

        if (!result.cancelled) {
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
          aspect: [3, 4],
          quality: 1,
        })
        
        if (!result.cancelled) {
          setImage(result.uri);
        }
        
      } else {
        Alert.alert("Você precisa nos dar permissão para funcionar");
      }
    }
    
    const onSubmit = () => {
        navigation.navigate("UsuarioForm", { uri: image, instrumento_id: route.params.instrumento_id, tela: route.params.tela });
    }

    return (
      <View style={styles.containerImg}>
        <TouchableOpacity style={styles.buttonBig} onPress={pegarImagemGaleria}>
          <Text style={styles.botaoTexto}>Escolher imagem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBig} onPress={pegarImagemCamera}>
          <Text style={styles.botaoTexto}>Abrir Camera</Text>
        </TouchableOpacity>
        {image &&
          <View>
            <Image source={{ uri: image }} style={styles.previaFoto}/>
            <TouchableOpacity style={styles.buttonBig}
              onPress={onSubmit}
            >
              <Text style={styles.botaoTexto}>Enviar</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
}

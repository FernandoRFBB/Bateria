import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../css/styles'

export default function Quantidade() {
  
  const [ tamanhos ] = useState([
    {
      tipo: "camisa",
      tamanho: "P",
      quantidade: "10"
    },
    {
      tipo: "camisa",
      tamanho: "M",
      quantidade: "20"
    },
    {
      tipo: "camisa",
      tamanho: "G",
      quantidade: "30"
    },
    {
      tipo: "calca",
      tamanho: "P",
      quantidade: "10"
    },
    {
      tipo: "calca",
      tamanho: "M",
      quantidade: "20"
    },
    {
      tipo: "calca",
      tamanho: "G",
      quantidade: "30"
    },
    {
      tipo: "sapato",
      tamanho: "38",
      quantidade: "10"
    },
    {
      tipo: "sapato",
      tamanho: "37",
      quantidade: "10"
    },
    {
      tipo: "sapato",
      tamanho: "39",
      quantidade: "10"
    },
    {
      tipo: "sapato",
      tamanho: "40",
      quantidade: "10"
    },
    {
      tipo: "sapato",
      tamanho: "41",
      quantidade: "10"
    },

  ]);

  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <Text style={styles.textTitle}>Camisa</Text>
        <View style={styles.insideView}>
          <View style={styles.imageView}>
            <Image source={{ uri: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=658&q=80" }} style={styles.imgRoupa}/>
          </View>
          <View style={styles.infoView}>
            <View style={styles.tamView}>
              <Text style={styles.tamText}>
                P
              </Text>
              <Text style={styles.tamText}>
                M
              </Text>
              <Text style={styles.tamText}>
                G
              </Text>
              <Text style={styles.tamText}>
                GG
              </Text>
            </View>
            <View style={styles.qtdView}>
              <Text style={styles.qtdText}>
                10
              </Text>
              <Text style={styles.qtdText}>
                20
              </Text>
              <Text style={styles.qtdText}>
                6
              </Text>
              <Text style={styles.qtdText}>
                3
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.middleView}>
        <Text style={styles.textTitle}>Calça</Text>
        <View style={styles.insideView}>
          <View style={styles.imageView}>
            <Image source={{ uri: "https://static.netshoes.com.br/produtos/camisa-paris-saint-germain-home-2021-sn-torcedor-nike-masculina/36/HZM-3772-036/HZM-3772-036_zoom1.jpg?ts=1594142814&ims=544x" }} style={styles.imgRoupa}/>
          </View>
          <View style={styles.infoView}>
            <View style={styles.tamView}>
              <Text style={styles.tamText}>
                P
              </Text>
              <Text style={styles.tamText}>
                M
              </Text>
              <Text style={styles.tamText}>
                G
              </Text>
              <Text style={styles.tamText}>
                GG
              </Text>
            </View>
            <View style={styles.qtdView}>
              <Text style={styles.qtdText}>
                10
              </Text>
              <Text style={styles.qtdText}>
                20
              </Text>
              <Text style={styles.qtdText}>
                6
              </Text>
              <Text style={styles.qtdText}>
                3
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.textTitle}>Sapato</Text>
        <View style={styles.insideView}>
          <View style={styles.imageView}>
            <Image source={{ uri: "https://static.netshoes.com.br/produtos/camisa-paris-saint-germain-home-2021-sn-torcedor-nike-masculina/36/HZM-3772-036/HZM-3772-036_zoom1.jpg?ts=1594142814&ims=544x" }} style={styles.imgRoupa}/>
          </View>
          <View style={styles.infoView}>
            <View style={styles.tamView}>
              <Text style={styles.tamText}>
                P
              </Text>
              <Text style={styles.tamText}>
                M
              </Text>
              <Text style={styles.tamText}>
                G
              </Text>
              <Text style={styles.tamText}>
                GG
              </Text>
            </View>
            <View style={styles.qtdView}>
              <Text style={styles.qtdText}>
                10
              </Text>
              <Text style={styles.qtdText}>
                20
              </Text>
              <Text style={styles.qtdText}>
                6
              </Text>
              <Text style={styles.qtdText}>
                3
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
      
  );
}
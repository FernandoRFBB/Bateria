import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../css/styles'

import api from "../services/api";
import message, { testarConexao } from "../services/errors"

export default function Quantidade() {
  
  const [ tamanhos ] = useState(["P", "M", "G", "GG", "XG"]);

  const [ camisa, setCamisa ] = useState([]);
  const [ calca, setCalca ] = useState([]);
  const [ calcado, setCalcado ] = useState([]);

  const getTamanhos = async () => {

    const connection = await testarConexao();
    if (!connection) {
      return;
    }

    await api.get("/escolas/tamanhos")
    .then(async (response) => {
      setCamisa(response.data.camisa);
      setCalca(response.data.calca);
      setCalcado(response.data.calcado);
    })
    .catch((error) => {
      console.log(error);
    })

  }

  useEffect(() => {
    getTamanhos();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.textTitle}>Camisa</Text>
        <View style={styles.insideView}>
          <View style={styles.imageView}>
            <Image source={{ uri: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=658&q=80" }} style={styles.imgRoupa}/>
          </View>
          <View style={{flex: 1}}>
            {camisa.map((t) =>
              <View key={t.tam_camisa} style={styles.tamLinha}>
                <Text style={styles.tamTexto}>
                  {t.tam_camisa}
                </Text>
                <Text style={styles.qtdTexto}>
                  {t.qtd}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.middleView}>
        <Text style={styles.textTitle}>Calça</Text>
        <View style={styles.insideView}>
          <View style={styles.imageView}>
            <Image source={{ uri: "https://static.netshoes.com.br/produtos/camisa-paris-saint-germain-home-2021-sn-torcedor-nike-masculina/36/HZM-3772-036/HZM-3772-036_zoom1.jpg?ts=1594142814&ims=544x" }} style={styles.imgRoupa}/>
          </View>
          <View style={{flex: 1}}>
            {calca.map((t) =>
              <View key={t.tam_calca} style={styles.tamLinha}>
                <Text style={styles.tamTexto}>
                  {t.tam_calca}
                </Text>
                <Text style={styles.qtdTexto}>
                  {t.qtd}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.textTitle}>Calçado</Text>
        <View style={styles.insideView}>
          <View style={styles.imageView}>
            <Image source={{ uri: "https://static.netshoes.com.br/produtos/camisa-paris-saint-germain-home-2021-sn-torcedor-nike-masculina/36/HZM-3772-036/HZM-3772-036_zoom1.jpg?ts=1594142814&ims=544x" }} style={styles.imgRoupa}/>
          </View>
          <View style={{flex: 1}}>
            {calcado.splice(0, Math.round(calcado.length / 2)).map((t) =>
              <View key={t.tam_calcado} style={styles.tamLinha}>
                <Text style={styles.tamTexto}>
                  {t.tam_calcado}
                </Text>
                <Text style={styles.qtdTexto}>
                  {t.qtd}
                </Text>
              </View>
            )}
            {calcado.splice(Math.round(calcado.length / 2)).map((t) =>
              <View key={t.tam_calcado} style={styles.tamLinha}>
                <Text style={styles.tamTexto}>
                  {t.tam_calcado}
                </Text>
                <Text style={styles.qtdTexto}>
                  {t.qtd}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
      
  );
}
import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 50
      },
      topView: {
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        flex: 1,
        alignItems: "center"
      },
      middleView: {
        flex: 1,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        marginTop: 20,
      },
      bottomView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20,
      },
      textTitle: {
        fontWeight: "bold",
        fontSize: 20,
      },
      insideView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 10,
      },
      imageView: {
        flex: 1,
        justifyContent: "center",
      },
      imgRoupa: {
          width: 80,
          height: 80,
          alignSelf: "center",
          borderWidth: 1,
          borderColor: "gray"
      },
      infoView: {
        flex: 1,
        flexDirection: "row",
      },
      qtdView: {
        marginLeft: 30
      },
      qtdText: {
        alignSelf: "center"
      },
      containerTabela: {
        flex: 1,
        padding: 16,
      },
      header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        maxHeight: 30,
        minHeight: 20,
        paddingBottom: 20,
      },
      linha: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        maxHeight: 50,
        minHeight: 50,
        alignItems: "center",
      },
      primeiraColuna: {
        flex: 1,
        marginLeft: 10,
      },
      restoColunas: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 10,
        marginLeft: -50
      },
      textoColuna: {
        alignSelf: "center"
      },
      textoTituloColuna: {
        alignSelf: "center",
        fontWeight: "bold"
      },
      textoTitulo: {
        fontWeight: "bold",
      },
      col: {
        flex: 1,
      },
      paginacao: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: 10
      },
      textoPaginacao: {
        alignSelf: "center"
      },
      botaoPaginacao: {
        padding: 10,
      },
      fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
      },
      fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
      },
      botao: {
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: 10,
        marginHorizontal: "30%",
        paddingVertical: 15,
        marginBottom: 20,
        padding: 10,
        // marginTop: 30, backgroundColor: 'black', borderRadius: 100, padding: 15, marginHorizontal: "35%"
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 50,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      diretor: {
        alignSelf: 'center',
        padding: 4,
      },
      containerImg: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: "wrap",
        marginBottom: 50
      },
      buttonBig: {
        width: 150,
        height: 50,
        borderRadius: 3,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 40,
        borderRadius: 10,
      },
      botaoTexto: {
        color: 'white',
        fontSize: 16
      },
      previaFoto: {
        width: 200,
        height: 200,
        margin: 20,
        alignSelf: 'center'
      },
      boxInput: {
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 16,
        marginHorizontal: 20,
        marginTop: 2,
        // marginBottom: 8,
        fontSize: 16,
        paddingRight: 0,
        marginRight: 0,
      },
      errorMessage: {
        color: "red",
        marginHorizontal: 30,
        marginBottom: 2,
      },
      viewForm: {
        paddingBottom: 10,
      },
      modalTextI: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        padding: 16,
        marginHorizontal: 50,
        marginTop: 2,
        marginBottom: 8,
        fontSize: 16,
      },
      containerConfig: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 50
      },
      limiteText: {
        alignSelf: "center"
      },
      tabelaOp: {
        flex: 1,
        height: 80,
        backgroundColor: "#cfcfcf",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        
      },
      select: {
        fontSize: 16,
        // paddingHorizontal: 10,
        // paddingVertical: 1,
        // padding: 12,
        paddingHorizontal: 9,
        borderWidth: 0.5,
        borderColor: "gray",
        borderRadius: 8, 
        color: "black",
        marginTop: 2,
        marginBottom: 8,
        paddingVertical: 5,
        marginHorizontal: "5%",
        paddingRight: 30, // to ensure the text is never behind the icon
      },
      tamLinha: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 20,
      },
      tamTexto: {
        width: 20,
      },
      qtdTexto: {
        marginLeft: 25,
      },
      formTexto: {
        fontSize: 20
      },
      formView: {
        marginLeft: 32,
        marginBottom: 5
      },
      formInput: {
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 16,
        fontSize: 16,
        paddingRight: 0,
        marginRight: 0,
        flex: 1,
        borderWidth: 0
      },
      formInputView: {
        flex: 1,
        flexDirection: "row",
        minHeight: 60,
        justifyContent: "center",
        marginBottom: 30,
        borderWidth: 1,
        borderColor: "black",
        marginHorizontal: 20,
        borderRadius: 10
      },
      iconSenha: {
        alignSelf: 'center',
        marginHorizontal: 20,
        marginTop: 20
      },
      limiteInput: {
        borderColor: 'black',
        borderWidth: 0.5,
        paddingHorizontal: 70,
        fontSize: 20,
        paddingVertical: 10,
        marginTop: 10,
        marginBottom: 20
      },
      limiteBotao: {
        backgroundColor: 'black',
        paddingVertical: 10,
        borderRadius: 20
      },
      limiteBotaoTexto: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16
      },
      cardTitulo: {
        alignSelf: "center",
        marginTop: 10
      },
      cardQtdPessoas: {
        alignSelf: "center",
        marginBottom: 10,
        color: "red"
      },
      card: {
        marginHorizontal: 20,
        marginBottom: 20
      },
      deletarBotao: {
        backgroundColor: 'black',
        width: 80,
        height: 40,
        alignItems: 'center',
        marginHorizontal: 40,
        paddingTop: 10,
        borderRadius: 5
      },
      deletarView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 30,
        paddingBottom: 40
      },
      configBotao: {
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: 10,
        paddingVertical: 15,
        marginBottom: 20,
        marginTop: 10,
        marginHorizontal: "25%"
      }
})

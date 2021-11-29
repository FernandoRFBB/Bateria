import React, { useEffect, useState } from "react"
import { ActivityIndicator, Modal, View } from "react-native"

export default function Loading (props) {
  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={props.loading}
      onRequestClose={() => {console.log('close modal')}}
    >
      <View style={{flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'}}
      >
        <View>
          <ActivityIndicator
            animating={props.loading}
            color={"black"}
            size={"large"}
          />
        </View>
      </View>
    </Modal>
  )
}
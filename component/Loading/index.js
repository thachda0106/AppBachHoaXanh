import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoadingImage from '../../assets/img/tien/loading_img.gif'
import LoadingBarImage from '../../assets/img/tien/loading_img_2.gif'

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image source={LoadingImage} style={styles.loadingImg} />
      <Image source={LoadingBarImage} style={[styles.loadingImg, {width: 60, height: 60, marginTop: -48}]} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 200
    },
    loadingImg:{
        width: 240,
        height: 240,
        resizeMode: 'contain',
        marginTop: -100
    }
})
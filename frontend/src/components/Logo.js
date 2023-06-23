import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Logo = () => {
  return (
    <Image 
      style={styles.image}
      source={require('../../assets/nec_logo.jpeg')} 
    />
  )
}

export default Logo

const styles = StyleSheet.create({
  image: {
    width: '80%',
    resizeMode: 'contain'
  },
})
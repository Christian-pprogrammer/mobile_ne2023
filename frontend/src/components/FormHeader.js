import { FontAwesome } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Logo from './Logo'
import { COLORS } from '../utils/constants'

const FormHeader = ({navigation}) => {
  return (
    <View style={styles.container}>  
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 30,
          left: 30
        }}
        onPress={()=>navigation.goBack()}
      >
        <FontAwesome name="angle-left" size={40} color={COLORS.LIGHT} />
      </TouchableOpacity>
      <View style={styles.logo}>
        <Logo />
      </View>
    </View>
  )
}

export default FormHeader

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    position: 'relative'
  },
  logo: {
    width: '50%',
    alignItems: 'center',
  }
})
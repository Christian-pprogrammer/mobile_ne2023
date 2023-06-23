import { FontAwesome5, AntDesign, Feather } from '@expo/vector-icons'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../utils/constants'

const Button = ({text, onPress, bg, color}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={[styles.button, {backgroundColor: bg}]}>
        <Text style={[{color: color}, styles.text]}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    width: '100%'
  },
  button: {
    padding: 12,
    paddingHorizontal: 15,
    borderRadius: 50,
    width: '100%',

  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  }

})
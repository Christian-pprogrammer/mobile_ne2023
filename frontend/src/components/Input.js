import { FontAwesome5, AntDesign, Feather } from '@expo/vector-icons'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { COLORS } from '../utils/constants'

const Input = ({secure, value, onChangeText, iconName, hidden, placeholder, style, keyboardType}) => {
  return (
    <View style={[styles.container, style]}>
      <FontAwesome5 name={iconName} size={20} color={COLORS.SECONDARY} />
      <TextInput 
        secureTextEntry={secure}
        style={[styles.input]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={(value)=>onChangeText(value)}
      />
      {
        secure && (
          <>
          {
            hidden ? <AntDesign name='eyeo' size={20} color={COLORS.SECONDARY} />:
              <Feather name="eye-off" size={20} color={COLORS.SECONDARY} />
          }
        </>
        ) 
      }
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingHorizontal: 15,
    borderRadius: 50,
    borderColor: COLORS.SECONDARY,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 5,
  },
  input: {
    fontSize: 18,
    flex: 1
  }
})
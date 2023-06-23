import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../utils/constants'

const ErrorText = ({errorMsg}) => {
  return (
    <Text style={styles.msg}>{errorMsg}</Text>
  )
}

export default ErrorText

const styles = StyleSheet.create({
  msg: {
    color: COLORS.DANGER,
    fontSize: 15,
    marginLeft: 15,
    marginBottom: 10
  }
})
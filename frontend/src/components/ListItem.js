import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../utils/constants'

const ListItem = ({title}) => {
  return (
    <View style={
      styles.container
    }>
      <Text style={
        styles.title
      }>{title}</Text>
    </View>
  )
}

export default ListItem

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: COLORS.PRIMARY,
    marginVertical: 10,
  },
  title: {
    color: COLORS.LIGHT,
    fontSize: 18,
    textAlign: 'center'
  }
})
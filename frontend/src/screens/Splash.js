import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../utils/constants'
import Button from '../components/Button'
import Logo from '../components/Logo'

const Splash = ({navigation}) => {

  const generateToken = () => {
    navigation.navigate("GenerateToken");
  }

  const checkValidity = () => {
    navigation.navigate("Validity")
  }

  const checkTokens = () => {
    navigation.navigate("Tokens");
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Welcome to EUCL app</Text>
         <Text style={styles.intro}> 
          This application is to be used in generating prepaid tokens for EUCL clients
        </Text>
      </View>

      <Logo />

      <View style={{width: '100%'}}>
        <Button 
          onPress={()=>generateToken()}
          text="GENERATE TOKEN" 
          bg={COLORS.LIGHT} 
          color={COLORS.PRIMARY} />
        <View>
          <Text style={styles.member}>OR</Text>
          <TouchableOpacity
            onPress={()=>checkValidity()}
          >
            <Text style={styles.signin}>Check token validity</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.member}>OR</Text>
          <TouchableOpacity
            onPress={()=>checkTokens()}
          >
            <Text style={styles.signin}>Check all tokens by meter</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.LIGHT,
    opacity: .9
  },
  intro: {
    textAlign: 'center',
    fontSize: 17,
    color: COLORS.LIGHT,
    marginTop: 30,
    opacity: .9
  },


  member: {
    fontSize: 15,
    textAlign: 'center',
    color: COLORS.LIGHT,
    opacity: .5,
    marginTop: 30,
    marginBottom: 5
  },
  signin: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.LIGHT
  }
  
})
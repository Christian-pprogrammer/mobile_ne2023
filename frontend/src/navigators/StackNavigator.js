import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Splash from '../screens/Splash';
import GenerateToken from '../screens/GenerateToken';
import AddCandidate from '../screens/AddCandidate';
import Validity from '../screens/Validity';
import Tokens from '../screens/Tokens';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='Splash' component={Splash} />
      <Stack.Screen name='GenerateToken' component={GenerateToken} />
      <Stack.Screen name='Validity' component={Validity} />
      <Stack.Screen name='AddCandidate' component={AddCandidate} />
      <Stack.Screen name="Tokens" component={Tokens} />
      
    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})
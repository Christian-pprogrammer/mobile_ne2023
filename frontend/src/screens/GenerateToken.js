import { Alert, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FormHeader from '../components/FormHeader'
import Input from '../components/Input'
import Button from '../components/Button'
import { COLORS } from '../utils/constants'
import isNumber from '../utils/checkNumber'
import ErrorText from '../components/ErrorText'
import axiosClient from '../axios/axiosClient'
import getErrMsg from '../utils/getErrorMsg'

const GenerateToken = ({navigation}) => {

  const [amount, setAmount] = useState(null);
  const [meterNumber, setMeterNumber] = useState(null);
  const [amountErr, setAmountErr] = useState('');
  const [meterErr, setMeterErr] = useState('');
  const [backendError, setBackendErr] = useState('');
  const [generatedToken, setGeneratedToken] = useState('');

  const getToken = async () => {
    let validData = true;
    if(!amount || !meterNumber) {
      validData = false;
      if(!amount) {
        setAmountErr('amount is required')
      }
      if(!meterNumber) {
        setMeterErr('meter number is required')
      }
    }else{
      if(!isNumber(amount) || !isNumber(meterNumber)) {
        if(!isNumber(amount)) {
          setAmountErr('Please enter valid amount');
          validData = false;
        }
        if(!isNumber(meterNumber)) {
          setMeterErr('Please enter valid meter number')
          validData = false;
        }
      }else{
        if(amount > 182500) {
          setAmountErr('Amount higher than expected (182500) of 5 years')
          validData = false;
        }else if(amount % 100 != 0) {
          setAmountErr('Amount should be divisible by 100');
          validData = false;
        }
        if((meterNumber.toString()).length != 6) {
          setMeterErr('Meter number should be 6 digits');
          validData = false;
        }
      }
    }

    if(validData) {
      try{
        const res = await axiosClient.post('/purchase', {
          amount,
          meterNumber
        })
        setGeneratedToken(res.data.created.token)
      }catch(err) {
        console.log(err);
        Alert.alert(getErrMsg(err))
      }
    }
  }

  const changeAmount = (value) => {
    setAmount(value);
    setAmountErr('')
  }
  const changeMeterNumber = (value) => {
    setMeterNumber(value);
    setMeterErr('');
  }

  

  return (
    <View style={styles.container}>
      <FormHeader navigation={navigation} />
      <ScrollView style={styles.form}>
        <Text style={styles.formHeader}>Generate token</Text>
        
        <Input 
          iconName='money-check' 
          placeholder='Amount'  
          style={styles.input} 
          keyboardType='numeric'
          onChangeText={(value)=>changeAmount(value)}
        />
        {
          amountErr && <ErrorText errorMsg={amountErr} />
        }
        
        <Input 
          iconName='tachometer-alt' 
          placeholder='Meter number'  
          keyboardType='numeric'
          onChangeText={(value)=>changeMeterNumber(value)}
        />

        {
          meterErr && <ErrorText errorMsg={meterErr} />
        }
        

        <View style={{width: '100%', marginTop: 10}}>
          <Button 
            text='Get token'
            bg={COLORS.PRIMARY}
            color={COLORS.LIGHT}
            onPress={()=>getToken()}
          />
          {
            generatedToken && 
            <View style={{
              paddingBottom: 30
            }}>
            <Text style={styles.member}>Your token is</Text>
              <Text style={styles.signin}>{generatedToken}</Text>
            </View>
          }
          
        </View>
      </ScrollView>
    </View>
  )
}

export default GenerateToken

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  form: {
    padding: 15
  },  
  input:{
    marginVertical: 7
  },
  formHeader: {
    fontSize: 25,
    color: COLORS.PRIMARY,
    textAlign: 'center',
    marginVertical: 5
  },
  member: {
    fontSize: 15,
    textAlign: 'center',
    color: COLORS.SECONDARY,
    marginTop: 30,
    marginBottom: 5
  },
  signin: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.PRIMARY
  },

})
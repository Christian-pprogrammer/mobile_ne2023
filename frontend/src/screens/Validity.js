import { Alert, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FormHeader from '../components/FormHeader'
import Input from '../components/Input'
import Button from '../components/Button'
import { COLORS } from '../utils/constants'
import isNumber from '../utils/checkNumber'
import ErrorText from '../components/ErrorText'
import axiosClient from '../axios/axiosClient'
import getErrMsg from '../utils/getErrorMsg'
import PickerComponent from '../components/PickerComponent'
import { Picker } from '@react-native-picker/picker'

const Validity = ({navigation}) => {

  const [tokens, setTokens] = useState([]);
  const [token, setToken] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [tokenErr, setTokenErr] = useState('');
  const [remainingDays, setRemainingDays] = useState(null);
  const [boughtDays, setBoughtDays] = useState(null);
  
  const onValueChange = (newValue) => {
    setSelectedId(newValue);
  }

  useEffect(()=>{
    const getAllTokens = async () => {
      try{
        const res = await axiosClient.get('/tokens');
        setTokens(res.data.tokens);
        setSelectedId(res.data.tokens[0]._id)
      }catch(err) {
        Alert.alert(getErrMsg(err));
      }
    }
    getAllTokens()
  }, [])

  const checkValidity = async () => {
    try{
      console.log(selectedId)
      const res = await axiosClient.get(`/validate/${selectedId}`);
      setRemainingDays(res.data.days)
      setBoughtDays(res.data.boughtDays)
    }catch(err) {
      Alert.alert(getErrMsg(err));
    }
  }
  

  return (
    <View style={styles.container}>
      <FormHeader navigation={navigation} />
      <ScrollView style={styles.form}>
        <Text style={styles.formHeader}>Check token validity</Text>

        <Text style={styles.label}>Select the token with the metered number </Text>

        {
          tokens && tokens.length == 0 ? (
            <ErrorText errorMsg="No tokens available" />
          ):(
            <View style={styles.picker}>
              <PickerComponent 
                items={tokens}
                iconName='money-check' 
                onValueChange={(newValue)=>onValueChange(newValue)}
                selectedValue={selectedId}
                style={styles.input} 
              />
            </View>
          )
        }
        
        {
          tokenErr && <ErrorText errorMsg={tokenErr} />
        }


        <View style={{width: '100%', marginTop: 10}}>
          <Button 
            text='Check validity'
            bg={COLORS.PRIMARY}
            color={COLORS.LIGHT}
            onPress={()=>checkValidity()}
          />
          {
            remainingDays && 
            <View style={{
              paddingBottom: 30
            }}>
              <Text style={styles.signin}>Bought for: {remainingDays} {remainingDays > 1 ? 'Days':'Day'}</Text>
              <Text style={styles.signin}>Remaining: {remainingDays} {remainingDays > 1 ? 'Days':'Day'}</Text>
            </View>
          }
          
        </View>
      </ScrollView>
    </View>
  )
}

export default Validity

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
    color: COLORS.PRIMARY,
    marginTop: 30,
    marginBottom: 5
  },
  signin: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.PRIMARY
  },

  label: {
    fontSize: 17,
    marginLeft: 10,
    marginVertical: 10
  },
  picker: {
    paddingHorizontal: 15,
    borderRadius: 50,
    borderColor: COLORS.SECONDARY,
    borderWidth: 1,
    width: '100%',
    gap: 5,
  }

})
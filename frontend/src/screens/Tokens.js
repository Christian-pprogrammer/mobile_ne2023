import { Alert, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View, FlatList } from 'react-native'
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
import ListItem from '../components/ListItem'

const Validity = ({navigation}) => {

  const [tokens, setTokens] = useState([]);
  const [meterNumber, setMeterNumber] = useState(null);
  const [meterErr, setMeterErr] = useState('');

  const checkTokens = async () => {

    let validData = true;
    if(!meterNumber) {
      validData = false;
      setMeterErr('meter number is required')
    }else{
      if(!isNumber(meterNumber)) {
        setMeterErr('Please enter valid meter number')
        validData = false;
      }else{
        if((meterNumber.toString()).length != 6) {
          setMeterErr('Meter number should be 6 digits');
          validData = false;
        }
      }
    }

    if(validData) {
      try{
        const res = await axiosClient.get(`/check-tokens/${meterNumber}`);
        setTokens(res.data.tokens)
      }catch(err) {
        Alert.alert(getErrMsg(err));
      }
    }
  }
  
  const changeMeterNumber = (value) => {
    setMeterNumber(value);
    setMeterErr('');
  }

  return (
    <View style={styles.container}>
      <FormHeader navigation={navigation} />
      <View style={styles.form}>
        <Text style={styles.formHeader}>Check tokens by meter</Text>

        <Text style={styles.label}>Enter the metered number </Text>

        <Input 
          iconName='tachometer-alt' 
          placeholder='Meter number'  
          style={styles.input} 
          keyboardType='numeric'
          onChangeText={(value)=>changeMeterNumber(value)}
        />

        {
          meterErr && <ErrorText errorMsg={meterErr} />
        }


        <View style={{width: '100%', marginTop: 10}}>
          <Button 
            text='Check tokens'
            bg={COLORS.PRIMARY}
            color={COLORS.LIGHT}
            onPress={()=>checkTokens()}
          />
          {
            tokens.length > 0 && 
            <>
              <Text style={[styles.formHeader, {
                marginVertical: 10
              }]}>Tokens by {tokens[0].meter_number}</Text>
              <FlatList
                data={tokens}
                renderItem={({item}) => <ListItem title={item.token} />}
                keyExtractor={item => item._id}
              />
            </>
          }
        </View>
      </View>
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
  },


})
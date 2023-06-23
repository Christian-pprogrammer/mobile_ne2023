import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FormHeader from '../components/FormHeader'
import Input from '../components/Input'
import Button from '../components/Button'
import { COLORS } from '../utils/constants'
import * as ImagePicker from 'expo-image-picker';
import uploadToCloud from '../utils/checkNumber'

const AddCandidate = ({navigation}) => {

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      let newFile = {
        uri: result.assets[0].uri,
        type: `test/${result.uri.split(".")[1]}`,
        name: `test.${result.uri.split(".")[1]}`
      }
      setImage(result.assets[0].uri);
      uploadToCloud(newFile);
    }
  };

  

  return (
    <View style={styles.container}>
      <FormHeader navigation={navigation} />
      <View style={styles.form}>
        <Text style={styles.formHeader}>Add Candidate</Text>
        
        <Input 
          iconName='envelope' 
          placeholder='Email'  
          style={styles.input} 
        />
        <Input 
          iconName='lock' 
          placeholder='Password'  
          style={[styles.input, {
            marginBottom: 15
          }]} 
          secure={true}
        />

        <Button 
          text='Pick image'
          onPress={()=>pickImage()}
          bg={COLORS.PRIMARY}
          color={COLORS.LIGHT}
        />

        <View style={{width: '100%'}}>
          <Button 
            text='Signin'
            bg={COLORS.PRIMARY}
            color={COLORS.LIGHT}
          />
          <View>
            <Text style={styles.member}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={()=>navigation.navigate('SignUp')}
            >
              <Text style={styles.signin}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    </View>
  )
}

export default AddCandidate

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
  }
})
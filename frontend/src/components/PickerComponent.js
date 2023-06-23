import { FontAwesome5, AntDesign, Feather } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React from 'react'
import { COLORS } from '../utils/constants'

const PickerComponent = ({
  items,
  iconName,
  onValueChange,
  selectedValue,
  style}) => {
  return (
    
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
    >
      {
        items.map((item, index) => (
          <Picker.Item label={`${item.token} - ${item.meter_number}`} value={item._id} key={item._id} />
        ))
      }
    </Picker>
  )
}

export default PickerComponent;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    // paddingHorizontal: 15,
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
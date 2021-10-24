import React, {useState} from 'react';
import {View, TextInput, StyleSheet } from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import { AntDesign } from '@expo/vector-icons';
import { COLORS, FONTS } from '../constants';
import DropDownPicker from 'react-native-dropdown-picker'

const FormPicker = ({ value, setValue, onValueChange, items, 
    icon, placeholder, allowMultiple, min, max }) => {
    
    const [open, setOpen] = useState(false);
    
    return (
        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                {icon === 'user' || 'lock' || 'home' || 'team' ?
                    (<AntDesign
                        name={icon}
                        size={32}
                        color='black' />) : null}
            </View>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                containerStyle={{ flex: 1 }}
                style={styles.picker}
                placeholderStyle={[styles.pickerText, { color: '#333' }]}
                labelStyle={ [styles.pickerText, { color: '#333' }]}
                onChangeValue={onValueChange}
                placeholder={placeholder}
                multiple={allowMultiple}
                min={min}
                max={max}
                dropDownDirection="TOP" 
            />
        </View>
  );
};

export default FormPicker;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 7,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  pickerText: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    ...FONTS.body3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
      flex: 1,
      borderColor: 'white'
  },
});
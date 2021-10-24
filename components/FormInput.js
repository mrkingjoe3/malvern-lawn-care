import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import { AntDesign } from '@expo/vector-icons';
import { FONTS } from '../constants';


const FormInput = ({style, labelValue, placeholderText, icon, ...rest}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <View style={styles.iconStyle}>
        {icon === 'user' || 'lock' || 'home' || 'tags'?
          (<AntDesign
            name={icon}
            size={32}
            color='black' />) : null}
        
      </View>
      <TextInput
        value={labelValue}
        style={[styles.input, style]}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
};

export default FormInput;

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
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    ...FONTS.body3,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
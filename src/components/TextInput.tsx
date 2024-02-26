import React from 'react';
import {TextInput as RNTextInput, StyleSheet} from 'react-native';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';

interface TextInputProps {
  value: string | undefined;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
}

const TextInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}: TextInputProps) => {
  return (
    <RNTextInput
      value={value}
      onChangeText={onChangeText}
      style={styles.textInput}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'stretch',
    fontFamily: Fonts.bodyFont,
    color: Colors.basicText,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: Colors.white,
  },
});

export default TextInput;

import React from 'react';
import {TextInput as RNTextInput, StyleSheet, View} from 'react-native';

interface TextInputProps {
  value: string;
  onChangeText: () => void;
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
    color: '#000000',
    borderWidth: 1,
    borderColor: '#ECEFF4',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'stretch',
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default TextInput;

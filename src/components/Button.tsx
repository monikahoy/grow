import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import {StyleProp} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<any>;
  disabled?: boolean;
}

const Button = ({title, onPress, style, disabled}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style, disabled && styles.disabledButton]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  text: {
    color: Colors.plainButtonText,
    fontSize: 16,
    fontFamily: Fonts.buttonFont,
  },
  disabledButton: {
    opacity: 0.5, // Adjust the opacity for the disabled state
  },
});

export default Button;

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import {StyleProp} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<any>;
}

const Button = ({title, onPress, style}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  text: {
    color: Colors.buttonBackground,
    fontSize: 16,
    fontFamily: Fonts.buttonFont,
  },
});

export default Button;

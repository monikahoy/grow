import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import Colors from '../theme/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../theme/Fonts';

interface ButtonProps {
  title: string;
  disabled?: boolean;
  onPress: () => void;
}

const Button = ({title, disabled, onPress}: ButtonProps) => {
  const underLayColor = 'transparent';
  const colorsDisabled = [
    Colors.inactiveButtonBackground,
    Colors.inactiveButtonBackground,
  ];
  const colorsActive = [Colors.buttonBackground, Colors.purpleGradient];
  const gradientStart = {x: 0, y: 0};
  const gradientEnd = {x: 1, y: 0};

  return (
    <TouchableHighlight onPress={onPress} underlayColor={underLayColor}>
      <LinearGradient
        colors={disabled ? colorsDisabled : colorsActive}
        start={gradientStart}
        end={gradientEnd}
        style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderColor: 'transparent',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  text: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: Fonts.buttonFont,
  },
});

export default Button;

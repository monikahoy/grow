import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

interface ButtonProps {
  title: string;
  disabled: boolean;
  onPress: () => void;
}

const Button = ({title, disabled, onPress}: ButtonProps) => {
  const underLayColor = 'transparent';
  const colorsDisabled = ['#C8C8C8', '#C8C8C8'];
  const colorsActive = ['#88C0D0', '#5DC5C2'];
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
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Button;

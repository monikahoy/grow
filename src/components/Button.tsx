import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

interface ButtonProps {
  title: string;
}

const Button = ({title}: ButtonProps) => {
  return (
    <TouchableHighlight>
      <LinearGradient
        colors={['#88C0D0', '#5DC5C2']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
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

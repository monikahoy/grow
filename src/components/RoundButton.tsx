// components/RoundButton.tsx

import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import Colors from '../theme/Colors';

type RoundButtonProps = {
  onPress?: () => void;
  label?: string;
  isCameraButton?: boolean;
  disabled?: boolean;
};

const RoundButton: React.FC<RoundButtonProps> = ({
  onPress,
  label,
  isCameraButton,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, disabled && styles.disabledButton]}
      disabled={disabled}>
      <View style={styles.button}>
        <View style={isCameraButton ? styles.innerCircle : null}>
          {label && <Text style={styles.label}>{label}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    padding: 10,
  },
  disabledButton: {
    opacity: 0.5, // Adjust the opacity for the disabled state
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.buttonBackground,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // for Android shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.buttonBackground, // Inner circle background color
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white, // Border color
  },
  label: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
});

export default RoundButton;

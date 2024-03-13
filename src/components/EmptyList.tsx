import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Start by adding new plants to your collection
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 50,
  },
  text: {
    fontFamily: Fonts.bodyFont,
    fontSize: 20,
    color: Colors.secondaryText,
    textAlign: 'center',
  },
});

export default EmptyList;

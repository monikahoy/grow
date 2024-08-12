import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import {useTranslation} from 'react-i18next';

const EmptyList = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('emptyList.text')} </Text>
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

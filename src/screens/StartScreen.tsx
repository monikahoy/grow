import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StartScreen = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Grow</Text>
      <Text style={styles.sectionDescription}>
        a picture a day keeps sad plants at bay
      </Text>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  section: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import StartScreen from './src/screens/StartScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StartScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

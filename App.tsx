import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import StartScreen from './src/screens/StartScreen';
import PlantList from './src/screens/PlantList';
import AddPlant from './src/screens/AddPlant';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PlantList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import CameraCapture from '../../components/Camera';

const AddPlant = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CameraCapture />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default AddPlant;

import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import Button from '../../components/Button';
import CameraCapture from '../../components/Camera';
import Colors from '../../theme/Colors';

const AddPlant = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <CameraCapture />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topContainer: {
    flex: 1,
  },
});

export default AddPlant;

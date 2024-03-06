import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import CameraCapture from '../../components/Camera';
import Colors from '../../theme/Colors';

import {NavigationProp} from '@react-navigation/native';

type AddPlantProps = {
  navigation: NavigationProp<any>;
};

const AddPlant = ({navigation}: AddPlantProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <CameraCapture navigation={navigation} />
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

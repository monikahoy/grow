import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import Button from '../../components/Button';

const ctaAddPicture = 'New picture';

const PlantView = () => {
  const onAddPicture = () => {
    console.log('navigate to add picture');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text>View that shows updates and information about plant</Text>
      </View>
      <Button disabled={false} onPress={onAddPicture} title={ctaAddPicture} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
  },
});

export default PlantView;

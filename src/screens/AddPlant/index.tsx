import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import Button from '../../components/Button';

const AddPlant = () => {
  const onPress = () => console.log('pressing');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text>Add a plant</Text>
      </View>
      <Button disabled={false} title="New Plant" onPress={onPress} />
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

export default AddPlant;

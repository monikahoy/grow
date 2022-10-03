import React from 'react';
import {Button, SafeAreaView, View, StyleSheet, Text} from 'react-native';

const AddPlant = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text>Add a new picture to your plant</Text>
      </View>
      <Button title="New picture" />
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

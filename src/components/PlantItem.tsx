import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

interface PlantItem {
  name: string;
  id: number;
  image: string;
}

export const PlantItem = ({name, image}: PlantItem) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

export default PlantItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'indigo',
    fontWeight: 'bold',
  },
});

import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet, Image} from 'react-native';

interface PlantItem {
  name: string;
  id: number;
  image: string;
}

export const PlantItem = ({name, image}: PlantItem) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <View>
        <Text style={styles.title}>{name}</Text>
      </View>
    </View>
  );
};

export default PlantItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    color: 'black',
    fontSize: 18,
  },
  image: {
    height: 142,
    width: 107,
    borderRadius: 5,
    marginRight: 20,
  },
});

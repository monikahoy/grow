import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

type PlantItem = {
  name: string;
  id: number;
  image: string;
  onPress: () => void;
};

export const PlantItem = ({name, image, onPress}: PlantItem) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="transparent">
      <View style={styles.container}>
        <Image source={{uri: image}} style={styles.image} />
        <View>
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>
    </TouchableHighlight>
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

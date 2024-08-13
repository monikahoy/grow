import React, {memo} from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import {getUserId} from '../utils/utils';

type PlantItemProps = {
  name: string;
  image: string;
  onPress: () => void;
};

const PlantItem = memo(({name, image, onPress}: PlantItemProps) => {
  const userId = getUserId();
  if (!userId) {
    return null;
  }

  return (
    <TouchableHighlight onPress={onPress} underlayColor="transparent">
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <Image source={{uri: image}} style={styles.image} />
      </View>
    </TouchableHighlight>
  );
});

export default PlantItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  title: {
    color: Colors.basicText,
    fontFamily: Fonts.titleFont,
    fontSize: 20,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4, // 3:4 aspect ratio
    borderRadius: 5,
  },
});

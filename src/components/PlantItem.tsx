import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableHighlight} from 'react-native';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';

type PlantItem = {
  name: string;
  date?: string;
  id: number;
  image: string;
  onPress: () => void;
};

export const PlantItem = ({name, date, image, onPress}: PlantItem) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="transparent">
      <View style={styles.container}>
        <Image source={{uri: image}} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.date}>{date}</Text>
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
    backgroundColor: Colors.background,
  },
  detailsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  title: {
    color: Colors.basicText,
    fontFamily: Fonts.titleFont,
    fontSize: 20,
    marginBottom: 10,
  },
  date: {
    color: Colors.secondaryText,
    fontFamily: Fonts.subtitleFont,
    fontSize: 18,
  },
  image: {
    height: 142,
    width: 107,
    borderRadius: 5,
    marginRight: 20,
  },
});

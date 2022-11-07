import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';

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
    backgroundColor: Colors.background,
  },
  detailsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    color: Colors.basicText,
    fontFamily: Fonts.MONTSERRAT_REGULAR,
    fontSize: 18,
  },
  image: {
    height: 142,
    width: 107,
    borderRadius: 5,
    marginRight: 20,
  },
});

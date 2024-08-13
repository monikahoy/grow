import React, {memo, useCallback, useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import {getLatestPlantUpdate, getUserId} from '../utils/utils';

type PlantItemProps = {
  plantId: string;
  name: string;
  onPress: () => void;
};

const PlantItem = memo(({plantId, name, onPress}: PlantItemProps) => {
  const [image, setImage] = useState<string>('');
  const userId = getUserId();

  const fetchAndSetImage = useCallback(
    async (userId: string, plantId: string) => {
      const latestUpdatePromise = await getLatestPlantUpdate(userId, plantId);
      if (latestUpdatePromise !== null) {
        setImage(latestUpdatePromise.picture.url);
      }
    },
    [userId, plantId],
  );

  useLayoutEffect(() => {
    if (userId && image === '') {
      fetchAndSetImage(userId, plantId);
    }
  }, [fetchAndSetImage, userId, plantId, image]);

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

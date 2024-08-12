import React from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {TouchableHighlight} from 'react-native';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import {deleteDocumentFromFirebase, formatDate, getUserId} from '../../utils';
import {Timestamp} from 'firebase/firestore';
import {useTranslation} from 'react-i18next';

type PlantItem = {
  name: string;
  timestamp: Timestamp;
  id: string;
  image: string;
  onPress: () => void;
  onDelete: () => void;
};

export const PlantItem = ({
  name,
  timestamp,
  id,
  image,
  onPress,
  onDelete,
}: PlantItem) => {
  const {t} = useTranslation();
  const userId = getUserId();
  if (!userId) {
    // handle error
    return;
  }

  const deletePlant = async () => {
    // Delete plant from Firebase
    await deleteDocumentFromFirebase(userId, id);
    onDelete();
  };

  const onPressDelete = async () => {
    Alert.alert(t('deletePlant.title'), t('deletePlant.text'), [
      {
        text: t('deletePlant.no'),
        style: 'cancel',
      },
      {
        text: t('deletePlant.ok'),
        onPress: () => deletePlant(),
      },
    ]);
  };

  return (
    <TouchableHighlight onPress={onPress} underlayColor="transparent">
      <View style={styles.container}>
        <Image source={{uri: image}} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.date}>{formatDate(timestamp.toDate())}</Text>
        </View>
        <TouchableHighlight onPress={onPressDelete} underlayColor="transparent">
          <Image
            source={require('../../assets/icons/icon_delete.png')}
            style={{width: 16, height: 16}}
          />
        </TouchableHighlight>
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

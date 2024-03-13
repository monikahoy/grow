import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import RoundButton from '../../components/RoundButton';
import {useFocusEffect} from '@react-navigation/native';
import {getUserId, getPlantDataFromFirebase} from '../../../utils';

const ctaAddPicture = 'Add';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const PlantView = ({navigation, route}: any) => {
  const [data, setData] = useState(route.params.item);
  const plantId = data.id;

  const userId = getUserId();
  if (!userId) {
    // handle error
    return;
  }

  const getPlantPicturesData = useCallback(async () => {
    // apply useCallback to getData and avoiding constant rerendering of the function
    try {
      const dbData = await getPlantDataFromFirebase(userId, plantId);
      setData(dbData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      getPlantPicturesData();
    }, [getPlantPicturesData]),
  );

  const onAddPicture = () => {
    navigation.navigate('AddPicture', {
      screen: 'AddPicture',
      params: {data: plantId},
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topContainer}>
          <Image source={{uri: data.photoURL}} style={styles.topImage} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.date}>{data.createdAt}</Text>
        </View>
        <View style={styles.imageRow}>
          {data.pictures &&
            data.pictures.map((picture: any, index: number) => {
              return (
                <View style={styles.imageContainer} key={picture.url}>
                  <Image source={{uri: picture.url}} style={styles.image} />
                  <Text style={[styles.date, {fontSize: 16}]}>
                    {picture.createdAt}
                  </Text>
                </View>
              );
            })}
        </View>
      </ScrollView>

      <RoundButton onPress={onAddPicture} label={ctaAddPicture} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.background,
  },
  detailsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10,
  },
  name: {
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
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight / 3,
    flex: 1,
  },
  topImage: {
    height: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 5,
  },
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 10,
    width: screenWidth / 2 - 20, // Two pictures in a row with padding
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default PlantView;

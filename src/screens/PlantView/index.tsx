import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, Image} from 'react-native';
import Colors from '../../theme/Colors';
import AddPicture from '../AddPicture';
import Fonts from '../../theme/Fonts';
import RoundButton from '../../components/RoundButton';

const ctaAddPicture = 'Add';

const PlantView = ({navigation, route}: any) => {
  const data = route.params.item;

  const onAddPicture = () => {
    navigation.navigate(AddPicture);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={{uri: data.photoURL}} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.date}>{data.createdAt}</Text>
      </View>
      <RoundButton onPress={onAddPicture} label={ctaAddPicture} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 20,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'yellow',
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
    flex: 1,
    height: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 5,
    marginVertical: 10,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    alignContent: 'center',
  },
});

export default PlantView;

import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import Button from '../../components/Button';
import Colors from '../../theme/Colors';
import AddPicture from '../AddPicture';
import Fonts from '../../theme/Fonts';

const ctaAddPicture = 'New picture';

const PlantView = ({navigation, route}: any) => {
  const data = route.params.item;
  const {id} = data;

  const onAddPicture = () => {
    navigation.navigate(AddPicture);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.date}>{data.createdAt}</Text>
      </View>
      <Button disabled={false} onPress={onAddPicture} title={ctaAddPicture} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default PlantView;

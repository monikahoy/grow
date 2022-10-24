import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import PlantItem from '../../components/PlantItem';
import data from '../../../data.js';
import Button from '../../components/Button';
import AddPlant from '../AddPlant';
import AddPicture from '../AddPicture';

const ctaAddPlant = 'Add new plant';

const PlantList = ({navigation}: any) => {
  const onAddPlant = () => {
    navigation.navigate(AddPlant);
  };

  const onGoToPlant = () => {
    navigation.navigate(AddPicture);
  };

  const renderItem = ({item}: any) => {
    return (
      <PlantItem
        id={item.id}
        name={item.name}
        image={item.image}
        onPress={onGoToPlant}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={renderItem} />
      <Button disabled={false} onPress={onAddPlant} title={ctaAddPlant} />
    </View>
  );
};

export default PlantList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

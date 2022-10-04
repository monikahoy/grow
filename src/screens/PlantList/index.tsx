import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import PlantItem from '../../components/PlantItem';
import data from '../../../data.js';
import Button from '../../components/Button';

const ctaAddPlant = 'Add new plant';

const PlantList = () => {
  const onAddPlant = () => {
    console.log('adding new plant');
  };

  const renderItem = ({item}: any) => {
    return <PlantItem name={item.name} image={item.image} />;
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

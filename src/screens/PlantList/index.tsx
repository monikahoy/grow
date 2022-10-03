import React from 'react';
import {View, FlatList, Button} from 'react-native';
import PlantItem from '../../components/PlantItem';

const plants = [
  {name: 'plant 1', id: 1, image: ''},
  {name: 'plant 2', id: 2, image: ''},
  {name: 'plant 3', id: 3, image: ''},
  {name: 'plant 4', id: 4, image: ''},
  {name: 'plant 5', id: 5, image: ''},
  {name: 'plant 6', id: 6, image: ''},
  {name: 'plant 7', id: 7, image: ''},
];

const renderItem = ({item}: any) => {
  return <PlantItem name={item.name} />;
};

const PlantList = () => {
  return (
    <View style={{flex: 1}}>
      <FlatList data={plants} style={{flex: 1}} renderItem={renderItem} />
      <Button title="add plant" />
    </View>
  );
};

export default PlantList;

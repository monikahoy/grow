import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import PlantItem from '../../components/PlantItem';
import Button from '../../components/Button';
import AddPlant from '../AddPlant';
import Colors from '../../theme/Colors';
import {auth} from '../../../firebaseConfig.js';

import {getUserPlantDataFromFirebase} from '../../../firebaseFunctions.ts';

const ctaAddPlant = 'Add new plant';

const PlantList = ({navigation}: any) => {
  const [plantData, setPlantData] = useState([]);

  const onAddPlant = () => {
    navigation.navigate(AddPlant);
  };

  const userId = auth.currentUser && auth.currentUser.uid;

  useEffect(() => {
    const loadPlantData = async () => {
      try {
        const dbData = await getUserPlantDataFromFirebase(userId);
        setPlantData(dbData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadPlantData();
  }, [userId]);

  const renderItem = ({item}: any) => {
    const onPressItem = function () {
      navigation.navigate('PlantView', {item: item});
    };

    return (
      <PlantItem
        id={item.id}
        name={item.name}
        date={item.createdAt}
        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pansies-1613418136.jpg?crop=0.8749172733289212xw:1xh;center,top&resize=980:*"
        onPress={onPressItem}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={plantData}
        renderItem={renderItem}
        style={styles.listContainer}
      />
      <Button disabled={false} onPress={onAddPlant} title={ctaAddPlant} />
    </View>
  );
};

export default PlantList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    margin: 20,
  },
});

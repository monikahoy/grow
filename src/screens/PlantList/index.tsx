import React, {useCallback, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import PlantItem from '../../components/PlantItem';
import RoundButton from '../../components/RoundButton';
import AddPlant from '../AddPlant';
import Colors from '../../theme/Colors';

import {getUserId, getUserPlantDataFromFirebase} from '../../../utils';
import {useFocusEffect} from '@react-navigation/native';
import EmptyList from '../../components/EmptyList';

const ctaAddPlant = 'New';

type Plant = {
  id: string;
  name: string;
  createdAt: string; // Date in string format
  photoURL: string;
};

const PlantList = ({navigation}: any) => {
  const [plantData, setPlantData] = useState<Plant[]>([]);

  const onAddPlant = () => {
    navigation.navigate(AddPlant);
  };

  const userId = getUserId();

  const getData = useCallback(async () => {
    try {
      const dbData: Plant[] = await getUserPlantDataFromFirebase(userId);
      // Sort data by the first name alphabetically
      const sortedData = dbData.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // Convert to uppercase to ensure case-insensitive comparison
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      setPlantData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [userId]);

  const onDeleteItem = () => {
    // Refetch data after deleting
    getData();
  };

  useFocusEffect(
    useCallback(() => {
      // Refetch data when the screen comes into focus
      getData();
    }, [getData]),
  );
  const renderItem = ({item}: any) => {
    const onPressItem = function () {
      navigation.navigate('PlantView', {item: item});
    };

    return (
      <PlantItem
        id={item.id}
        name={item.name}
        date={item.createdAt}
        image={item.photoURL}
        onPress={onPressItem}
        onDelete={onDeleteItem}
      />
    );
  };

  return (
    <View style={styles.container}>
      {plantData.length ? (
        <FlatList
          data={plantData}
          renderItem={renderItem}
          style={styles.listContainer}
        />
      ) : (
        <EmptyList />
      )}
      <RoundButton onPress={onAddPlant} label={ctaAddPlant} />
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

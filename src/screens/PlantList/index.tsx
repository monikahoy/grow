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

const PlantList = ({navigation}: any) => {
  const [plantData, setPlantData] = useState([]);

  const onAddPlant = () => {
    navigation.navigate(AddPlant);
  };

  const userId = getUserId();

  const getData = useCallback(async () => {
    // apply useCallback to getData without constant rerendering of the function
    try {
      const dbData = await getUserPlantDataFromFirebase(userId);
      setPlantData(dbData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [userId]);

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
      <FlatList
        data={plantData}
        renderItem={renderItem}
        style={styles.listContainer}
      />
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

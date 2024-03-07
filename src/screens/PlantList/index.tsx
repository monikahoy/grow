import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import PlantItem from '../../components/PlantItem';
import RoundButton from '../../components/RoundButton';
import AddPlant from '../AddPlant';
import Colors from '../../theme/Colors';
import {auth} from '../../../firebaseConfig.js';

import {getUserPlantDataFromFirebase} from '../../../functions';

const ctaAddPlant = 'New';

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
        setPlantData(prevPlantData => {
          // Use the previous state to update the state, only if the data has changed to avoid infinite loops
          if (JSON.stringify(prevPlantData) !== JSON.stringify(dbData)) {
            return dbData;
          }
          return prevPlantData;
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadPlantData();
  }, [userId, plantData]); // plantData is used inside the effect but not in the dependencies array

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

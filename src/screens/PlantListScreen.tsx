import React, {useCallback, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import PlantItem from '../components/PlantItem';
import RoundButton from '../components/RoundButton';
import AddPlant from './AddPlantScreen';
import Colors from '../theme/Colors';
import {getUserId, getUserPlantDataFromFirebase} from '../../utils';
import {useFocusEffect} from '@react-navigation/native';
import EmptyList from '../components/EmptyList';
import {useTranslation} from 'react-i18next';

type Plant = {
  id: string;
  name: string;
  createdAt: Date;
  photoURL: string;
};

const PlantsList = ({navigation}: any) => {
  const [plantData, setPlantData] = useState<Plant[]>([]);
  const {t} = useTranslation();

  const userId = getUserId();

  const getData = useCallback(async () => {
    try {
      const dbData: Plant[] = await getUserPlantDataFromFirebase(userId);
      setPlantData(dbData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [userId]);

  const onAddPlant = () => {
    navigation.navigate(AddPlant);
  };

  const handlePressItem = useCallback(
    (item: Plant) => () => {
      navigation.navigate('PlantView', {item});
    },
    [navigation],
  );

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [getData]),
  );

  const renderItem = useCallback(
    ({item}: {item: Plant}) => (
      <View style={{marginHorizontal: 20}}>
        <PlantItem
          id={item.id}
          name={item.name}
          timestamp={item.createdAt}
          image={item.photoURL}
          onPress={handlePressItem(item)}
        />
      </View>
    ),
    [handlePressItem],
  );

  return (
    <View style={styles.container}>
      {plantData.length ? (
        <FlatList
          data={plantData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.listContainer}
        />
      ) : (
        <EmptyList />
      )}
      <RoundButton onPress={onAddPlant} label={t('plantsList.ctaAddPlant')} />
    </View>
  );
};
export default PlantsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    marginVertical: 20,
  },
});

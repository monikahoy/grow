import React, {useCallback, useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import PlantItem from '../../components/PlantItem';
import RoundButton from '../../components/RoundButton';
import AddPlant from '../AddPlant';
import Colors from '../../theme/Colors';
import {getUserId, getUserPlantDataFromFirebase} from '../../../utils';
import {useFocusEffect} from '@react-navigation/native';
import EmptyList from '../../components/EmptyList';
import {useTranslation} from 'react-i18next';

type Plant = {
  id: string;
  name: string;
  createdAt: string;
  photoURL: string;
};

const PlantsList = ({navigation}: any) => {
  const [plantData, setPlantData] = useState<Plant[]>([]);
  const {t} = useTranslation();

  const userId = getUserId();

  const getData = useCallback(async () => {
    try {
      const dbData: Plant[] = await getUserPlantDataFromFirebase(userId);
      const sortedData = dbData.sort((a, b) => a.name.localeCompare(b.name));
      setPlantData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [userId]);

  const onAddPlant = () => {
    navigation.navigate(AddPlant);
  };

  const onDeleteItem = useCallback(() => {
    getData();
  }, [getData]);

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
          date={item.createdAt}
          image={item.photoURL}
          onPress={handlePressItem(item)}
          onDelete={onDeleteItem}
        />
      </View>
    ),
    [handlePressItem, onDeleteItem],
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

import React, {useCallback, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import PlantItem from '../components/PlantItem';
import RoundButton from '../components/RoundButton';
import AddPlant from './AddPlantScreen';
import Colors from '../theme/Colors';
import {getUserId, getUserPlantDataFromFirebase} from '../utils/data';
import {useFocusEffect} from '@react-navigation/native';
import EmptyList from '../components/EmptyList';
import {useTranslation} from 'react-i18next';
import LoadingView from '../components/LoadingView';
import {Plant} from '../utils/models';

const PlantsList = ({navigation}: any) => {
  const [plantData, setPlantData] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {t} = useTranslation();
  const userId = getUserId();

  // Main data fetching function
  const getData = useCallback(async () => {
    if (!userId) return;

    try {
      const dbData: Plant[] = await getUserPlantDataFromFirebase(userId);
      setPlantData(dbData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
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
      <View style={styles.itemContainer}>
        <PlantItem
          plantId={item.id}
          name={item.name}
          onPress={handlePressItem(item)}
        />
      </View>
    ),
    [handlePressItem],
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingView />
      ) : plantData.length ? (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    marginVertical: 20,
  },
  itemContainer: {
    marginHorizontal: 20,
  },
});

export default PlantsList;

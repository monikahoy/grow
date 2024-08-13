import React, {useCallback, useState, useMemo} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import PlantItem from '../components/PlantItem';
import RoundButton from '../components/RoundButton';
import AddPlant from './AddPlantScreen';
import Colors from '../theme/Colors';
import {
  getPlantUpdatesCollection,
  getUserId,
  getUserPlantDataFromFirebase,
} from '../utils/utils';
import {useFocusEffect} from '@react-navigation/native';
import EmptyList from '../components/EmptyList';
import {useTranslation} from 'react-i18next';
import LoadingView from '../components/LoadingView';

type Plant = {
  id: string;
  name: string;
  createdAt: Date;
};

type PlantUpdate = {
  createdAt: Date;
  picture: {
    url: string;
  };
};

type PlantWithLatestUpdate = {
  id: string;
  name: string;
  latestImage: string;
  createdAt: Date;
};

const fallbackImageUrl = 'https://via.placeholder.com/150?text=No+Image';

const PlantsList = ({navigation}: any) => {
  const [plantData, setPlantData] = useState<Plant[]>([]);
  const [updatedPlants, setUpdatedPlants] = useState<PlantWithLatestUpdate[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const {t} = useTranslation();

  const userId = getUserId();

  const fetchLatestImage = async (
    userId: string,
    plantId: string,
  ): Promise<string> => {
    try {
      // Ensure updates is always an array, even if it's empty
      const updates: PlantUpdate[] =
        (await getPlantUpdatesCollection(userId, plantId)) || [];
      return updates.length > 0 ? updates[0].picture.url : fallbackImageUrl;
    } catch (error) {
      console.error(`Error fetching updates for plant ${plantId}:`, error);
      return fallbackImageUrl;
    }
  };

  // Main data fetching function
  const getData = useCallback(async () => {
    if (!userId) return;

    try {
      const dbData: Plant[] = await getUserPlantDataFromFirebase(userId);
      setPlantData(dbData);

      // Fetch the latest image for each plant
      const updatePromises = dbData.map(async plant => {
        const latestImage = await fetchLatestImage(userId, plant.id);
        return {
          ...plant,
          latestImage,
        };
      });

      const plantsDataWithLatestUpdate = await Promise.all(updatePromises);
      setUpdatedPlants(plantsDataWithLatestUpdate);
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
    ({item}: {item: PlantWithLatestUpdate}) => (
      <View style={styles.itemContainer}>
        <PlantItem
          name={item.name}
          image={item.latestImage}
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
      ) : updatedPlants.length ? (
        <FlatList
          data={updatedPlants}
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

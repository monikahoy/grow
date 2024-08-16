import React, {useCallback, useMemo, useState} from 'react';
import {View, FlatList, StyleSheet, TextInput} from 'react-native';
import PlantItem from '../components/PlantItem';
import RoundButton from '../components/RoundButton';
import Colors from '../theme/Colors';
import {getUserId, getUserPlantDataFromFirebase} from '../utils/data';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import EmptyList from '../components/EmptyList';
import {useTranslation} from 'react-i18next';
import LoadingView from '../components/LoadingView';
import {Plant} from '../utils/models';
import {RootParamList} from '../utils/types';
import Fonts from '../theme/Fonts';

const PlantsList = () => {
  const [plantData, setPlantData] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const userId = getUserId();

  const filteredData = useMemo(
    () =>
      plantData.filter(plant => {
        return plant.name.toLowerCase().includes(query.toLowerCase());
      }),
    [plantData, query],
  );

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
    navigation.navigate('AddPlant');
  };

  const handlePressItem = useCallback(
    (item: Plant) => () => {
      navigation.navigate('PlantView', {data: item});
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
        <>
          <TextInput
            placeholder={t('common.search')}
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
            placeholderTextColor={Colors.placeholderText}
          />
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.listContainer}
          />
          {!filteredData.length && (
            <EmptyList text={t('emptyList.noResults')} />
          )}
        </>
      ) : (
        <EmptyList text={t('emptyList.noPlants')} />
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
  searchInput: {
    marginHorizontal: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    fontFamily: Fonts.bodyFont,
  },
});

export default PlantsList;

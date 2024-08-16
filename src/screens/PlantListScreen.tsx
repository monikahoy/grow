import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Animated,
  Button,
} from 'react-native';
import PlantItem from '../components/PlantItem';
import RoundButton from '../components/RoundButton';
import Colors from '../theme/Colors';
import {getUserId} from '../utils/data';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import EmptyList from '../components/EmptyList';
import {useTranslation} from 'react-i18next';
import LoadingView from '../components/LoadingView';
import {Plant} from '../utils/models';
import {RootParamList} from '../utils/types';
import Fonts from '../theme/Fonts';
import usePlantStore from '../../store/plantsStore';

const PlantsList = () => {
  const {plants, isLoading, loadPlants} = usePlantStore(state => ({
    plants: state.plants,
    isLoading: state.isLoading,
    loadPlants: state.loadPlants,
  }));
  const [query, setQuery] = useState('');
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const userId = useMemo(() => getUserId(), []);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const translateY = useRef(new Animated.Value(0)).current; // show search bar when

  const filteredPlants = useMemo(
    () =>
      plants.filter(plant => {
        return plant.name.toLowerCase().includes(query.toLowerCase());
      }),
    [plants, query],
  );

  const getPlantData = useCallback(() => {
    if (userId) {
      loadPlants(userId);
    }
  }, [userId, loadPlants]);

  useEffect(() => {
    getPlantData();
  }, [getPlantData]);

  const onAddPlant = () => {
    navigation.navigate('AddPlant');
  };

  const handlePressItem = useCallback(
    (item: Plant) => () => {
      navigation.navigate('PlantView', {data: item});
    },
    [navigation],
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

  // Hide the search bar on scroll
  const hideSearchBar = () => {
    Animated.timing(translateY, {
      toValue: -50,
      duration: 300,
      useNativeDriver: true,
    }).start(),
      setShowSearchBar(false);
  };

  // Show the search bar when scrolling ends, but only if near the top
  const showSearchBarIfNearTop = (event: {
    nativeEvent: {contentOffset: {y: any}};
  }) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY <= 5) {
      // Allow a small buffer (e.g., 5px) for smoothness
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(),
        setShowSearchBar(true);
    }
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingView />
      ) : plants.length ? (
        <>
          <Animated.View
            style={{
              height: showSearchBar ? 50 : 0,
              transform: [{translateY: translateY}],
            }}>
            <>
              <TextInput
                placeholder={t('common.search')}
                value={query}
                onChangeText={setQuery}
                style={styles.searchInput}
                placeholderTextColor={Colors.placeholderText}
              />
            </>
          </Animated.View>
          <FlatList
            data={filteredPlants}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            onScrollBeginDrag={hideSearchBar}
            onScroll={showSearchBarIfNearTop}
            style={styles.listContainer}
          />
          {!filteredPlants.length && (
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
    marginBottom: 20,
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
    height: '100%',
  },
});

export default PlantsList;

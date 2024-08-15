import React, {useCallback, useEffect, useLayoutEffect, useMemo} from 'react';
import {View, StyleSheet, Text, Image, FlatList, Pressable} from 'react-native';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import RoundButton from '../components/RoundButton';
import LoadingView from '../components/LoadingView';
import PlantUpdateItem from '../components/PlantUpdateItem';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  getUserId,
  getPlantUpdatesCollection,
  deletePlantAndUpdatesFromFirebase,
  deletePlantUpdateFromFirebase,
} from '../utils/data';
import {useTranslation} from 'react-i18next';
import {useCustomAlert} from '../hooks/useCustomAlert';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {PlantUpdate} from '../utils/models';
import {RootParamList} from '../utils/types';
import usePlantStore from '../../store/plantsStore';

const ViewPlantScreen = () => {
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const route = useRoute<RouteProp<RootParamList, 'PlantView'>>();
  const {t} = useTranslation();
  const data = route.params?.data;
  const plantId = useMemo(() => {
    return data.id;
  }, []);

  const {plantUpdates, isLoading, loadPlantUpdates} = usePlantStore(state => ({
    plantUpdates: state.plantUpdates[plantId] || [],
    isLoading: state.isLoading,
    loadPlantUpdates: state.loadPlantUpdates,
  }));
  const {showDeletePlantAlert, showDeleteUpdateAlert} = useCustomAlert();
  const userId = useMemo(() => getUserId(), []);
  const deletePlantFromStore = usePlantStore(state => state.deletePlant);
  const deleteUpdateFromStore = usePlantStore(state => state.deleteUpdate);

  const getPlantData = useCallback(() => {
    if (!userId) {
      return;
    }
    loadPlantUpdates(userId, plantId);
  }, [userId, plantId, loadPlantUpdates]);

  useEffect(() => {
    getPlantData();
  }, [getPlantData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={onDeletePlant}>
          <Image
            source={require('../../assets/icons/icon_delete.png')}
            style={styles.deleteIcon}
            tintColor={Colors.darkpurple}
          />
        </Pressable>
      ),
    });
  }, [navigation]);

  const onAddPicture = useCallback(() => {
    navigation.navigate('AddPicture', {
      data: {id: plantId},
    });
  }, [plantId, navigation]);

  const onAddNoteEntry = (updateId: string) => {
    const update = plantUpdates.find(item => item.id === updateId);
    const note = update?.noteEntry;
    navigation.navigate('NoteEntry', {
      data: {plantId: plantId, updateId: updateId, note: note},
    });
  };

  const deletePlant = async () => {
    await deletePlantAndUpdatesFromFirebase(userId, plantId);
    deletePlantFromStore(plantId);
    navigation.navigate('Home');
  };

  const onDeletePlant = useCallback(async () => {
    showDeletePlantAlert(deletePlant);
  }, [showDeletePlantAlert, deletePlant]);

  const deleteUpdate = async (inputId: string) => {
    // Find the update based on the update id
    const update = plantUpdates.find(item => item.id === inputId);
    const updateId = update?.id;
    if (!updateId) {
      console.error('Update ID not found.');
      return;
    }

    await deletePlantUpdateFromFirebase(userId, plantId, updateId);
    deleteUpdateFromStore(plantId, updateId);
  };

  const onDeleteUpdate = useCallback(
    async (id: string) => {
      showDeleteUpdateAlert(() => deleteUpdate(id));
    },
    [showDeleteUpdateAlert, deleteUpdate],
  );

  const showDeleteIcon = useMemo(
    () => plantUpdates.length > 1,
    [plantUpdates.length],
  );

  const renderItem = useCallback(
    ({item}: {item: PlantUpdate}) => (
      <PlantUpdateItem
        id={item.id}
        createdAt={item.createdAt}
        picture={item.picture}
        noteEntry={item.noteEntry}
        showDeleteIcon={showDeleteIcon}
        onAddNote={onAddNoteEntry}
        onDelete={onDeleteUpdate}
      />
    ),
    [onAddNoteEntry, onDeleteUpdate, showDeleteIcon],
  );

  if (isLoading) {
    return <LoadingView text={t('plantView.loading')} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={plantUpdates}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View style={styles.topContainer}>
            <Text style={styles.name}>{data.name}</Text>
          </View>
        }
      />
      <RoundButton onPress={onAddPicture} label={t('plantView.ctaAdd')} />
    </View>
  );
};

const styles = StyleSheet.create({
  deleteIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  name: {
    color: Colors.basicText,
    fontFamily: Fonts.titleFont,
    fontSize: 20,
  },
});

export default ViewPlantScreen;

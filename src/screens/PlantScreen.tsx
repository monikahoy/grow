import React, {useCallback, useLayoutEffect, useMemo, useState} from 'react';
import {View, StyleSheet, Text, Image, FlatList, Pressable} from 'react-native';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import RoundButton from '../components/RoundButton';
import LoadingView from '../components/LoadingView';
import PlantUpdateItem from '../components/PlantUpdateItem';
import {useFocusEffect} from '@react-navigation/native';
import {
  getUserId,
  getPlantUpdatesCollection,
  deletePlantDocFromFirebase,
  deletePlantUpdateFromFirebase,
} from '../utils/utils';
import {useTranslation} from 'react-i18next';
import {Timestamp} from 'firebase/firestore';
import {useCustomAlert} from '../hooks/useCustomAlert';
import {NavigationProp, RouteProp} from '@react-navigation/native';

interface PlantUpdate {
  id: string;
  createdAt: Timestamp;
  picture: {
    url: string;
  };
  noteEntry?: string;
}

type PlantUpdatesScreenProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
};

const isDataSame = (currentData: PlantUpdate[], newData: PlantUpdate[]) => {
  if (currentData.length !== newData.length) {
    return false;
  }
  for (let i = 0; i < currentData.length; i++) {
    if (currentData[i].noteEntry !== newData[i].noteEntry) {
      return false;
    }
  }
  return true;
};

const PlantUpdatesScreen = ({navigation, route}: PlantUpdatesScreenProps) => {
  const {t} = useTranslation();
  const [data] = useState(route.params?.item);
  const [plantUpdates, setPlantUpdates] = useState<PlantUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {showDeletePlantAlert, showDeleteUpdateAlert} = useCustomAlert();
  const plantId = data.id;

  const userId = getUserId();

  const getPlantData = useCallback(async () => {
    try {
      if (plantUpdates.length === 0) {
        setIsLoading(true);
      }
      const dbData: any = await getPlantUpdatesCollection(userId, plantId);
      if (!isDataSame(dbData, plantUpdates)) {
        setPlantUpdates(dbData);
      }
    } catch (error) {
      console.error('Error fetching plant updates:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, plantId]);

  useFocusEffect(
    useCallback(() => {
      getPlantData();
    }, [getPlantData]),
  );

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

  const onAddPicture = () => {
    navigation.navigate('AddPicture', {
      screen: 'AddPicture',
      params: {data: plantId},
    });
  };

  const onAddNoteEntry = (updateId: string) => {
    const update = plantUpdates.find(item => item.id === updateId);
    const note = update?.noteEntry;
    navigation.navigate('NoteEntry', {
      screen: 'NoteEntry',
      params: {data: {plantId: plantId, updateId: updateId, note: note}},
    });
  };

  const deletePlant = async () => {
    await deletePlantDocFromFirebase(userId, plantId);
    navigation.navigate('Home');
  };

  const onDeletePlant = async () => {
    showDeletePlantAlert(deletePlant);
  };

  const deleteUpdate = async (inputId: string) => {
    const update = plantUpdates.find(item => item.id === inputId);
    const updateId = update?.id;
    if (!updateId) {
      return;
    }
    await deletePlantUpdateFromFirebase(userId, plantId, updateId);
    getPlantData();
  };

  const onDeleteUpdate = async (id: string) => {
    showDeleteUpdateAlert(() => deleteUpdate(id));
  };

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

export default PlantUpdatesScreen;

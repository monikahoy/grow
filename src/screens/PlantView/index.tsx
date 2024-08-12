import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import RoundButton from '../../components/RoundButton';
import {useFocusEffect} from '@react-navigation/native';
import {getUserId, getPlantUpdatesCollection} from '../../../utils';

const CTA_ADD = 'Add';
const LOADING_TEXT = 'Loading your plant';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface PlantUpdate {
  id: string;
  picture: {
    url: string;
    createdAt: string;
  };
  noteEntry?: string;
}

const LoadingView = () => (
  <View style={styles.activityIndicator}>
    <Text>{LOADING_TEXT}</Text>
    <ActivityIndicator />
  </View>
);

const PlantView = ({navigation, route}: any) => {
  const [data] = useState(route.params.item);
  const [plantUpdates, setPlantUpdates] = useState<PlantUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const plantId = data.id;

  const userId = getUserId();
  if (!userId) {
    // handle error
    return;
  }

  const getPlantData = useCallback(async () => {
    // apply useCallback to getData and avoiding constant rerendering of the function
    try {
      setIsLoading(true);
      const dbData: any = await getPlantUpdatesCollection(userId, plantId);
      setPlantUpdates(dbData);
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      getPlantData();
    }, [getPlantData]),
  );

  const onAddPicture = () => {
    navigation.navigate('AddPicture', {
      screen: 'AddPicture',
      params: {data: plantId},
    });
  };

  const onAddNoteEntry = (updateId: string) => {
    const update = plantUpdates.find(item => item.id === updateId); // Find the update by updateId
    const note = update?.noteEntry; // Get the specific noteEntry for the clicked updateId
    navigation.navigate('NoteEntry', {
      screen: 'NoteEntry',
      params: {data: {plantId: plantId, updateId: updateId, note: note}},
    });
  };

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topContainer}>
          <Image source={{uri: data.photoURL}} style={styles.topImage} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.date}>{data.createdAt}</Text>
        </View>
        <View style={styles.imageRow}>
          {plantUpdates &&
            plantUpdates.map(item => {
              return (
                <View style={styles.imageContainer} key={item.id}>
                  {item.picture && (
                    <Image
                      source={{uri: item.picture.url}}
                      style={styles.image}
                    />
                  )}
                  <Text style={[styles.date, {fontSize: 16}]}>
                    {item.picture.createdAt}
                  </Text>
                  <Pressable onPress={() => onAddNoteEntry(item.id)}>
                    <Text style={[styles.date, {fontSize: 16}]}>
                      {item.noteEntry ? item.noteEntry : 'Add Note'}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
        </View>
      </ScrollView>
      <RoundButton onPress={onAddPicture} label={CTA_ADD} />
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.background,
  },
  detailsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10,
  },
  name: {
    color: Colors.basicText,
    fontFamily: Fonts.titleFont,
    fontSize: 20,
    marginBottom: 10,
  },
  date: {
    color: Colors.secondaryText,
    fontFamily: Fonts.subtitleFont,
    fontSize: 18,
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight / 3,
    flex: 1,
  },
  topImage: {
    height: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 5,
  },
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 10,
    width: screenWidth / 2 - 20, // Two pictures in a row with padding
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default PlantView;

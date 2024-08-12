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
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import RoundButton from '../components/RoundButton';
import {useFocusEffect} from '@react-navigation/native';
import {getUserId, getPlantUpdatesCollection, formatDate} from '../../utils';
import {useTranslation} from 'react-i18next';
import {Timestamp} from 'firebase/firestore';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface PlantUpdate {
  id: string;
  createdAt: Timestamp;
  picture: {
    url: string;
  };
  noteEntry?: string;
}

interface LoadingViewProps {
  text: string;
}

const LoadingView = ({text}: LoadingViewProps) => (
  <View style={styles.activityIndicator}>
    <Text>{text}</Text>
    <ActivityIndicator />
  </View>
);

const PlantView = ({navigation, route}: any) => {
  const {t} = useTranslation();
  const [data] = useState(route.params.item);
  const [plantUpdates, setPlantUpdates] = useState<PlantUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const plantId = data.id;

  const userId = getUserId();
  if (!userId) {
    // handle error (e.g., redirect or show an error message)
    return null; // or a fallback UI
  }

  const getPlantData = useCallback(async () => {
    try {
      setIsLoading(true);
      const dbData: any = await getPlantUpdatesCollection(userId, plantId);
      setPlantUpdates(dbData);
    } catch (error) {
      // handle error (e.g., show an alert or a notification)
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

  if (isLoading) {
    return <LoadingView text={t('plantView.loading')} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topContainer}>
          <Image source={{uri: data.photoURL}} style={styles.topImage} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.date}>{formatDate(data.createdAt.toDate())}</Text>
        </View>
        <View style={styles.imageRow}>
          {plantUpdates.map(item => (
            <View style={styles.imageContainer} key={item.id}>
              {item.picture && (
                <Image source={{uri: item.picture.url}} style={styles.image} />
              )}
              <Text style={[styles.date, {fontSize: 16}]}>
                {formatDate(item.createdAt.toDate())}
              </Text>
              <Pressable onPress={() => onAddNoteEntry(item.id)}>
                <Text style={[styles.date, {fontSize: 16}]}>
                  {item.noteEntry ? item.noteEntry : 'Add Note'}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
      <RoundButton onPress={onAddPicture} label={t('plantView.ctaAdd')} />
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
    width: screenWidth / 2 - 20,
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default PlantView;

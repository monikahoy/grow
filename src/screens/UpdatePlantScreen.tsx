import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import CameraCapture from '../components/Camera';
import {ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {doc, collection, addDoc, Timestamp} from 'firebase/firestore';
import {db, storage} from '../../firebaseConfig';
import {getUserId} from '../utils/data';
import Colors from '../theme/Colors';
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {RootParamList} from '../utils/types';
import usePlantStore from '../../store/plantsStore';
import {PlantUpdate} from '../utils/models';

const AddPlantUpdate = () => {
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const route = useRoute<RouteProp<RootParamList, 'AddPicture'>>();
  const plantId = route.params?.data.id;
  const userId = getUserId();
  const addUpdate = usePlantStore(state => state.addUpdate);

  if (!userId) {
    // handle error
    return;
  }

  const handleOnAddPicture = async (imageBlob: Blob) => {
    if (!plantId) {
      console.error('No plant ID found.');
      // Handle the absence of plantId as needed (e.g., navigate back or show an error message)
    }
    const storageRef = ref(storage, `users/plants/photos/${uuidv4()}.jpg`);
    await uploadBytes(storageRef, imageBlob);

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    const timestamp = Timestamp.fromDate(new Date());

    const updatesSubcollectionRef = collection(
      doc(db, 'users', userId, 'plants', plantId),
      'updates',
    );

    const newPlantRef = await addDoc(updatesSubcollectionRef, {
      createdAt: timestamp,
      picture: {url: downloadURL},
    });

    const updateId = newPlantRef.id;

    const newUpdate: PlantUpdate = {
      id: updateId,
      createdAt: timestamp,
      picture: {url: downloadURL},
    };

    addUpdate(plantId, newUpdate);

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CameraCapture onCapture={handleOnAddPicture} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topContainer: {
    flex: 1,
  },
});

export default AddPlantUpdate;

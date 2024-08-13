import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import CameraCapture from '../components/Camera';
import {ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {doc, collection, addDoc, Timestamp} from 'firebase/firestore';
import {db, storage} from '../../firebaseConfig';
import {getUserId} from '../utils/utils';
import Colors from '../theme/Colors';

const AddPlantUpdate = ({navigation, route}: any) => {
  const {data: plantId} = route.params.params; // had to handle nested navigator, why there is params 2 times

  const userId = getUserId();
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
    // Create a new document with a unique ID in the updates subcollection
    await addDoc(updatesSubcollectionRef, {
      createdAt: timestamp,
      picture: {url: downloadURL},
    });

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

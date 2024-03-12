import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import CameraCapture from '../../components/Camera';
import {ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';
import {collection, addDoc, updateDoc} from 'firebase/firestore';
import {db, storage} from '../../../firebaseConfig';
import {formatDate, getRandomPlantName, getUserId} from '../../../utils';
import Colors from '../../theme/Colors';

import {NavigationProp} from '@react-navigation/native';

type AddPlantProps = {
  navigation: NavigationProp<any>;
};

const AddPlant = ({navigation}: AddPlantProps) => {
  const handleAddPlant = async (imageBlob: Blob) => {
    const storageRef = ref(storage, `users/plants/photos/${uuidv4()}.jpg`);

    await uploadBytes(storageRef, imageBlob);

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);

    // Save Photo URL in Firestore
    const userId = getUserId();
    if (!userId) {
      console.error('No user ID found.');
      return;
    }

    // Create a reference to the 'plants' subcollection of the user
    const plantsCollectionRef = collection(db, 'users', userId, 'plants');
    const currentDate = new Date();

    // Use addDoc to add a new plant document with a generated plantId
    const newPlantRef = await addDoc(plantsCollectionRef, {
      photoURL: downloadURL,
      createdAt: formatDate(currentDate),
      name: getRandomPlantName(),
    });

    // Get the ID of the newly created document because we want to use it as the id for the plant
    const newPlantId = newPlantRef.id;

    // Update the document with the extracted ID
    await updateDoc(newPlantRef, {
      id: newPlantId,
    });

    navigation.navigate('Home');
    console.log('Photo saved successfully.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <CameraCapture navigation={navigation} onCapture={handleAddPlant} />
      </View>
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

export default AddPlant;

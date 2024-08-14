import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import CameraCapture from '../components/Camera';
import {ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {collection, addDoc, updateDoc, Timestamp} from 'firebase/firestore';
import {db, storage} from '../../firebaseConfig';
import {getRandomPlantName} from '../utils/utils';
import {getUserId} from '../utils/data';
import Colors from '../theme/Colors';
import {NavigationProp} from '@react-navigation/native';

type AddPlantProps = {
  navigation: NavigationProp<any>;
};

const AddPlant = ({navigation}: AddPlantProps) => {
  const handleAddPlant = async (imageBlob: Blob) => {
    try {
      const storageRef = ref(storage, `users/plants/photos/${uuidv4()}.jpg`);
      await uploadBytes(storageRef, imageBlob);
      const downloadURL = await getDownloadURL(storageRef);

      const userId = getUserId();
      if (!userId) {
        console.error('No user ID found.');
        return;
      }

      const plantsCollectionRef = collection(db, 'users', userId, 'plants');
      const timestamp = Timestamp.fromDate(new Date());
      const newPlantRef = await addDoc(plantsCollectionRef, {
        createdAt: timestamp,
        name: getRandomPlantName(),
      });

      const updatesCollectionRef = collection(
        db,
        'users',
        userId,
        'plants',
        newPlantRef.id,
        'updates',
      );
      await addDoc(updatesCollectionRef, {
        createdAt: timestamp,
        picture: {url: downloadURL},
      });

      const newPlantId = newPlantRef.id;
      await updateDoc(newPlantRef, {id: newPlantId});
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error handling image blob in parent:', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <CameraCapture onCapture={handleAddPlant} />
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

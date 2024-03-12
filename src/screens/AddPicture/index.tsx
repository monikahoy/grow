import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import CameraCapture from '../../components/Camera';
import {ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';
import {updateDoc, doc, arrayUnion} from 'firebase/firestore';
import {db, storage} from '../../../firebaseConfig';
import {formatDate, getUserId} from '../../../utils';
import Colors from '../../theme/Colors';

const AddPicture = ({navigation, route}: any) => {
  const {data: plantId} = route.params.params; // had to handle nested navigator, why there is params 2 times

  const handleOnAddPicture = async (imageBlob: Blob) => {
    if (!plantId) {
      console.error('No plant ID found.');
      // Handle the absence of plantId as needed (e.g., navigate back or show an error message)
    }
    const storageRef = ref(storage, `users/plants/photos/${uuidv4()}.jpg`);
    await uploadBytes(storageRef, imageBlob);

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);

    const userId = getUserId();
    if (!userId) {
      // handle error
      return;
    }

    const pictureData = {
      url: downloadURL,
      createdAt: formatDate(new Date()),
    };

    // Save picture in Firestore
    const plantDocumentRef = doc(db, 'users', userId, 'plants', plantId);
    await updateDoc(plantDocumentRef, {
      pictures: arrayUnion(pictureData),
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CameraCapture navigation={navigation} onCapture={handleOnAddPicture} />
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

export default AddPicture;

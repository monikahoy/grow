import React, {useState, useEffect, useRef, RefObject} from 'react';
import 'react-native-get-random-values';
import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import {Camera, useCameraDevices, PhotoFile} from 'react-native-vision-camera';
import Button from './Button';
import RoundButton from './RoundButton';
import {ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';
import {collection, addDoc} from 'firebase/firestore';
import Colors from '../theme/Colors';
import {db, auth, storage} from '../../firebaseConfig';
import {NavigationProp} from '@react-navigation/core';
import plantNames from '../../plant-names';

const getRandomPlantName = () => {
  const randomIndex = Math.floor(Math.random() * plantNames.length);
  return plantNames[randomIndex];
};

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const LoadingView = () => {
  return (
    <View style={styles.activityIndicator}>
      <ActivityIndicator />
    </View>
  );
};

type CameraCaptureProps = {
  uri?: string;
  navigation: NavigationProp<any>;
};

const CameraCapture = ({uri, navigation}: CameraCaptureProps) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [photoUri, setPhotoUri] = useState(uri);
  const [cameraMode, setCameraMode] = useState(uri ? 'show' : 'capture');
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const camera: RefObject<any> = useRef(null);
  const devices = useCameraDevices();
  const image: RefObject<Image> = useRef(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
      setIsLoading(false);
    })();
  }, []);

  const onTakePicture = async () => {
    try {
      if (!camera.current) {
        throw new Error("Can't connect to camera");
      }
      setIsLoading(true);
      setIsCapturing(true);
      const photo: PhotoFile = await camera.current.takePhoto({
        qualityPrioritization: 'speed',
      });
      const photoPath = photo.path;
      const photoPathUri = photoPath;
      setPhotoUri(photoPathUri);
      setCameraMode('show');
      setIsCapturing(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onRetake = () => {
    setIsLoading(true);

    setTimeout(() => {
      setCameraMode('capture');
      setIsLoading(false);
    }, 300);
  };

  const onSave = async () => {
    setIsLoading(true);
    try {
      console.log('saving picture');

      if (!photoUri) {
        console.log('No photo to save.');
        return;
      }

      // Step 1: Read the contents of the image file
      const imageFile = await fetch(photoUri);
      const imageBlob = await imageFile.blob();

      const storageRef = ref(storage, `users/plants/photos/${uuidv4()}.jpg`);

      await uploadBytes(storageRef, imageBlob);

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Save Photo URL in Firestore
      const userId = auth.currentUser && auth.currentUser.uid;
      if (!userId) {
        console.error('No user ID found.');
        return;
      }

      // Create a reference to the 'plants' subcollection of the user
      const plantsCollectionRef = collection(db, 'users', userId, 'plants');
      const currentDate = new Date();

      // Use addDoc to add a new plant document with a generated plantId
      await addDoc(plantsCollectionRef, {
        photoURL: downloadURL,
        createdAt: formatDate(currentDate),
        name: getRandomPlantName(),
      });

      navigation.navigate('Home');
      setIsLoading(false);
      console.log('Photo saved successfully.');
    } catch (error) {
      console.error('Error saving photo:', error);
    }
  };

  if (isLoading) {
    return <LoadingView />;
  }

  if (cameraMode === 'show') {
    return (
      <>
        <View style={styles.buttonsContainer}>
          <Button onPress={onRetake} title="Retake" />
          <Button title="Save" onPress={onSave} />
        </View>
        <View style={styles.topContainer}>
          <Image ref={image} source={{uri: photoUri}} style={styles.image} />
        </View>
        <RoundButton isCameraButton disabled />
      </>
    );
  }

  const device = devices.back;

  if (device == null) {
    return <LoadingView />;
  }

  if (cameraMode === 'capture') {
    return (
      <>
        <View style={styles.topContainer}>
          {hasPermission && (
            <Camera
              style={[StyleSheet.absoluteFill, styles.image]}
              device={device}
              isActive={true}
              photo={true}
              ref={camera}
            />
          )}
        </View>
        <RoundButton onPress={onTakePicture} isCameraButton />
      </>
    );
  }
};

export default CameraCapture;

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  topContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 5,
  },
  button: {},
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

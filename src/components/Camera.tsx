import React, {useState, useEffect, useRef, RefObject} from 'react';
import 'react-native-get-random-values';
import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import {Camera, useCameraDevices, PhotoFile} from 'react-native-vision-camera';
import Button from './Button';
import RoundButton from './RoundButton';
import {NavigationProp} from '@react-navigation/core';

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
  onCapture: (imageBlob: Blob) => void;
};

const CameraCapture = ({uri, navigation, onCapture}: CameraCaptureProps) => {
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
      console.error(error);
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
      if (!photoUri) {
        return;
      }

      // Read the contents of the image file
      const imageFile = await fetch(photoUri);
      // Make it into an image blob for the sake of firebase
      const imageBlob = await imageFile.blob();
      onCapture(imageBlob); // send the imageblob to be handled by the function provided by the parent component
      setIsLoading(false);
    } catch (error) {}
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
    backgroundColor: 'transparent',
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

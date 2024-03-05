import React, {useState, useEffect, useRef, RefObject} from 'react';
import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import {Camera, useCameraDevices, PhotoFile} from 'react-native-vision-camera';
import Button from './Button';
import RoundButton from './RoundButton';
import {getStorage, ref, uploadString, getDownloadURL} from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';
import {updateDoc, doc} from 'firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import {set} from 'firebase/database';
import Colors from '../theme/Colors';

const LoadingView = () => {
  return (
    <View style={styles.activityIndicator}>
      <ActivityIndicator />
    </View>
  );
};

type CameraCaptureProps = {
  uri?: string;
};

const CameraCapture = ({uri}: CameraCaptureProps) => {
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
      setIsLoading(true); // Mark loading as started
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
      setIsLoading(false); // Mark loading as complete
      console.log('loading complete');
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
    setCameraMode('capture');
  };

  const onPressSave = () => {
    console.log('saving picture');
  };

  if (isLoading) {
    return <LoadingView />;
  }

  if (cameraMode === 'show') {
    return (
      <>
        <View style={styles.buttonsContainer}>
          <Button onPress={onRetake} title="Retake" />
          <Button title="Save" onPress={onPressSave} />
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

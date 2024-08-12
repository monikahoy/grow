import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import {Camera, useCameraDevices, PhotoFile} from 'react-native-vision-camera';
import Button from './Button';
import RoundButton from './RoundButton';
import {useTranslation} from 'react-i18next';

const LoadingView = () => (
  <View style={styles.activityIndicator}>
    <ActivityIndicator />
  </View>
);

type CameraCaptureProps = {
  onCapture: (imageBlob: Blob) => void;
};

const CameraCapture = ({onCapture}: CameraCaptureProps) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const [cameraMode, setCameraMode] = useState<'capture' | 'show'>('capture');
  const [isLoading, setIsLoading] = useState(true);
  const {t} = useTranslation();

  const camera = useRef<Camera | null>(null);
  const devices = useCameraDevices();
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
      setPhotoUri(photo.path);
      setCameraMode('show');
    } catch (error) {
      console.error(error);
    } finally {
      // Reset capturing state regardless of whether an errror occurred
      setIsCapturing(false);
      setIsLoading(false);
    }
  };

  const onRetake = () => {
    setIsLoading(true);
    setCameraMode('capture');
    setIsLoading(false);
  };

  const onSave = async () => {
    if (!photoUri) return;

    try {
      setIsLoading(true);
      // Read the contents of the image file
      const imageFile = await fetch(photoUri);
      // Convert the image to a blob for firebase storage
      const imageBlob = await imageFile.blob();
      // Pass the blob to the parent component
      onCapture(imageBlob);
    } catch (error) {
      console.error('Error saving the photo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCaptureMode = () => {
    const device = devices.back;
    if (device == null || !hasPermission) {
      return <LoadingView />;
    }
    return (
      <View style={styles.flexContainer}>
        <Camera
          style={styles.preview}
          device={device}
          isActive={true}
          photo={true}
          ref={camera}
        />
        <RoundButton onPress={onTakePicture} isCameraButton />
      </View>
    );
  };

  const renderShowMode = () => (
    <>
      <View style={styles.buttonsContainer}>
        <Button onPress={onRetake} title={t('camera.retake')} />
        <Button title={t('camera.save')} onPress={onSave} />
      </View>
      <View style={styles.flexContainer}>
        <Image source={{uri: photoUri}} style={styles.preview} />
      </View>
      <RoundButton isCameraButton disabled />
    </>
  );

  if (isLoading) {
    return <LoadingView />;
  }

  return cameraMode === 'capture' ? renderCaptureMode() : renderShowMode();
};

export default CameraCapture;

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  flexContainer: {
    flex: 1,
  },
  preview: {
    flex: 1,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

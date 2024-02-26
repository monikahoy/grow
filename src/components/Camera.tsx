import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Camera, useCameraDevices, PhotoFile} from 'react-native-vision-camera';
import Button from './Button';

const LoadingView = () => {
  return (
    <View>
      <Text>can't find device</Text>
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
  const camera = useRef(null);
  const devices = useCameraDevices();
  const image = useRef();

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const takePhoto = async () => {
    try {
      if (camera.current === null) {
        throw new Error("Can't connect to camera");
      }
      console.log('taking photo');
      setIsCapturing(true);
      const photo: PhotoFile = await camera.current.takePhoto();
      const photoPath = photo.path;
      const photoPathUri = photoPath;
      setPhotoUri(photoPathUri);
      setCameraMode('show');
      setIsCapturing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onRetake = () => {
    setCameraMode('capture');
  };

  if (cameraMode === 'show') {
    return (
      <>
        <View style={styles.topContainer}>
          <Image ref={image} source={{uri: photoUri}} style={styles.image} />
        </View>
        <Button onPress={onRetake} title="retake picture" />
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
        <Button onPress={takePhoto} title="take picture" />
      </>
    );
  }
};

export default CameraCapture;

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 5,
  },
  button: {},
});

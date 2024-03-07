import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddPlant from '../screens/AddPlant';
import AddPicture from '../screens/AddPicture';
import PlantList from '../screens/PlantList';
import PlantView from '../screens/PlantView';
import Colors from '../theme/Colors';
import BasicFonts from '../theme/Fonts';
import CameraCapture from '../components/Camera';
import {Alert, Image, Text, TouchableOpacity} from 'react-native';
import {auth} from '../../firebaseConfig';
import {signOut} from 'firebase/auth';

const Stack = createNativeStackNavigator();

const onSignOut = () => {
  Alert.alert(
    'Sign out',
    'Are you sure you want to sign out?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign out',
        onPress: () => {
          signOut(auth)
            .then(() => {})
            .catch(error => {
              console.log('Error signing out:', error);
            });
        },
      },
    ],
    {cancelable: false},
  );
};

const SignedInStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.headerText,
        headerStyle: {backgroundColor: Colors.background},
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 26,
          fontFamily: BasicFonts.PACIFICO_REGULAR,
        },
      }}>
      <Stack.Screen
        name="Home"
        component={PlantList}
        options={{
          title: 'Home',
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity onPress={onSignOut}>
              <Image
                source={require('../../assets/icons/logout.png')}
                style={{width: 16, height: 16}}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="PlantView"
        component={PlantView}
        options={{title: 'Your plant'}}
      />
      <Stack.Screen
        name="AddPlant"
        component={AddPlant}
        options={{title: 'New plant'}}
      />
      <Stack.Screen
        name="AddPicture"
        component={AddPicture}
        options={{title: 'Edit plant'}}
      />
      <Stack.Screen name="CameraCapture" component={CameraCapture} />
    </Stack.Navigator>
  );
};

export default SignedInStack;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddPlant from '../screens/AddPlantScreen';
import AddPlantUpdate from '../screens/UpdatePlantScreen';
import PlantsList from '../screens/PlantListScreen';
import PlantUpdatesScreen from '../screens/PlantScreen';
import Colors from '../theme/Colors';
import BasicFonts from '../theme/Fonts';
import NoteEntry from '../screens/NoteEntryScreen';
import {Alert, Image, TouchableOpacity} from 'react-native';
import {useCustomAlert} from '../hooks/useCustomAlert';

const Stack = createNativeStackNavigator();

const SignedInStack = () => {
  const {showSignOutAlert} = useCustomAlert();
  const onSignOut = () => {
    showSignOutAlert();
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.headerText,
        headerStyle: {backgroundColor: Colors.background},
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 26,
          fontFamily: BasicFonts.PACIFICO_REGULAR,
        },
      }}>
      <Stack.Screen
        name="Home"
        component={PlantsList}
        options={{
          title: 'Home',
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              onPress={onSignOut}
              hitSlop={{
                top: 15,
                bottom: 15,
                left: 15,
                right: 15,
              }}>
              <Image
                source={require('../../assets/icons/logout.png')}
                style={{width: 16, height: 16}}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddPlant"
        component={AddPlant}
        options={{title: 'New plant'}}
      />
      <Stack.Screen
        name="PlantView"
        component={PlantUpdatesScreen}
        options={{title: 'Your plant'}}
      />
      <Stack.Screen
        name="AddPicture"
        component={AddPlantUpdate}
        options={{title: 'Update plant'}}
      />
      <Stack.Screen
        name="NoteEntry"
        component={NoteEntry}
        options={{title: 'Add a note'}}
      />
    </Stack.Navigator>
  );
};

export default SignedInStack;

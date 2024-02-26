import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddPlant from '../screens/AddPlant';
import AddPicture from '../screens/AddPicture';
import PlantList from '../screens/PlantList';
import PlantView from '../screens/PlantView';
import Colors from '../theme/Colors';
import BasicFonts from '../theme/Fonts';

const Stack = createNativeStackNavigator();

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
      <Stack.Screen name="Home" component={PlantList} />
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
    </Stack.Navigator>
  );
};

export default SignedInStack;

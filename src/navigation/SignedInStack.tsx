import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddPlant from '../screens/AddPlant';
import AddPicture from '../screens/AddPicture';
import PlantList from '../screens/PlantList';
import PlantView from '../screens/PlantView';

const Stack = createNativeStackNavigator();

const SignedInStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={PlantList} />
      <Stack.Screen name="PlantView" component={PlantView} />
      <Stack.Screen name="AddPlant" component={AddPlant} />
      <Stack.Screen name="AddPicture" component={AddPicture} />
    </Stack.Navigator>
  );
};

export default SignedInStack;

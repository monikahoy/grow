import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';

import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();

const SignedOutStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.headerText,
        headerStyle: {backgroundColor: Colors.background},
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: Fonts.PACIFICO_REGULAR,
        },
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default SignedOutStack;

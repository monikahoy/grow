import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Colors from '../theme/Colors';
import BasicFonts from '../theme/Fonts';

import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const SignedOutStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.headerText,
        headerStyle: {backgroundColor: Colors.background},
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: BasicFonts.PACIFICO_REGULAR,
        },
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default SignedOutStack;

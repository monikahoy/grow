import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import SignedInStack from './src/navigation/SignedInStack';
import SignedOutStack from './src/navigation/SignedOutStack';
import {NavigationContainer} from '@react-navigation/native';
import {auth} from './firebaseConfig';
import {onAuthStateChanged} from 'firebase/auth';
import Colors from './src/theme/Colors';
import BootSplash from 'react-native-bootsplash';
import LoadingView from './src/components/LoadingView';

const App = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
      setIsLoading(false); // Set loading to false once auth check is complete
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide();
      }}>
      <SafeAreaView style={styles.container}>
        {signedIn ? <SignedInStack /> : <SignedOutStack />}
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    marginHorizontal: 2,
    marginVertical: 10,
  },
});

export default App;

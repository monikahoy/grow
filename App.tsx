import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SignedInStack from './src/navigation/SignedInStack';
import SignedOutStack from './src/navigation/SignedOutStack';
import {NavigationContainer} from '@react-navigation/native';
import {auth} from './firebaseConfig';
import {onAuthStateChanged} from 'firebase/auth';
import Colors from './src/theme/Colors';

const App = () => {
  const [signedIn, setSignedIn] = useState(false);

  onAuthStateChanged(auth, user => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });

  return (
    <NavigationContainer>
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

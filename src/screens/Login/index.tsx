import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

import Colors from '../../theme/Colors';

const emailInputPlaceholder = 'Email';
const passwordPlaceholder = 'Password';
const ctaSignIn = 'Sign in';
import {auth} from '../../../firebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState<string>('monikaalbh@gmail.com');
  const [password, setPassword] = useState<string>('123456');
  const [error, setError] = useState<string>();

  const onLogin = () => {
    setError('');
    if (email && password) {
      // Login with email and password using firebase
      signInWithEmailAndPassword(auth, email, password)
        .then(res => {
          console.log(res.user);
          console.log('singing in');
        })
        .catch(err => {
          console.log('error', err);
          setError(err.message);
        });
    }
    setEmail('');
    setPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboard}>
        <View style={styles.topContainer}>
          <TextInput
            placeholder={emailInputPlaceholder}
            secureTextEntry={false}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder={passwordPlaceholder}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Button disabled={false} onPress={onLogin} title={ctaSignIn} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboard: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});

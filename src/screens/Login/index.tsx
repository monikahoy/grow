import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import Register from '../Register';

import Colors from '../../theme/Colors';

const emailInputPlaceholder = 'Email';
const passwordPlaceholder = 'Password';
const ctaSignIn = 'Sign in';
import {auth} from '../../../firebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';

const Login = ({navigation}: any) => {
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
          console.log('signing in');
        })
        .catch(err => {
          console.log('error', err);
          setError(err.message);
        });
    }
    setEmail('');
    setPassword('');
  };

  const onNavigateToRegister = () => {
    navigation.navigate(Register);
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
        <View style={styles.bottomContainer}>
          <Button onPress={onLogin} title={ctaSignIn} />
          <View
            style={{
              marginVertical: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Or register </Text>
            <Button
              onPress={onNavigateToRegister}
              title={'here'}
              style={{padding: 0}}
            />
          </View>
        </View>
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
    flexGrow: 1,
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

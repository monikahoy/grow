import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Register from './RegisterScreen';
import {useTranslation} from 'react-i18next';
import Colors from '../theme/Colors';
import {auth} from '../../firebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';

const Login = ({navigation}: any) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>();

  const onLogin = () => {
    setError('');
    if (email && password) {
      // Login with email and password using firebase
      signInWithEmailAndPassword(auth, email, password)
        .then(res => {})
        .catch(err => {
          console.error(err);
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
            placeholder={t('login.email')}
            secureTextEntry={false}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder={t('login.password')}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.bottomContainer}>
          <Button onPress={onLogin} title={t('login.ctaSignIn')} />
          <View
            style={{
              marginVertical: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{t('login.register')}</Text>
            <Button
              onPress={onNavigateToRegister}
              title={t('login.registerHere')}
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

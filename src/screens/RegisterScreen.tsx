import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {auth} from '../../firebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {createUserInFirebase, getUserId} from '../utils/data';
import {useTranslation} from 'react-i18next';
import Colors from '../theme/Colors';

const Register = () => {
  const {t} = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>();

  const validatePassword = () => {
    let isValid = true;
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        isValid = false;
        Alert.alert(t('signup.error.title'), t('signup.error.confirmPassword'));
      }
    }
    return isValid;
  };

  const onRegister = () => {
    setError('');
    if (email && validatePassword()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(res => {})
        .catch(err => {
          setError(err.message);
        });
    }
    const userId = getUserId();
    createUserInFirebase(userId);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboard}>
        <View style={styles.topContainer}>
          <TextInput
            placeholder={t('signup.email')}
            secureTextEntry={false}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder={t('signup.password')}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder={t('signup.confirmPassword')}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Button
            disabled={false}
            onPress={onRegister}
            title={t('signup.ctaSignUp')}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

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
    marginHorizontal: 20,
  },
});

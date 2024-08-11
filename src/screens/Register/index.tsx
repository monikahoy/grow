import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

const emailInputPlaceholder = 'Email';
const passwordPlaceholder = 'Password';
const confirmPasswordPlaceholder = 'Confirm password';
const ctaRegister = 'Register';
import {auth} from '../../../firebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {createUserInFirebase, getUserId} from '../../../utils';

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>();

  const validatePassword = () => {
    let isValid = true;
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        isValid = false;
        setError('Passwords does not match');
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
          <TextInput
            placeholder={confirmPasswordPlaceholder}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <Button disabled={false} onPress={onRegister} title={ctaRegister} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

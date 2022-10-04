import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {useForm} from 'react-hook-form';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

const emailInputPlaceholder = 'Email';
const passwordPlaceholder = 'Password';
const confirmPasswordPlaceholder = 'Confirm password';
const ctaRegister = 'Register';

const Register = () => {
  const onRegister = () => {
    console.log('registering');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <View style={styles.topContainer}>
          <TextInput
            placeholder={emailInputPlaceholder}
            secureTextEntry={false}
          />
          <TextInput placeholder={passwordPlaceholder} secureTextEntry={true} />
          <TextInput
            placeholder={confirmPasswordPlaceholder}
            secureTextEntry={true}
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
  topContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

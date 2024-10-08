import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {updateDoc, doc} from 'firebase/firestore';
import {db} from '../../firebaseConfig';
import {getUserId} from '../utils/data';
import Colors from '../theme/Colors';
import Button from '../components/Button';
import Fonts from '../theme/Fonts';
import {useTranslation} from 'react-i18next';
import {useCustomAlert} from '../hooks/useCustomAlert';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootParamList} from '../utils/types';

const screenHeight = Dimensions.get('window').height;

const NoteEntry = () => {
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const route = useRoute<RouteProp<RootParamList, 'NoteEntry'>>();
  const {t} = useTranslation();
  const {plantId, updateId, note} = route.params.data; // had to handle nested navigator, why there is params 2 times
  const [text, setText] = useState(note);
  const {showCancelConfirmationAlert} = useCustomAlert();

  const onChangeText = (text: string) => {
    setText(text);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOnNoteEntry = async () => {
    try {
      if (!plantId) {
        return; // Exit early since plantId is necessary
      }

      const userId = getUserId();
      if (!userId) {
        return; // Exit early since userId is necessary
      }

      if (!text) {
        return; // Exit early since text is necessary
      }

      // Save note in Firestore
      const plantDocumentRef = doc(
        db,
        'users',
        userId,
        'plants',
        plantId,
        'updates',
        updateId,
      );

      await updateDoc(plantDocumentRef, {
        noteEntry: text,
      });

      navigation.goBack(); // Navigate back after successful update
    } catch (error) {
      console.error('Error updating note entry:', error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  };

  const handleOnCancel = () => {
    showCancelConfirmationAlert(handleGoBack);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Button
          onPress={handleOnCancel}
          title={t('noteEntry.ctaCancel')}
          style={styles.button}
        />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.contentContainer}>
            <TextInput
              onChangeText={onChangeText}
              placeholder={t('noteEntry.placeholder')}
              multiline={true}
              style={styles.textInput}
              value={text}
              placeholderTextColor={Colors.placeholderText}
              autoFocus={!text}
            />

            <View style={styles.buttonContainer}>
              <Button
                onPress={handleOnNoteEntry}
                title={t('noteEntry.ctaSave')}
                disabled={!text}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: Colors.lightBlueGreen,
    height: screenHeight / 3,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  textInput: {
    fontSize: 20,
    fontFamily: Fonts.bodyFont,
    color: Colors.basicText,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
});

export default NoteEntry;

import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {updateDoc, doc} from 'firebase/firestore';
import {db} from '../../../firebaseConfig';
import {getUserId} from '../../../utils';
import Colors from '../../theme/Colors';
import Button from '../../components/Button';
import Fonts from '../../theme/Fonts';

const placeholder =
  'Add your notes here... (e.g., Noticed new leaves, is thriving in the sun, etc.)';
const SAVE = 'Save';
const CANCEL = 'X';
const DELETE = 'Delete';
const CONFIRM = 'Are you sure you want to cancel?';
const CONFIRM_SUBTEXT = 'All your edits will be lost';
const CONFIRM_OK = 'Yes, I am sure';
const CONFIRM_CANCEL = 'No, I want to stay';
const screenHeight = Dimensions.get('window').height;

const NoteEntry = ({navigation, route}: any) => {
  const {plantId, updateId, note} = route.params.params.data; // had to handle nested navigator, why there is params 2 times
  const [text, setText] = useState(note);

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

  const handleOnDelete = async () => {
    // add delete note functionality
  };

  const handleOnCancel = () => {
    Alert.alert(CONFIRM, CONFIRM_SUBTEXT, [
      {
        text: CONFIRM_CANCEL,
      },
      {
        text: CONFIRM_OK,
        onPress: handleGoBack, // Reference to the function
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <Button onPress={handleOnCancel} title={CANCEL} style={styles.button} />
        <View style={styles.contentContainer}>
          <TextInput
            onChangeText={onChangeText}
            placeholder={placeholder}
            multiline={true}
            style={styles.textInput}
            value={text}
          />
          <View style={styles.buttonContainer}>
            <Button onPress={handleOnNoteEntry} title={SAVE} disabled={!text} />
            <Button onPress={handleOnDelete} title={DELETE} disabled={!text} />
          </View>
        </View>
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
    height: screenHeight / 2,
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

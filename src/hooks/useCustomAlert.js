import {Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {signOut} from 'firebase/auth';
import {auth} from '../../firebaseConfig'; // Make sure this path is correct

export const useCustomAlert = () => {
  const {t} = useTranslation();

  // Alert for confirming deletion of a plant
  const showDeletePlantAlert = onPressDelete => {
    Alert.alert(t('deletePlant.title'), t('deletePlant.text'), [
      {
        text: t('deletePlant.no'),
        style: 'cancel',
      },
      {
        text: t('deletePlant.ok'),
        onPress: onPressDelete,
      },
    ]);
  };

  // Alert for confirming deletion of an update
  const showDeleteUpdateAlert = onPressDelete => {
    Alert.alert(t('deleteUpdate.title'), t('deleteUpdate.text'), [
      {
        text: t('deleteUpdate.no'),
        style: 'cancel',
      },
      {
        text: t('deleteUpdate.ok'),
        onPress: onPressDelete,
      },
    ]);
  };

  // Alert for confirming cancellation of an action
  const showCancelConfirmationAlert = handleGoBack => {
    Alert.alert(
      t('noteEntry.cancelConfirmTitle'),
      t('noteEntry.cancelConfirmText'),
      [
        {
          text: t('noteEntry.cancelConfirmNo'),
        },
        {
          text: t('noteEntry.cancelConfirmOk'),
          onPress: handleGoBack, // Reference to the function
        },
      ],
    );
  };

  // Alert for confirming sign-out
  const showSignOutAlert = () => {
    Alert.alert(
      t('signOut.title'),
      t('signOut.text'),
      [
        {
          text: t('signOut.cancel'),
          style: 'cancel',
        },
        {
          text: t('signOut.confirm'),
          onPress: () => {
            signOut(auth)
              .then(() => {
                // Optionally handle sign-out success
              })
              .catch(error => {
                console.error('Error signing out:', error);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return {
    showDeletePlantAlert,
    showDeleteUpdateAlert,
    showCancelConfirmationAlert,
    showSignOutAlert,
  };
};

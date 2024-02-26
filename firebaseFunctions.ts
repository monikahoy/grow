import {setDoc, doc} from 'firebase/firestore';
import {db} from './firebaseConfig';

export const createUserInFirebase = async (userId: string | null) => {
  console.log('creating user in firebase');
  if (!userId) {
    return;
  }
  // Use the 'users' collection and the userId as the document ID
  const userDocRef = doc(db, 'users', userId);

  try {
    await setDoc(userDocRef, {
      // Document data here.
    });
    console.log('user created in firebase');
  } catch (error) {
    console.error('Error creating user in firebase:', error);
  }
};

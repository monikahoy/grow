import {setDoc, doc, getDocs, collection, deleteDoc} from 'firebase/firestore';
import {auth, db} from './firebaseConfig';
import plantNames from './plant-names';

// This function creates a new user in the 'users' collection in Firebase
export const createUserInFirebase = async (userId: string | null) => {
  if (!userId) {
    return;
  }
  // Use the 'users' collection and the userId as the document ID
  const userDocRef = doc(db, 'users', userId);

  try {
    await setDoc(userDocRef, {
      // Document data here.
    });
  } catch (error) {
    console.error('Error creating user in firebase:', error);
  }
};

export const getUserId = () => {
  return auth.currentUser ? auth.currentUser.uid : null;
};

// Get data from the 'users' collection in Firebase
export const getUserPlantDataFromFirebase = async (userId: string | null) => {
  if (!userId) {
    return null;
  }

  const userPLantsCollectionRef = collection(db, 'users', userId, 'plants');

  try {
    const querySnapshot = await getDocs(userPLantsCollectionRef);
    const userData: any = [];
    // Loop through the documents in the querySnapshot
    querySnapshot.forEach(doc => {
      userData.push(doc.data());
    });
    return userData;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error; // rethrow the error to be caught by the calling function
  }
};

export const deleteDocumentFromFirebase = async (
  userId: string | null,
  plantId: string | null,
) => {
  if (!userId) {
    return;
  }
  if (!plantId) {
    return;
  }

  const collectionRef = doc(db, 'users', userId, 'plants', plantId);
  try {
    await deleteDoc(collectionRef);
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};

// Get data from the 'plants' document in Firebase
export const getPlantUpdatesCollection = async (
  userId: string | null,
  plantId: string | null,
) => {
  if (!userId) {
    return null;
  }
  if (!plantId) {
    return null;
  }

  // Create a reference to the document
  const updatesSubcollectionRef = collection(
    doc(db, 'users', userId, 'plants', plantId),
    'updates',
  );
  // Get the documents
  try {
    const documentSnapshot = await getDocs(updatesSubcollectionRef);

    // Map over the documents
    const data = documentSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error('Error getting plant data:', error);
  }
};

export const saveNoteAboutPlant = async (
  userId: string | null,
  plantId: string | null,
  note: string,
) => {
  if (!userId) {
    return;
  }
  if (!plantId) {
    return;
  }

  const collectionRef = doc(db, 'users', userId, 'plants', plantId);
  try {
    await setDoc(collectionRef, {note});
  } catch (error) {
    console.error('Error updating document:', error);
  }
};

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const usedNames = new Set();

export const getRandomPlantName = () => {
  const unusedNames = plantNames.filter(name => !usedNames.has(name));

  if (unusedNames.length === 0) {
    // All names have been used, reset the set
    usedNames.clear();
  }

  const randomIndex = Math.floor(Math.random() * unusedNames.length);
  const selectedName = unusedNames[randomIndex];

  // Mark the selected name as used
  usedNames.add(selectedName);

  return selectedName;
};

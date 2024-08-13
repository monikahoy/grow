import {
  setDoc,
  doc,
  getDocs,
  collection,
  deleteDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import {auth, db} from '../../firebaseConfig';
import plantNames from '../../plant-names';
import {PlantUpdate} from './models';

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

// Function to get user ID
export const getUserId = () => {
  return auth.currentUser ? auth.currentUser.uid : null;
};

// Function to fetch plant data from Firestore
export const getUserPlantDataFromFirebase = async (userId: string | null) => {
  if (!userId) {
    return null;
  }

  const userPLantsCollectionRef = collection(db, 'users', userId, 'plants');

  try {
    // Create a query to order by the createdAt field
    const updatesQuery = query(
      userPLantsCollectionRef,
      orderBy('createdAt', 'desc'),
    );
    const querySnapshot = await getDocs(updatesQuery);
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

// Function to get plant updates collection from Firestore
export const getPlantUpdatesCollection = async (
  userId: string | null,
  plantId: string | null,
) => {
  if (!userId || !plantId) {
    return null;
  }

  try {
    // Create a reference to the updates subcollection
    const updatesSubcollectionRef = collection(
      doc(db, 'users', userId, 'plants', plantId),
      'updates',
    );

    // Create a query to order by the createdAt field
    const updatesQuery = query(
      updatesSubcollectionRef,
      orderBy('createdAt', 'desc'),
    );

    // Get the documents using the query
    const documentSnapshot = await getDocs(updatesQuery);

    // Map over the documents and return the data
    const data = documentSnapshot.docs.map(doc => ({
      id: doc.id,
      createdAt: doc.data().createdAt,
      picture: doc.data().picture,
      noteEntry: doc.data().noteEntry,
    }));

    return data;
  } catch (error) {
    console.error('Error getting plant data:', error);
    return null;
  }
};

// Function to delete a plant collection from Firestore
export const getLatestPlantUpdate = async (
  userId: string | null,
  plantId: string | null,
): Promise<PlantUpdate | null> => {
  if (!userId || !plantId) {
    return null;
  }

  try {
    // Create a reference to the updates subcollection
    const updatesSubcollectionRef = collection(
      doc(db, 'users', userId, 'plants', plantId),
      'updates',
    );

    // Create a query to order by the createdAt field
    const updatesQuery = query(
      updatesSubcollectionRef,
      orderBy('createdAt', 'desc'),
      limit(1),
    );

    // Get the documents using the query
    const documentSnapshot = await getDocs(updatesQuery);

    // Map over the documents and return the data
    const data = documentSnapshot.docs.map(doc => ({
      id: doc.id,
      createdAt: doc.data().createdAt,
      picture: doc.data().picture,
      noteEntry: doc.data().noteEntry,
    }));

    if (data.length === 0) {
      return null;
    }
    return data[0];
  } catch (error) {
    console.error('Error getting plant data:', error);
    return null;
  }
};

// Function to delete a plant document in the plants collection from Firestore
export const deletePlantDocFromFirebase = async (
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

// Function to delete a plant update from Firestore
export const deletePlantUpdateFromFirebase = async (
  userId: string | null,
  plantId: string | null,
  updateId: string | null,
) => {
  if (!userId) {
    return;
  }
  if (!plantId) {
    return;
  }
  if (!updateId) {
    return;
  }

  const collectionRef = doc(
    db,
    'users',
    userId,
    'plants',
    plantId,
    'updates',
    updateId,
  );
  try {
    await deleteDoc(collectionRef);
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};

// Function to save a note about a plant
export const savePlantNoteInFirebase = async (
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

// Non firebase funtions

// Function to format a date into a readable string
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Function to get a random plant name NEED AN UPDATE
const usedNames = new Set();

export const getRandomPlantName = () => {
  const unusedNames = plantNames.filter(name => !usedNames.has(name));

  if (unusedNames.length === 0) {
    // All names have been used, reset the set
    usedNames.clear();
  }

  // Select a random unused name
  const randomIndex = Math.floor(Math.random() * unusedNames.length);
  const selectedName = unusedNames[randomIndex];

  return selectedName;
};

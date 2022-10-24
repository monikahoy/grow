// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyByPk3YHVrUhBa0Yax6rlW81Lkd48llhkE',
  authDomain: 'grow-3dcce.firebaseapp.com',
  projectId: 'grow-3dcce',
  storageBucket: 'grow-3dcce.appspot.com',
  messagingSenderId: '314577782853',
  appId: '1:314577782853:web:ce7675f70722e1e3d93b2c',
  measurementId: 'G-M2Z4LN003C',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

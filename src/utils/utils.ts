import {PlantUpdate} from './models';
import plantNames from '../../plant-names';

// Function to check if two arrays of PlantUpdate objects are the same
export const isSamePlantUpdateArray = (
  currentData: PlantUpdate[],
  newData: PlantUpdate[],
) => {
  if (currentData.length !== newData.length) {
    return false;
  }
  for (let i = 0; i < currentData.length; i++) {
    if (currentData[i].noteEntry !== newData[i].noteEntry) {
      return false;
    }
  }
  return true;
};

// Function to format a date into a readable string
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Function to get a random plant name NEED AN UPDATE WHERE IT CHECKS AGAINST FIREBASE NAMES
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

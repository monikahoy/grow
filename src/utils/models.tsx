import {Timestamp} from 'firebase/firestore';

export type Plant = {
  id: string;
  name: string;
  createdAt: Date;
};

export type PlantUpdate = {
  id: string;
  createdAt: Timestamp;
  picture: {
    url: string;
  };
  noteEntry?: string;
};

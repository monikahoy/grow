import {it, expect} from '@jest/globals';
import {PlantUpdate} from '../src/utils/models';
import {Timestamp} from 'firebase/firestore';
import {isSamePlantUpdateArray} from '../src/utils/utils';

it('returns true if the contents of both arrays is the same', () => {
  const plantUpdates1: PlantUpdate[] = [
    {
      id: '1',
      createdAt: Timestamp.fromDate(new Date('2022-01-01')),
      picture: {
        url: 'url1',
      },
      noteEntry: 'note1',
    },
    {
      id: '2',
      createdAt: Timestamp.fromDate(new Date('2022-01-01')),
      picture: {
        url: 'url1',
      },
      noteEntry: 'note1',
    },
  ];
  const plantUpdates2: PlantUpdate[] = [
    {
      id: '1',
      createdAt: Timestamp.fromDate(new Date('2022-01-01')),
      picture: {
        url: 'url1',
      },
      noteEntry: 'note1',
    },
    {
      id: '2',
      createdAt: Timestamp.fromDate(new Date('2022-01-01')),
      picture: {
        url: 'url1',
      },
      noteEntry: 'note1',
    },
  ];

  expect(isSamePlantUpdateArray(plantUpdates1, plantUpdates2)).toBe(true);
});

it('returns false if the contents of both arrays is different', () => {
  const plantUpdates1: PlantUpdate[] = [
    {
      id: '1',
      createdAt: Timestamp.fromDate(new Date('2022-01-01')),
      picture: {
        url: 'url1',
      },
      noteEntry: 'note1',
    },
    {
      id: '2',
      createdAt: Timestamp.fromDate(new Date('2022-01-01')),
      picture: {
        url: 'url1',
      },
      noteEntry: 'note1',
    },
  ];
  const plantUpdates2: PlantUpdate[] = [
    {
      id: '1',
      createdAt: Timestamp.fromDate(new Date('2022-01-01')),
      picture: {
        url: 'url1',
      },
      noteEntry: 'note1',
    },
    {
      id: '2',
      createdAt: Timestamp.fromDate(new Date('2022-01-01')),
      picture: {
        url: 'url1',
      },
      noteEntry: 'note1 changed!',
    },
  ];

  expect(isSamePlantUpdateArray(plantUpdates1, plantUpdates2)).toBe(false);
});

it('returns false if the arrays have different lengths', () => {
  const plantUpdates1: PlantUpdate[] = [
    {
      id: '1',
      createdAt: Timestamp.fromDate(new Date('2022-01-01')),
      picture: {
        url: 'url1',
      },
      noteEntry: 'note1',
    },
    {
      id: '2',
      createdAt: Timestamp.fromDate(new Date('2022-01-01')),
      picture: {
        url: 'url1',
      },
      noteEntry: 'note1',
    },
  ];
  const plantUpdates2: PlantUpdate[] = [
    {
      id: '1',
      createdAt: Timestamp.fromDate(new Date('2022-01-01')),
      picture: {
        url: 'url1',
      },
      noteEntry: 'note1',
    },
  ];

  expect(isSamePlantUpdateArray(plantUpdates1, plantUpdates2)).toBe(false);
});

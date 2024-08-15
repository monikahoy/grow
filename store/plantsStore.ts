import {create} from 'zustand';
import {Plant, PlantUpdate} from '../src/utils/models';
import {
  getPlantUpdatesCollection,
  getUserPlantDataFromFirebase,
} from '../src/utils/data';

interface PlantState {
  plants: Array<Plant>;
  plantUpdates: Record<string, Array<PlantUpdate>>; // Map plantId to an array of updates
  isLoading: boolean;
  loadPlants: (userId: string) => Promise<void>;
  loadPlantUpdates: (userId: string, plantId: string) => Promise<void>;
  deletePlant: (plantId: string) => void;
  deleteUpdate: (plantId: string, updateId: string) => void;
  addNoteToUpdate: (plantId: string, updateId: string, note: string) => void;
}

const usePlantStore = create<PlantState>(set => ({
  plants: [],
  plantUpdates: {},
  isLoading: true,
  loadPlants: async (userId: string) => {
    try {
      set({isLoading: true});
      const dbData: Plant[] = await getUserPlantDataFromFirebase(userId);
      set({plants: dbData});
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      set({isLoading: false});
    }
  },
  loadPlantUpdates: async (userId: string, plantId: string) => {
    try {
      set({isLoading: true});
      const dbData: PlantUpdate[] =
        (await getPlantUpdatesCollection(userId, plantId)) || [];
      set(state => ({
        plantUpdates: {
          ...state.plantUpdates,
          [plantId]: dbData, // Update the specific plantId with the fetched updates
        },
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error fetching plant updates:', error);
      set({isLoading: false});
    }
  },
  deletePlant: plantId => {
    set(state => {
      const updatedPlants = state.plants.filter(plant => plant.id !== plantId);

      const updatedPlantUpdates = {...state.plantUpdates};
      delete updatedPlantUpdates[plantId];

      return {
        plants: updatedPlants,
        plantUpdates: updatedPlantUpdates,
      };
    });
  },
  deleteUpdate: (plantId, updateId) => {
    set(state => ({
      plantUpdates: {
        ...state.plantUpdates,
        [plantId]: (state.plantUpdates[plantId] || []).filter(
          update => update.id !== updateId,
        ),
      },
    }));
  },
  addNoteToUpdate: (plantId: string, updateId: string, note: string) =>
    set(state => ({
      plantUpdates: {
        ...state.plantUpdates,
        [plantId]: (state.plantUpdates[plantId] || []).map(update =>
          update.id === updateId ? {...update, noteEntry: note} : update,
        ),
      },
    })),
}));

export default usePlantStore;

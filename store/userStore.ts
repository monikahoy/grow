import {create} from 'zustand';

// Define the UserState interface
interface UserState {
  userId: string | null; // `userId` can be a string or null
  setUserId: (id: string | null) => void; // Function to set `userId`
}

// Create the Zustand store
const useUserStore = create<UserState>(set => ({
  userId: null, // Initial value for `userId`
  setUserId: (id: string | null) => set({userId: id}), // Function to update `userId`
}));

export default useUserStore;

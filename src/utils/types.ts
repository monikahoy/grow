export type RootParamList = {
  Register: undefined;
  Home: undefined;
  AddPicture: {data: {id: string}};
  AddPlant: undefined;
  PlantView: {data: {id: string; name: string}};
  NoteEntry: {
    data: {plantId: string; updateId: string; note: string | undefined};
  };
};

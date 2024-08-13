export type Plant = {
  id: string;
  name: string;
  createdAt: Date;
};
export type PlantUpdate = {
  createdAt: Date;
  picture: {
    url: string;
  };
};

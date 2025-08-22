export type Album = {
  id: string;
  title: string;
  userId: string;
};

export type Photo = {
  id: string;
  url: string;
  albumId: string;
};

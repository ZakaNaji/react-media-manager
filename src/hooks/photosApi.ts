import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_ROOT as string;

const photosApi = createApi({
  reducerPath: "photosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      getPhotosByAlbumId: builder.query({
        query(album) {
          return {
            url: `/photos?albumId=${album.id}`,
            method: "GET",
          };
        },
      }),
      addPhoto: builder.mutation({
        query(album) {
          return {
            url: "/photos",
            method: "POST",
            body: {
              url: faker.image.abstract(500, 500, true),
              albumId: album.id,
            },
          };
        },
      }),
      removePhoto: builder.mutation({
        query(photo) {
          return {
            url: `/photos/${photo.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

const pause = (durration: number) => {
  if (import.meta.env.VITE_SIMULATE_DATA_FETCHING) {
    return new Promise((resolve) => setTimeout(resolve, durration));
  }
};

export { photosApi };
export const {
  useGetPhotosByAlbumIdQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;

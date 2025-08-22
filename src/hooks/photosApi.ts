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
        query(albumId) {
          return {
            url: `/photos?albumId=${albumId}`,
            method: "GET",
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
export const { useGetPhotosByAlbumIdQuery } = photosApi;

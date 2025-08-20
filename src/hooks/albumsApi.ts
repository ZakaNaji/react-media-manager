import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Album } from "../types/album";
import { use } from "react";
import type { User } from "../types/user";
import { faker } from "@faker-js/faker";

const baseUrl = import.meta.env.VITE_API_ROOT as string;

export const albumsApi = createApi({
  reducerPath: "albumsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  tagTypes: ["Album"] as const,
  endpoints(builder) {
    return {
      getAlbumsByUserId: builder.query<Album[], string>({
        query: (userId) => ({
          url: "/albums",
          params: { userId },
          method: "GET",
        }),
        providesTags: (results, error, arg) => {
          return [{ type: "Album", id: arg }];
        },
      }),
      addAlbum: builder.mutation<Album, User, Album>({
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
        invalidatesTags: (results, error, arg) => {
          return [{ type: "Album", id: arg.id }];
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

export const { useGetAlbumsByUserIdQuery, useAddAlbumMutation } = albumsApi;

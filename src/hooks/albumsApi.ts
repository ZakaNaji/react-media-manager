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
  }),
  endpoints(builder) {
    return {
      getAlbumsByUserId: builder.query<Album[], string>({
        query: (userId) => ({
          url: "/albums",
          params: { userId },
          method: "GET",
        }),
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
      }),
    };
  },
});

export const { useGetAlbumsByUserIdQuery, useAddAlbumMutation } = albumsApi;

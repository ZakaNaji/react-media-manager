import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Album } from "../types/album";

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
    };
  },
});

export const { useGetAlbumsByUserIdQuery } = albumsApi;

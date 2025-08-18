import React from "react";
import type { User } from "../types/user";
import { useGetAlbumsByUserIdQuery } from "../hooks/albumsApi";

export default function AlbumsList({ user }: { user: User }) {
  const {
    data: albums,
    isLoading,
    isError,
  } = useGetAlbumsByUserIdQuery(user.id);
  return (
    <div>
      {albums?.map((album) => (
        <div key={album.id}>{album.title}</div>
      ))}
    </div>
  );
}

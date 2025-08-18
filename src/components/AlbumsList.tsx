import React from "react";
import type { User } from "../types/user";
import { useGetAlbumsByUserIdQuery } from "../hooks/albumsApi";
import Expandablepanel from "./Expandablepanel";
import Header from "./Header";

export default function AlbumsList({ user }: { user: User }) {
  const {
    data: albums,
    isLoading,
    isError,
  } = useGetAlbumsByUserIdQuery(user.id);

  const handleClick = () => {};

  return (
    <div>
      {albums?.map((album) => (
        <Expandablepanel
          key={album.id}
          header={
            <Header
              data={album.title}
              isLoading={isLoading}
              handleClick={handleClick}
            />
          }
        >
          Test
        </Expandablepanel>
      ))}
    </div>
  );
}

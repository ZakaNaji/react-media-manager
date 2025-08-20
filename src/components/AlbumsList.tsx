import React from "react";
import type { User } from "../types/user";
import {
  useAddAlbumMutation,
  useGetAlbumsByUserIdQuery,
} from "../hooks/albumsApi";

import Button from "./Button";
import Skeleton from "./Skeleton";
import AlbumsListitem from "./AlbumsListitem";

export default function AlbumsList({ user }: { user: User }) {
  const { data: albums, isLoading } = useGetAlbumsByUserIdQuery(user.id);

  const [addAlbum, addResults] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  if (isLoading) {
    return <Skeleton classeName="h-10 w-full" times={3} />;
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums by: {user.name}</h3>
        <Button isLoading={addResults.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>
        {albums?.map((album) => (
          <AlbumsListitem key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
}

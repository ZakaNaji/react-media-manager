import React from "react";
import type { User } from "../types/user";
import {
  useAddAlbumMutation,
  useGetAlbumsByUserIdQuery,
} from "../hooks/albumsApi";
import Expandablepanel from "./Expandablepanel";
import Header from "./Header";
import Button from "./Button";
import Skeleton from "./Skeleton";

export default function AlbumsList({ user }: { user: User }) {
  const {
    data: albums,
    isLoading,
    isError,
    isFetching,
  } = useGetAlbumsByUserIdQuery(user.id);

  const [addAlbum, results] = useAddAlbumMutation();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

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
        <Button isLoading={results.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
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
    </div>
  );
}

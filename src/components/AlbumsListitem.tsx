import React from "react";
import type { Album } from "../types/album";
import Expandablepanel from "./Expandablepanel";
import Header from "./Header";
import { useDeleteAlbumMutation } from "../hooks/albumsApi";
import PhotosList from "./PhotosList";

export default function AlbumsListitem({ album }: { album: Album }) {
  const [deleteAlbum, deleteResults] = useDeleteAlbumMutation();

  const handleClick = (e: React.MouseEvent, album: Album) => {
    e.stopPropagation();
    deleteAlbum(album);
  };

  return (
    <Expandablepanel
      header={
        <Header
          data={album.title}
          isLoading={deleteResults.isLoading}
          handleClick={(e) => handleClick(e, album)}
        />
      }
    >
      <PhotosList album={album} />
    </Expandablepanel>
  );
}

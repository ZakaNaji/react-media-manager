import React from "react";
import type { Photo } from "../types/album";
import { GoTrashcan } from "react-icons/go";
import { useRemovePhotoMutation } from "../hooks/photosApi";

export default function PhotosListItem({ photo }: { photo: Photo }) {
  const [deletePhoto, deletePhotoResults] = useRemovePhotoMutation();
  const handleDeletePhoto = () => {
    deletePhoto(photo);
  };
  return (
    <div className="relative m-2" onClick={handleDeletePhoto}>
      <img className="h-20 w-20" src={photo.url} />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        <GoTrashcan className="text-3xl" />
      </div>
    </div>
  );
}

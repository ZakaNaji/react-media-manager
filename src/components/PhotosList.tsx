import {
  useAddPhotoMutation,
  useGetPhotosByAlbumIdQuery,
} from "../hooks/photosApi";
import type { Album, Photo } from "../types/album";
import Button from "./Button";
import PhotosListItem from "./PhotosListItem";
import Skeleton from "./Skeleton";

export default function PhotosList({ album }: { album: Album }) {
  const { data, isFetching } = useGetPhotosByAlbumIdQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content;
  if (isFetching) {
    content = <Skeleton classeName="h-8 w-8" times={3} />;
  } else {
    content = data?.map((photo: Photo) => (
      <PhotosListItem key={photo.id} photo={photo} />
    ));
  }
  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Images of Album: {album.title}</h3>
        <Button isLoading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
          + Add photo
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">
        {content}
      </div>
    </div>
  );
}

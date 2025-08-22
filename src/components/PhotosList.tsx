import { useGetPhotosByAlbumIdQuery } from "../hooks/photosApi";
import type { Album, Photo } from "../types/album";
import Skeleton from "./Skeleton";

export default function PhotosList({ album }: { album: Album }) {
  const { data, isFetching } = useGetPhotosByAlbumIdQuery(album.id);
  if (isFetching) {
    return <Skeleton classeName="h-10 w-full" times={3} />;
  }
  return <div>{data?.map((photo: Photo) => photo.url)}</div>;
}

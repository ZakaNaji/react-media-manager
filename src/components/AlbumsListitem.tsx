import React from "react";
import type { Album } from "../types/album";
import Expandablepanel from "./Expandablepanel";
import Header from "./Header";

export default function AlbumsListitem({ album }: { album: Album }) {
  return (
    <Expandablepanel
      header={
        <Header data={album.title} isLoading={false} handleClick={() => {}} />
      }
    >
      Test
    </Expandablepanel>
  );
}

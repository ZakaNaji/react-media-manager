import React from "react";
import type { User } from "../types/user";

export default function AlbumsList({ user }: { user: User }) {
  return <div>AlbumsList for user: {user.name}</div>;
}

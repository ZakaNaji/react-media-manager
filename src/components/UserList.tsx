import React, { useEffect } from "react";
import { fetchUsers } from "../store/thunks/userThunk";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import type { User } from "../types/user";

export default function UserList() {
  const dispatch = useAppDispatch();
  const users: User[] = useAppSelector((state) => state.users.data);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div>
      {users.map((user) => (
        <h1>{user.name}</h1>
      ))}
    </div>
  );
}

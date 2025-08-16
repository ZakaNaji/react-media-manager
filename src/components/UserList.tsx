import React, { useEffect } from "react";
import { fetchUsers } from "../store/thunks/userThunk";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import type { User } from "../types/user";

export default function UserList() {
  const dispatch = useAppDispatch();
  const users: User[] = useAppSelector((state) => state.users.data);
  const error = useAppSelector((state) => state.users.error);
  const isLoading = useAppSelector((state) => state.users.isLoading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div>
      {isLoading ? (
        <h1>...</h1>
      ) : (
        users.map((user) => <h1 key={user.id}>{user.name}</h1>)
      )}
    </div>
  );
}

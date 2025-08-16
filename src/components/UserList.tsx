import React, { useEffect } from "react";
import { fetchUsers } from "../store/thunks/userThunk";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import type { User } from "../types/user";
import Skeleton from "./Skeleton";

export default function UserList() {
  const dispatch = useAppDispatch();
  const users: User[] = useAppSelector((state) => state.users.data);
  const error = useAppSelector((state) => state.users.error);
  const isLoading = useAppSelector((state) => state.users.isLoading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton times={5} classeName="h-10 w-full" />;
  }

  if (error) {
    return <div>SOMETHING WENT WRONG</div>;
  }

  const renderedUsers = users.map((user) => {
    return (
      <div key={user.id} className="mb-2 rounded border">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  return <div>{renderedUsers}</div>;
}

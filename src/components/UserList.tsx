import React, { use, useEffect } from "react";
import { addUser, fetchUsers } from "../store/thunks/userThunk";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import type { User } from "../types/user";
import Skeleton from "./Skeleton";
import UserComponent from "./User";
import Button from "./Button";

export default function UserList() {
  const dispatch = useAppDispatch();
  const users: User[] = useAppSelector((state) => state.users.data);
  const error = useAppSelector((state) => state.users.error);
  const isLoading = useAppSelector((state) => state.users.isLoading);

  const handleAddUser = () => {
    dispatch(addUser());
  };

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
    return <UserComponent user={user} key={user.id} />;
  });

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button onClick={handleAddUser}>ADD user</Button>
      </div>
      {renderedUsers}
    </div>
  );
}

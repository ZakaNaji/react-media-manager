import { useEffect, useState } from "react";
import { addUser, fetchUsers } from "../store/thunks/userThunk";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import type { User } from "../types/user";
import Skeleton from "./Skeleton";
import UserComponent from "./User";
import Button from "./Button";

export default function UserList() {
  const dispatch = useAppDispatch();
  const users: User[] = useAppSelector((state) => state.users.data);

  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [loadingUsersError, setLoadingUsersError] = useState<string | null>(
    null
  );

  const [isAddUserLoading, setIsAddUserLoading] = useState<boolean>(false);
  const [addUserError, setAddUserError] = useState<string | null>(null);

  const handleAddUser = () => {
    setIsAddUserLoading(true);
    dispatch(addUser())
      .unwrap()
      .catch((err) => setAddUserError(err.message))
      .finally(() => setIsAddUserLoading(false));
  };

  useEffect(() => {
    setIsUserLoading(true);
    dispatch(fetchUsers())
      .unwrap()
      .catch((err) => setLoadingUsersError(err.message))
      .finally(() => setIsUserLoading(false));
  }, [dispatch]);

  if (isUserLoading) {
    return <Skeleton times={5} classeName="h-10 w-full" />;
  }

  if (loadingUsersError) {
    return <div>SOMETHING WENT WRONG: {loadingUsersError}</div>;
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

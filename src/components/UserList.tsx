import { useEffect } from "react";
import { addUser, fetchUsers } from "../store/thunks/userThunk";
import { useAppSelector } from "../hooks/hooks";
import type { User } from "../types/user";
import Skeleton from "./Skeleton";
import UserComponent from "./User";
import Button from "./Button";
import { useThunk } from "../hooks/useThunk";

export default function UserList() {
  const users: User[] = useAppSelector((state) => state.users.data);

  const [doFetchUsers, isUserLoading, loadingUsersError] = useThunk(fetchUsers);

  const [doAddUser, isAddUserLoading, addUserError] = useThunk(addUser);

  const handleAddUser = () => {
    doAddUser();
  };

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  let content;

  if (isUserLoading) {
    content = <Skeleton times={5} classeName="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>SOMETHING WENT WRONG: {loadingUsersError}</div>;
  } else {
    content = users.map((user) => {
      return <UserComponent user={user} key={user.id} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button isLoading={isAddUserLoading} onClick={handleAddUser}>
          + ADD user
        </Button>
      </div>
      {content}
    </div>
  );
}

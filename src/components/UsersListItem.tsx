import { GoTrashcan } from "react-icons/go";
import type { User } from "../types/user";
import Button from "./Button";
import { useThunk } from "../hooks/useThunk";
import { deleteUser } from "../store/thunks/userThunk";
import Expandablepanel from "./Expandablepanel";

export default function UserComponent({ user }: { user: User }) {
  const [doDeleteUser, isLoading, error] = useThunk(deleteUser);
  const handleDelete = () => {
    doDeleteUser(user.id);
  };

  const header = (
    <>
      <Button className="mr-3" onClick={handleDelete} isLoading={isLoading}>
        <GoTrashcan />
      </Button>
      {user.name}
    </>
  );
  return <Expandablepanel header={header}>CONTENT!!</Expandablepanel>;
}

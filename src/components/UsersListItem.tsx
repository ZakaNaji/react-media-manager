import { GoTrashcan } from "react-icons/go";
import type { User } from "../types/user";
import Button from "./Button";
import { useThunk } from "../hooks/useThunk";
import { deleteUser } from "../store/thunks/userThunk";

export default function UserComponent({ user }: { user: User }) {
  const [doDeleteUser, isLoading, error] = useThunk(deleteUser);
  const handleDelete = () => {
    doDeleteUser(user.id);
  };
  return (
    <div key={user.id} className="mb-2 rounded border">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex flex-row items-center justify-between">
          {error && <div>Something went wrong: {error}</div>}
          <Button className="mr-3" onClick={handleDelete} isLoading={isLoading}>
            <GoTrashcan />
          </Button>
          {user.name}
        </div>
      </div>
    </div>
  );
}

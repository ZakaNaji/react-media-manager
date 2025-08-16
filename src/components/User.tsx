import type { User } from "../types/user";

export default function UserComponent({ user }: { user: User }) {
  return (
    <div key={user.id} className="mb-2 rounded border">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        {user.name}
      </div>
    </div>
  );
}

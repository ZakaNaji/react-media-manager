import type { ReactNode } from "react";
import Button from "./Button";
import { GoTrashcan } from "react-icons/go";

interface HeaderProps {
  handleClick: React.MouseEventHandler;
  isLoading: boolean;
  data: ReactNode;
}

export default function Header({ handleClick, isLoading, data }: HeaderProps) {
  return (
    <>
      <Button className="mr-3" onClick={handleClick} isLoading={isLoading}>
        <GoTrashcan />
      </Button>
      {data}
    </>
  );
}

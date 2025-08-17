import { useState, type ReactNode } from "react";
import { GoChevronDown, GoChevronLeft, GoChevronRight } from "react-icons/go";

export default function Expandablepanel({
  header,
  children,
}: {
  header: ReactNode;
  children: ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const chevron = isExpanded ? <GoChevronDown /> : <GoChevronLeft />;

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div className="mb-2 rounded border">
      <div
        className="flex p-2 justify-between items-center cursor-pointer"
        onClick={handleExpand}
      >
        <div className="flex flex-row items-center justify-between">
          {header}
        </div>
        {chevron}
      </div>
      {isExpanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
}

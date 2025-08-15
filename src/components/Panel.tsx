import classNames from "classnames";
import type { ReactNode } from "react";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className: string;
}

function Panel({ children, className, ...rest }: PanelProps) {
  const finalClassNames = classNames(
    "border rounded p-3 shadow bg-white w-full",
    className
  );

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}

export default Panel;

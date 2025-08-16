import classNames from "classnames";

export default function Skeleton({
  times,
  classeName,
}: {
  times: number;
  classeName?: string;
}) {
  const outerClassNames = classNames(
    "relative",
    "overflow-hidden",
    "bg-gray-200",
    "rounded",
    "mb-2.5",
    classeName
  );
  const innerClassNames = classNames(
    "absolute inset-0 -translate-x-full", // start off-screen left
    "bg-gradient-to-r from-gray-200 via-white to-gray-200",
    "animate-shimmer",
    "pointer-events-none", // ignore mouse
    "[background-size:200%_100%]" // smoother highlight band
  );
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => (
      <div key={i} className={outerClassNames}>
        <div className={innerClassNames}></div>
      </div>
    ));
  return boxes;
}

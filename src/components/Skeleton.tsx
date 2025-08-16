export default function Skeleton({ times }: { times: number }) {
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => <div key={i}></div>);
  return boxes;
}

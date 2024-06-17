import { Skeleton } from "@/components/ui";
import { useResizableContext } from "@/context/resizable/resizable.context";
import { childResourceIndent } from "@/functions";

interface FileSkeletonProps {
  level: number;
}

export const FileSkeleton = ({ level }: FileSkeletonProps): JSX.Element => {
  const { widths } = useResizableContext();
  return (
    <li className="flex items-center space-x-4 cursor-progress">
      <div
        className="fric space-x-2 py-1"
        style={{ width: `${widths[0]}%`, ...childResourceIndent(level) }}
      >
        <Skeleton className="size-7 rounded-lg" />
        <Skeleton className="h-7 w-full" />
      </div>
      <Skeleton style={{ width: `${widths[1]}%` }} className="h-7 py-1" />
      <Skeleton style={{ width: `${widths[2]}%` }} className="h-7 py-1" />
    </li>
  );
};

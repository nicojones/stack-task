import { Skeleton } from "@/components/ui";
import { useResizableContext } from "@/context/resizable/resizable.context";
import { childResourceIndent } from "@/functions";
import { IResizableColumn } from "@/types";

interface FileSkeletonProps {
  level: number;
}

export const FileSkeleton = ({ level }: FileSkeletonProps): JSX.Element => {
  const { widths, columns } = useResizableContext();

  return (
    <li className="flex items-center space-x-5 cursor-progress">
      <div
        className="fric space-x-3 py-1"
        style={{ width: `${widths[0]}%`, ...childResourceIndent(level) }}
      >
        <Skeleton className="size-5" />
        <Skeleton className="size-7 rounded-lg" />
        <Skeleton className="h-7 w-full" />
      </div>
      {
        columns
          .filter(c => c.type === "panel")
          .map((c: IResizableColumn, index: number) =>
            index === 0
              ? null
              : (
                <Skeleton
                  key={c.id}
                  style={{ width: `${widths[index]}%` }}
                  className="h-7 py-1"
                />
              ),
          )
      }
    </li>
  );
};

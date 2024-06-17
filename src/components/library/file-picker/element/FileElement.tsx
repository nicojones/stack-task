
import moment from "moment";
import Image from "next/image";
import { useId, useState } from "react";
import { toast } from "sonner";

import { iconFile, iconFolder, iconFolderOpen } from "@/assets";
import { Button, Checkbox } from "@/components/ui";
import { useFilesContext } from "@/context";
import { useResizableContext } from "@/context/resizable/resizable.context";
import { DATE_FORMATS } from "@/definitions/date-formats";
import { childResourceIndent, resourceFileName } from "@/functions";
import { cn } from "@/lib/utils";
import { IConnectionResourceElement, IFilePickerSharedProps, PDefault } from "@/types";

import { FileElementResources } from "./FileElementResources";

interface FileElementProps extends IFilePickerSharedProps {
  /**
   * The data pertaining to this resource
   */
  resource: IConnectionResourceElement;
}

export const FileElement = ({ path = [], resource, level }: FileElementProps): JSX.Element => {
  const { widths, hasColumn, columns } = useResizableContext();
  const {
    isSelected,
    isChecked,
    selectResource,
    unselectResource,
  } = useFilesContext(path);
  const [openFolder, setOpenFolder] = useState<boolean>(false);
  const toastId = useId();
  const resourceName = resourceFileName(resource);

  const _selected = isSelected();
  const _checked = _selected ? isChecked() : false;

  const toggleFolder = (e: PDefault): void => {
    e.preventDefault();
    e.stopPropagation();

    setOpenFolder(_open => !_open);
  };

  const handleCheckedChange = (): void => {
    if (_selected && _checked) {
      unselectResource();
    } else if (_selected && !_checked) {
      // Do not show the same error twice
      toast(
        `To unselect ${resourceName}, please unselect the corresponding parent and select its siblings instead`,
        { duration: 10000, id: toastId },
      );
    } else {
      selectResource();
    }
  };

  return (
    <>
      <li className="fric select-text">
        {
          hasColumn("file") &&
          <div
            className="fric space-x-2"
            style={{ width: `${widths[0]}%`, ...childResourceIndent(level) }}
          >
            <Checkbox
              checked={_selected}
              className={cn({ "cursor-not-allowed opacity-40": _selected && !_checked })}
              onCheckedChange={handleCheckedChange}
            />
            {
              resource.inode_type === "directory"
                ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFolder}
                    className={cn(openFolder ? "cursor-row-resize" : "cursor-ns-resize")}
                  >
                    <Image
                      width={24}
                      height={24}
                      src={
                        openFolder
                          ? iconFolderOpen
                          : iconFolder
                      }
                      alt={"Directory Icon " + (openFolder ? "Open" : "Closed")}
                    />
                  </Button>
                )
                : (
                  <>
                    <Button variant="ghost" size="icon" disabled className="disabled:opacity-100">
                      <Image
                        width={24}
                        height={24}
                        src={iconFile}
                        alt="File Icon"
                      />
                    </Button>
                  </>
                )
            }
            <span
              className="text-sm"
              title={`Full path: /${resource.inode_path.path}`}
            >{resourceName}
            </span>
          </div>
        }
        {
          hasColumn("indexed") &&
          <div
            style={{ width: `${widths[1]}%` }}
            title={moment(resource.indexed_at).fromNow(false)}
            className={cn({ "cursor-help": !!resource.indexed_at })}
          >
            {
              resource.indexed_at
                ? (
                  <small>{moment(resource.indexed_at).format(DATE_FORMATS.mdhm)}</small>
                )
                : (
                  <small className="text-slate-300">(not indexed)</small>
                )
            }
          </div>
        }
        {
          hasColumn("createdAt") &&
          <div
            style={{ width: `${widths[2]}%` }}
            className="cursor-help"
            title={moment(resource.created_at).fromNow(false)}
          >
            <small>{moment(resource.created_at).format(DATE_FORMATS.mdhm)}</small>
          </div>
        }
        {
          hasColumn("actions") &&
          <div
            style={{ width: `${widths[3]}%` }}
            className="cursor-help"
          >
            {
              columns.find(c => c.id === "actions")?.actions?.({ resource, knowledgeBaseId: "TBD" })
            }
          </div>
        }
      </li>

      {
        openFolder &&
        <FileElementResources
          path={path}
          resourceId={resource.resource_id}
          resourcePath={resource.inode_path.path}
          level={level + 1}
        />
      }
    </>

  );
};

"use client";

import { CheckCircledIcon, CopyIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

import { copyToClipboard, delay } from "@/functions";
import { PDefault } from "@/types";

export interface ICopyToClipboardProps {
  /**
   * A label to show
   * @default undefined
   */
  text?: string | JSX.Element;
  /**
   * This function is called after the data has been copied (it's async!)
   */
  onCopy?: () => any;
  /**
   * Value to copy
   */
  copyValue: string;
  /**
   * Show an icon next to it
   * @optional
   * @default true
   */
  withIcon?: boolean;
}

export const CopyToClipboard = ({
  withIcon = true,
  ...props
}: ICopyToClipboardProps): JSX.Element => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleClick = (e: PDefault): void => {
    e.preventDefault();
    e.stopPropagation();

    copyToClipboard(
      props.copyValue,
      () => {
        props.onCopy?.();
        setCopied(true);
      },
    );
  };

  useEffect(() => {
    if (copied) {
      const timeout = delay(() => setCopied(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <a
      href="#"
      className="flex items-center space-x-2"
      role="button"
      aria-label="copy to clipboard"
      style={{ cursor: "pointer", textDecoration: "none" }}
      onClick={handleClick}
    >
      {props.text}
      {
        withIcon &&
        (
          copied
            ? <CheckCircledIcon className="size-3" />
            : <CopyIcon className="size-3" />
        )
      }
    </a>
  );
};

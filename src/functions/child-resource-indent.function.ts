import { CSSProperties } from "react";

const PX_INDENT_PER_LEVEL = 16 as const;

export const childResourceIndent = (level: number): CSSProperties => ({ paddingLeft: level * PX_INDENT_PER_LEVEL });

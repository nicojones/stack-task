interface FileElementEmptyProps {
  /**
   * @default "This resource contains no elements"
   */
  label?: string;
}

export const FileElementEmpty = ({ label = "This resource contains no elements" }: FileElementEmptyProps): JSX.Element => {
  return (
    <span className="text-slate-300">
      {label}
    </span>
  );
};

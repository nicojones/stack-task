export interface IFilePickerSharedProps {
  /**
 * Elements with a higher level are more indented
 */
  level: number;

  /**
   * The path to this file (i.e. "parent folders" + "current") for this resource
   * @default [] (root)
   */
  path?: string[];
}

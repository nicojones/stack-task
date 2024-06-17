export const copyToClipboard = (
  text: string,
  onCopy: (() => any) | undefined = undefined,
): void => {
  navigator.clipboard.writeText(text).then(() => {
    onCopy?.();
  });
};

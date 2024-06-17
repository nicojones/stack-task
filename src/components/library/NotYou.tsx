"use client";

import { toast } from "sonner";

interface NotYouProps {
  label: string;
}

/**
 * This is an example component, which has no actual functionality.
 * In a real application, it would completely clear the user's session/cookies and redirect to a login page
 */
export const NotYou = ({ label }: NotYouProps): JSX.Element => {
  const handleChangeEmailClick = (): void => {
    toast("Here's an easter egg 🐇. This should do something, but it had no priority for the task!");
  };

  return (
    <small className="ml-auto text-slate-500 text-xs">
      <span>Not you?</span>
      {" "}
      <span className="is-link" onClick={handleChangeEmailClick}>{label}</span>
    </small>
  );
};

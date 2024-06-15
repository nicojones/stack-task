"use client";

interface NotYouProps {
  label: string;
}

/**
 * This is an example component, which has no actual functionality.
 * In a real application, it would completely clear the user's session/cookies and redirect to a login page
 */
export const NotYou = ({ label }: NotYouProps): JSX.Element => {

  const handleChangeEmailClick = (): void => {
    alert("Not implemented. Please see NotYou.tsx for more information")
  }

  return (
    <small>
      <span>Not you?</span>
      {" "}
      <span className="is-link" onClick={handleChangeEmailClick}>{label}</span>
    </small>
  )
};

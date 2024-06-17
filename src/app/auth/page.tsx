
import { checkAuthorization } from "@/functions";

import { AuthenticationPage } from "./AuthenticationPage";

export default async function Page (): Promise<JSX.Element> {
  await checkAuthorization(false);

  return <AuthenticationPage />;
}

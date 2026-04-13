import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

const SSOCallbackPage = () => {
  return (
    <>
      <AuthenticateWithRedirectCallback />
      <div id="clerk-captcha" />
    </>
  );
};

export default SSOCallbackPage;

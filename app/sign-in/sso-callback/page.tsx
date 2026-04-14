import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

const SSOCallbackPage = () => {
  return (
    <>
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl="/jobs"
        signUpFallbackRedirectUrl="/jobs"
      />
      <div id="clerk-captcha" />
    </>
  );
};

export default SSOCallbackPage;

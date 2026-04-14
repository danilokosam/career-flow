"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

const SSOCallbackPage = () => {
  const searchParams = useSearchParams();
  const fallbackUrl = searchParams.get("redirect_url") || "/jobs";

  return (
    <>
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl={fallbackUrl}
        signUpFallbackRedirectUrl={fallbackUrl}
      />
      <div id="clerk-captcha" />
    </>
  );
};

export default SSOCallbackPage;

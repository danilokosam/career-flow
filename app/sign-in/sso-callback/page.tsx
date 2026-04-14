"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SSOCallbackContent() {
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
}

const SSOCallbackPage = () => {
  return (
    <Suspense>
      <SSOCallbackContent />
    </Suspense>
  );
};

export default SSOCallbackPage;

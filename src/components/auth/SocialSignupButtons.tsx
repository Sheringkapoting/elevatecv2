
import React, { useState } from "react";
import { SocialAuthButtons } from "./SocialAuthButtons";

export const SocialSignupButtons = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SocialAuthButtons isLoading={isLoading} setIsLoading={setIsLoading} context="signup" />
  );
};

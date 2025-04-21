
import React, { useState } from "react";
import { SocialAuthButtons } from "./SocialAuthButtons";

export const SocialLoginButtons = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SocialAuthButtons isLoading={isLoading} setIsLoading={setIsLoading} context="login" />
  );
};

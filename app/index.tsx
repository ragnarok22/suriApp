import { useConfig } from "@/hooks/useConfig";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function IndexRedirectPage() {
  const config = useConfig();
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);

  useEffect(() => {
    config.isNewUser().then(setIsNewUser);
  }, [config]);

  if (isNewUser === null) {
    return null;
  }

  return <Redirect href={isNewUser ? '/onboarding' : '/(tabs)'} />;
}

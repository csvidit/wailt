"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignInButton() {
  return (
    <Button
      variant="default"
      onClick={() => signIn("spotify")}
    >
      Sign in with Spotify
    </Button>
  );
}

export function SignOutButton() {
  return (
    <Button
      variant="destructive"
      onClick={() => signOut()}
    >
      Sign out
    </Button>
  );
}

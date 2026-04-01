"use client";

import { UserButton, useClerk } from "@clerk/nextjs";
import { User } from "lucide-react";

export const GuestUserDropdown = () => {
  const { signOut } = useClerk();

  const handleGuestUserClick = async () => {
    await signOut();

    // Redirect to guest sign-in page
    window.location.assign("/sign-in?guest=true");
  };

  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label="Switch to Guest"
          labelIcon={<User className="h-4 w-4" />}
          onClick={handleGuestUserClick}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Settings, LogOut, ShieldCheck } from "lucide-react";

function getAvatarUrl(
  imageUrl: string | undefined,
  name: string,
  email: string,
  avatarError: boolean,
): string {
  // If there is an error or no URL, we generate the Robohash
  if (avatarError || !imageUrl || imageUrl.includes("default_user")) {
    const seed = name || email || "user";
    return `https://robohash.org/${encodeURIComponent(seed)}.png?size=80x80`;
  }
  return imageUrl;
}
export const UserProfileDropdown = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [avatarError, setAvatarError] = useState(false);

  //  Initial loading state
  if (!isLoaded) {
    return <Skeleton className="h-9 w-9 rounded-full" />;
  }

  // If no user, do not render anything (or a login button)
  if (!user) return null;

  const name = user.fullName || user.username || "User";
  const email = user.primaryEmailAddress?.emailAddress || "";

  const avatarUrl = getAvatarUrl(user.imageUrl, name, email, avatarError);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full p-0 border-2 border-muted hover:border-primary/50 transition-colors"
        >
          <div className="h-full w-full rounded-full overflow-hidden bg-muted">
            <img
              src={avatarUrl}
              alt={name}
              className="h-full w-full object-cover"
              onError={() => setAvatarError(true)}
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 p-2" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 p-1">
            <p className="text-sm font-semibold leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/user-profile">
            <Settings className="mr-2 h-4 w-4" />
            <span>Manage account</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => signOut({ redirectUrl: "/" })}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="flex items-center gap-1 px-2 py-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
          <ShieldCheck className="h-3 w-3" />
          Secured by Clerk
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

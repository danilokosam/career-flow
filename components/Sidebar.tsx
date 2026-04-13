"use client";
import links from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="py-4 px-8 bg-muted h-full border-r">
      {" "}
      <div className="mb-12 flex justify-center">
        {" "}
        {/* Logo container */}
        <Image
          src="/logo-career-flow.svg"
          alt="career flow logo"
          width={90}
          height={40}
          priority
          className="dark:invert shrink-0 h-28 w-auto"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        {" "}
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Button
              asChild
              key={link.href}
              variant={isActive ? "default" : "ghost"}
              className={`justify-start h-12 ${isActive ? "" : "text-muted-foreground"}`}
            >
              <Link href={link.href} className="flex items-center gap-x-4">
                {link.icon}
                <span className="capitalize text-base font-medium">
                  {link.label}
                </span>
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;

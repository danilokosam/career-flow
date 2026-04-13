import { LinksDropdown } from "@/components/LinksDropdown";
import { ThemeToggle } from "@/components/ThemeToogle";
import { UserProfileDropdown } from "@/components/UserProfileDropdown";

function Navbar() {
  return (
    <nav className="bg-muted py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-end border-b border-border/40">
      <div className="lg:hidden">
        <LinksDropdown />
      </div>

      <div className="flex items-center gap-x-4 ml-auto lg:ml-0">
        <ThemeToggle />
        <UserProfileDropdown />
      </div>
    </nav>
  );
}

export default Navbar;

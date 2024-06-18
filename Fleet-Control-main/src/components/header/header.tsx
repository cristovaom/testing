import { ThemeToggle } from "../theme/theme-toogle";

import { ProfileHeader } from "./profile";
import { Building2, Files, Home, Milestone } from "lucide-react";
import { NavLink } from "../navlink";
import { Separator } from "../ui/separator";

export function Header() {
  return (
    <div className="border-b ">
      <div className="flex h-16 items-center gap-6 px-6">
        <Building2 className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>

          <NavLink to="/corridas">
            <Milestone className="w-4 h-4" />
            Ultimas corridas
          </NavLink>

          <NavLink to="/multas">
            <Files className="h-4 w-4" />
            Multas
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2 text-muted-foreground">
          <ThemeToggle />
          <ProfileHeader />
        </div>
      </div>
    </div>
  );
}

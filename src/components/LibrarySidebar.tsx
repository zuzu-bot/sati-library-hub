import { BookOpen, LayoutDashboard, Search, Heart, Link, Phone, Settings, LogOut, Library } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { icon: LayoutDashboard, to: "/", label: "Dashboard" },
  { icon: BookOpen, to: "/books", label: "Books" },
  { icon: Search, to: "/search", label: "Search" },
  { icon: Heart, to: "/favorites", label: "Favorites" },
  { icon: Link, to: "/issued", label: "Issued" },
  { icon: Phone, to: "/contact", label: "Contact" },
  { icon: Settings, to: "/settings", label: "Settings" },
];

const LibrarySidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-16 flex-col items-center bg-sidebar py-6 border-r border-sidebar-border lg:w-64 transition-all duration-300">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3 px-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Library className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="hidden font-display text-lg font-bold text-foreground lg:block">SATI Library</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 w-full px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            activeClassName="bg-sidebar-accent text-primary"
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <span className="hidden lg:block text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="w-full px-2">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-destructive">
          <LogOut className="h-5 w-5 shrink-0" />
          <span className="hidden lg:block text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default LibrarySidebar;

import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Library, LayoutDashboard, BookOpen, Search, Heart, BookMarked, Settings, LogOut, Menu, X } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { icon: LayoutDashboard, to: "/dashboard", label: "Dashboard" },
  { icon: BookOpen, to: "/dashboard/books", label: "Books" },
  { icon: Search, to: "/dashboard/search", label: "Search" },
  { icon: Heart, to: "/dashboard/favorites", label: "Favorites" },
  { icon: BookMarked, to: "/dashboard/issued", label: "Issued Books" },
  { icon: Settings, to: "/dashboard/settings", label: "Settings" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check mock login
  useEffect(() => {
    const loggedIn = localStorage.getItem("sati_logged_in");
    if (!loggedIn) navigate("/login");
  }, [navigate]);

  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("sati_logged_in");
    localStorage.removeItem("sati_user");
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("sati_user") || '{"name":"Student","email":"student@sati.ac.in"}');

  return (
    <div className="flex min-h-screen">
      {sidebarOpen && <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed top-0 left-0 z-50 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center gap-3 px-5 h-16 border-b border-sidebar-border">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <Library className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <span className="font-display text-sm font-bold text-foreground">SATI Library</span>
            <p className="text-[10px] text-muted-foreground">AI-Powered</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-muted-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeClassName="bg-sidebar-accent text-primary font-medium"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
              {user.name?.[0] || "S"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{user.name || "Student"}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-destructive transition-colors">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-md px-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-muted-foreground hover:text-foreground">
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-display text-sm font-bold text-foreground">SATI Library</span>
        </header>
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

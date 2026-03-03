import { Search, Bell, Mail } from "lucide-react";
import { useState } from "react";

const TopNav = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-6">
      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-6">
        <a href="/" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">Library</a>
        <a href="/books" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Books</a>
        <a href="/authors" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Authors</a>
      </nav>

      {/* Search */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search books, authors, ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full bg-secondary py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button className="relative rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
        </button>
        <button className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
          <Mail className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 ml-2">
          <span className="hidden sm:block text-sm font-medium text-foreground">Student</span>
          <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
            S
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;

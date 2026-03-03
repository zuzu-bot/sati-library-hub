import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import BookCard from "@/components/BookCard";
import { previousReading, popularBooks, newBooks } from "@/data/mockData";

const allBooks = [...previousReading, ...popularBooks, ...newBooks];
const categories = ["All", "Fiction", "Non-Fiction", "Science", "Art", "Engineering", "Self-Help", "Biography"];

const BooksPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = allBooks.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "All" || b.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Book Catalog</h1>
        <p className="text-sm text-muted-foreground mt-1">Browse and discover from our collection</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title, author, ISBN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-card border border-border py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-card border border-border px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:border-primary/20 transition-all">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              category === cat
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filtered.map((book, i) => (
          <BookCard key={book.id} book={book} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <p className="text-muted-foreground">No books found matching your criteria.</p>
        </motion.div>
      )}
    </div>
  );
};

export default BooksPage;

import { Brain, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import BookCard from "@/components/BookCard";
import { previousReading, popularBooks, newBooks } from "@/data/mockData";

const allBooks = [...previousReading, ...popularBooks, ...newBooks];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(allBooks.slice(0, 6));
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setSearched(true);
    const filtered = allBooks.filter(
      (b) => b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
          <span className="text-gradient-gold">AI-Powered</span> Search
        </h1>
        <p className="text-sm text-muted-foreground">
          Describe what you're looking for — our AI understands natural language
        </p>
      </div>

      {/* Search Box */}
      <div className="glass rounded-2xl p-6 glow-gold">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Brain className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
            <input
              type="text"
              placeholder="e.g. 'books about machine learning for beginners' or 'ISBN 978-0-13-468599-1'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full rounded-xl bg-input py-3.5 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
          <Button variant="royal" size="lg" onClick={handleSearch}>
            <Search className="h-4 w-4" /> Search
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {["Data Structures", "Machine Learning", "Thermodynamics", "Indian History"].map((s) => (
            <button
              key={s}
              onClick={() => { setQuery(s); }}
              className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all flex items-center gap-1"
            >
              <Sparkles className="h-3 w-3" /> {s}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div>
          <p className="text-sm text-muted-foreground mb-4">{results.length} results found</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {results.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
          {results.length === 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-muted-foreground">
              No books found. Try a different query.
            </motion.p>
          )}
        </div>
      )}

      {!searched && (
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">Start typing to discover books from our collection</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

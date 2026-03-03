import { Heart } from "lucide-react";
import BookCard from "@/components/BookCard";
import { popularBooks } from "@/data/mockData";

const FavoritesPage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Heart className="h-6 w-6 text-primary" />
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Favorites</h1>
          <p className="text-sm text-muted-foreground mt-1">Your saved books</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {popularBooks.map((book, i) => (
          <BookCard key={book.id} book={book} index={i} />
        ))}
      </div>

      {popularBooks.length === 0 && (
        <div className="text-center py-16">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No favorites yet. Start exploring!</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;

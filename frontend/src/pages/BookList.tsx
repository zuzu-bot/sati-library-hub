import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookAPI } from '../api';
import { Plus, Edit, Trash2, Search, Book as BookIcon } from 'lucide-react';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await bookAPI.getAll();
      setBooks(response.data);
    } catch (err) {
      console.error('Error fetching books', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookAPI.delete(id);
        fetchBooks();
      } catch (err) {
        alert('Failed to delete book');
      }
    }
  };

  const filteredBooks = books.filter((book: any) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Collection</h1>
          <p className="text-muted-foreground mt-1">Manage and explore your personal library</p>
        </div>
        <Link
          to="/books/add"
          className="bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gold-light transition-colors self-start"
        >
          <Plus size={20} />
          Add New Book
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="Search by title or author..."
          className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3 focus:border-primary outline-none transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-48 glass rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book: any) => (
            <div key={book.id} className="glass p-6 rounded-2xl group border-transparent hover:border-primary/20 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <BookIcon size={24} />
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/books/edit/${book.id}`}
                    className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="p-2 hover:bg-destructive/10 rounded-lg text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold truncate mb-1">{book.title}</h3>
              <p className="text-muted-foreground">{book.author}</p>
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span>Added on {new Date(book.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          {filteredBooks.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-muted-foreground italic text-lg">No books found in your collection.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookList;

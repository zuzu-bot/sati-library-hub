import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookAPI, aiAPI } from '../api';
import { Plus, Edit, Trash2, Search, Book as BookIcon, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BookList = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [summarizing, setSummarizing] = useState<number | null>(null);
  const [summaries, setSummaries] = useState<{ [key: number]: string }>({});

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

  const handleGenerateSummary = async (id: number, title: string) => {
    setSummarizing(id);
    try {
      const response = await aiAPI.getSummary(title);
      setSummaries(prev => ({ ...prev, [id]: response.data.summary }));
    } catch (err) {
      alert('Failed to generate AI summary');
    } finally {
      setSummarizing(null);
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
          <h1 className="text-3xl font-bold text-gradient-gold">Sati Library</h1>
          <p className="text-muted-foreground mt-1">Explore our curated collection of wisdom</p>
        </div>
        {isAdmin && (
          <Link
            to="/books/add"
            className="bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gold-light transition-colors self-start shadow-lg shadow-primary/20"
          >
            <Plus size={20} />
            Add New Book
          </Link>
        )}
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
          {[1, 2, 3].map(i => <div key={i} className="h-64 glass rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book: any) => (
            <div key={book.id} className="glass p-6 rounded-2xl group border-transparent hover:border-primary/20 transition-all flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="relative h-32 w-24 bg-muted rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                  {book.cover_image_url ? (
                    <img src={book.cover_image_url} alt={book.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                      <BookIcon size={32} />
                    </div>
                  )}
                </div>
                {isAdmin && (
                  <div className="flex gap-1">
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
                )}
              </div>

              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{book.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 font-medium">by {book.author}</p>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{book.description || "No description available."}</p>
              </div>

              {summaries[book.id] ? (
                <div className="mb-4 p-3 bg-primary/5 border border-primary/10 rounded-xl text-xs text-foreground italic relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-1">
                    <Sparkles size={12} className="text-primary/40" />
                  </div>
                  {summaries[book.id]}
                </div>
              ) : null}

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <button
                  onClick={() => handleGenerateSummary(book.id, book.title)}
                  disabled={summarizing !== null}
                  className="text-xs flex items-center gap-2 text-primary hover:text-gold-light transition-colors font-bold"
                >
                  {summarizing === book.id ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Summarizing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      AI Summary
                    </>
                  )}
                </button>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{new Date(book.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          {filteredBooks.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-muted-foreground italic text-lg">No books found in our library.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookList;

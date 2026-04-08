import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookAPI } from '../api';
import { Save, ArrowLeft, Book } from 'lucide-react';

const AddEditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      const fetchBook = async () => {
        try {
          const response = await bookAPI.getOne(parseInt(id));
          if (response.data && response.data.length > 0) {
            setFormData({
              title: response.data[0].title,
              author: response.data[0].author,
            });
          }
        } catch (err) {
          setError('Failed to load book details');
        } finally {
          setLoading(false);
        }
      };
      fetchBook();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await bookAPI.update({ id: parseInt(id), ...formData });
      } else {
        await bookAPI.create(formData);
      }
      navigate('/books');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save book');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="glass p-8 rounded-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <Book size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{isEdit ? 'Edit Book' : 'Add New Book'}</h1>
            <p className="text-muted-foreground">{isEdit ? 'Update your book information' : 'Expand your digital collection'}</p>
          </div>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Book Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-muted border border-border rounded-xl p-3 focus:border-primary outline-none transition-colors"
              placeholder="e.g. The Great Gatsby"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Author Name</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full bg-muted border border-border rounded-xl p-3 focus:border-primary outline-none transition-colors"
              placeholder="e.g. F. Scott Fitzgerald"
              required
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            <Save size={20} />
            {saving ? 'Saving...' : isEdit ? 'Update Book' : 'Save Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditBook;

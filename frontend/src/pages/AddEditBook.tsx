import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookAPI } from '../api';
import { Save, ArrowLeft, Book, Image as ImageIcon, Type } from 'lucide-react';

const AddEditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    cover_image_url: '',
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
            const book = response.data[0];
            setFormData({
              title: book.title,
              author: book.author,
              description: book.description || '',
              cover_image_url: book.cover_image_url || '',
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

  if (loading) return <div className="animate-pulse flex items-center justify-center h-64">Loading book details...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <div className="glass p-8 rounded-3xl shadow-2xl border-primary/10">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-primary/10 rounded-2xl text-primary shadow-inner">
            <Book size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gradient-gold">{isEdit ? 'Update Wisdom' : 'Add New Wisdom'}</h1>
            <p className="text-muted-foreground">{isEdit ? 'Refine the knowledge in our library' : 'Expand our digital treasury'}</p>
          </div>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-xl mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-destructive rounded-full" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1 flex items-center gap-2 text-muted-foreground">
                <Type size={14} /> Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-muted/50 border border-border rounded-xl p-3 focus:border-primary outline-none transition-all"
                placeholder="e.g. The Art of War"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1 flex items-center gap-2 text-muted-foreground">
                <Type size={14} /> Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full bg-muted/50 border border-border rounded-xl p-3 focus:border-primary outline-none transition-all"
                placeholder="e.g. Sun Tzu"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1 flex items-center gap-2 text-muted-foreground">
              <ImageIcon size={14} /> Cover Image URL
            </label>
            <input
              type="url"
              value={formData.cover_image_url}
              onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
              className="w-full bg-muted/50 border border-border rounded-xl p-3 focus:border-primary outline-none transition-all"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1 text-muted-foreground">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-muted/50 border border-border rounded-xl p-3 focus:border-primary outline-none transition-all min-h-[120px] resize-none"
              placeholder="Write a brief overview of the book..."
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gold-light transition-all disabled:opacity-50 shadow-lg shadow-primary/20 mt-4 active:scale-[0.98]"
          >
            <Save size={20} />
            {saving ? 'Processing...' : isEdit ? 'Update Collection' : 'Add to Collection'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditBook;

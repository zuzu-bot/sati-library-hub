import { useEffect, useState } from 'react';
import { authAPI } from '../api';
import { Mail, Shield, Calendar, Loader2 } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await authAPI.getAllUsers();
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users. Admin access required.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 size={48} className="animate-spin text-primary" />
      <p className="text-muted-foreground animate-pulse">Fetching user directory...</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gradient-gold">User Management</h1>
        <p className="text-muted-foreground mt-2">Manage and monitor library members.</p>
      </header>

      {error ? (
        <div className="glass p-8 text-center text-destructive rounded-2xl border-destructive/20 bg-destructive/5">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user: any) => (
            <div key={user.id} className="glass p-6 rounded-2xl border-l-4 border-primary/30 hover:border-primary transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shadow-inner">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full w-fit mt-1">
                    <Shield size={10} className="text-primary" />
                    <span className="uppercase tracking-tighter font-bold">{user.role}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail size={16} className="text-primary/60" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar size={16} className="text-primary/60" />
                  <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex justify-end">
                <button className="text-xs font-bold text-primary hover:text-gold-light transition-colors px-3 py-1 rounded-lg hover:bg-primary/5">
                  View Activity
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;

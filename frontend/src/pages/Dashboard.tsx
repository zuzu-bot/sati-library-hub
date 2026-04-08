import { useEffect, useState } from 'react';
import { bookAPI, aiAPI } from '../api';
import { Book, Sparkles, TrendingUp, Clock, Library } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, recent: 0 });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [booksRes, recRes] = await Promise.all([
          bookAPI.getAll(),
          aiAPI.getRecommendations()
        ]);
        setStats({
          total: booksRes.data.length,
          recent: booksRes.data.slice(0, 3).length
        });
        setRecommendations(recRes.data);
      } catch (err) {
        console.error('Error fetching dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div className="animate-pulse">Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-gradient-gold">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground mt-2">Here's what's happening in your library today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl border-l-4 border-primary">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Book size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Total Books</p>
              <h3 className="text-3xl font-bold mt-1">{stats.total}</h3>
            </div>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl border-l-4 border-accent">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-xl text-accent">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Activity Rate</p>
              <h3 className="text-3xl font-bold mt-1">High</h3>
            </div>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl border-l-4 border-gold-light">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gold-light/10 rounded-xl text-gold-light">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Recently Added</p>
              <h3 className="text-3xl font-bold mt-1">{stats.recent}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recommendations */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" size={20} />
            <h2 className="text-xl font-bold">AI Recommendations</h2>
          </div>
          <div className="space-y-4">
            {recommendations.map((rec: any) => (
              <div key={rec.id} className="glass p-4 rounded-xl flex items-center justify-between hover:border-primary/30 transition-all cursor-pointer group">
                <div>
                  <h4 className="font-bold group-hover:text-primary transition-colors">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground">{rec.author}</p>
                </div>
                <button className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">Add to list</button>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions / Future Feature */}
        <section className="glass p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 border-dashed border-2 border-border">
          <div className="p-4 bg-muted rounded-full text-muted-foreground">
            <Library size={48} />
          </div>
          <div>
            <h3 className="text-xl font-bold">More Features Coming Soon</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2">
              We are working on AI-powered summarization and personalized reading paths.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

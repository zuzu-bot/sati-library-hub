import { BookOpen, Users, AlertTriangle, TrendingUp, Brain, Clock, Search } from "lucide-react";
import { motion } from "framer-motion";
import BookCard from "@/components/BookCard";
import SubjectCard from "@/components/SubjectCard";
import AuthorCard from "@/components/AuthorCard";
import SectionHeader from "@/components/SectionHeader";
import { previousReading, popularBooks, newBooks, subjects, authors, libraryStats } from "@/data/mockData";
import { useState } from "react";

const stats = [
  { label: "Total Books", value: libraryStats.totalBooks.toLocaleString(), icon: BookOpen, accent: "text-primary" },
  { label: "Issued Books", value: libraryStats.issuedBooks.toLocaleString(), icon: TrendingUp, accent: "text-cyber" },
  { label: "Students", value: libraryStats.totalStudents.toLocaleString(), icon: Users, accent: "text-accent" },
  { label: "Overdue", value: libraryStats.overdueBooks.toString(), icon: AlertTriangle, accent: "text-destructive" },
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
            <Brain className="h-3.5 w-3.5 text-primary" /> AI-powered recommendations ready
          </p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search books, authors, ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-card border border-border py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-4 glow-gold hover:border-primary/15 transition-all cursor-default"
          >
            <stat.icon className={`h-5 w-5 ${stat.accent} mb-2`} />
            <p className="font-display text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left */}
        <div className="flex-1 space-y-8 min-w-0">
          <section>
            <SectionHeader title="Continue Reading" showFilter />
            <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1">
              {previousReading.map((book, i) => (
                <BookCard key={book.id} book={book} index={i} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Subjects" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {subjects.map((subject, i) => (
                <SubjectCard key={subject.name} subject={subject} index={i} highlighted={subject.name === "Engineering"} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="New Arrivals" showAll />
            <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1">
              {newBooks.map((book, i) => (
                <BookCard key={book.id} book={book} index={i} />
              ))}
            </div>
          </section>
        </div>

        {/* Right */}
        <aside className="w-full xl:w-72 space-y-8 shrink-0">
          <section>
            <SectionHeader title="Popular" showAll />
            <div className="grid grid-cols-2 xl:grid-cols-2 gap-3">
              {popularBooks.map((book, i) => (
                <BookCard key={book.id} book={book} size="sm" index={i} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Authors" showAll />
            <div className="space-y-3">
              {authors.slice(0, 4).map((author, i) => (
                <AuthorCard key={author.id} author={author} index={i} />
              ))}
            </div>
          </section>

          <section className="glass rounded-xl p-4 glow-gold">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-primary" />
              <h3 className="font-display text-sm font-bold text-foreground">Due Soon</h3>
            </div>
            <div className="space-y-2">
              {[
                { title: "Data Structures", due: "Mar 5", urgent: true },
                { title: "Engineering Physics", due: "Mar 8", urgent: false },
              ].map((item) => (
                <div key={item.title} className="flex items-center justify-between text-sm">
                  <span className="text-foreground text-xs">{item.title}</span>
                  <span className={`text-xs font-medium ${item.urgent ? "text-destructive" : "text-muted-foreground"}`}>{item.due}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;

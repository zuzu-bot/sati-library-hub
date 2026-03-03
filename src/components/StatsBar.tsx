import { BookOpen, Users, AlertTriangle, TrendingUp } from "lucide-react";
import { libraryStats } from "@/data/mockData";
import { motion } from "framer-motion";

const stats = [
  { label: "Total Books", value: libraryStats.totalBooks.toLocaleString(), icon: BookOpen, color: "text-primary" },
  { label: "Issued", value: libraryStats.issuedBooks.toLocaleString(), icon: TrendingUp, color: "text-teal-light" },
  { label: "Students", value: libraryStats.totalStudents.toLocaleString(), icon: Users, color: "text-accent" },
  { label: "Overdue", value: libraryStats.overdueBooks.toString(), icon: AlertTriangle, color: "text-destructive" },
];

const StatsBar = () => {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="rounded-xl bg-card border border-border p-4 hover:border-primary/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
            <div>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsBar;

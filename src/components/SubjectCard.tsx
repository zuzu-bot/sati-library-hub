import { motion } from "framer-motion";
import type { Subject } from "@/data/mockData";

interface SubjectCardProps {
  subject: Subject;
  index?: number;
  highlighted?: boolean;
}

const SubjectCard = ({ subject, index = 0, highlighted = false }: SubjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className={`flex items-center justify-between rounded-xl px-4 py-3.5 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
        highlighted
          ? "bg-primary/15 border border-primary/30 glow-gold"
          : "glass hover:border-primary/15"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{subject.icon}</span>
        <span className="text-sm font-medium text-foreground">{subject.name}</span>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-primary font-display">{subject.count}</p>
        <p className="text-[10px] text-muted-foreground">Books</p>
      </div>
    </motion.div>
  );
};

export default SubjectCard;

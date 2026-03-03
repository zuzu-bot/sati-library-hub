import { motion } from "framer-motion";
import type { Author } from "@/data/mockData";

interface AuthorCardProps {
  author: Author;
  index?: number;
}

const AuthorCard = ({ author, index = 0 }: AuthorCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="flex items-center gap-3 glass rounded-xl p-3 hover:border-primary/15 transition-all cursor-pointer"
    >
      <div className="relative">
        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground">
          {author.avatar}
        </div>
        <div className="absolute -top-1 -right-1 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground">
          {author.books}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground truncate">{author.name}</p>
        <p className="text-[10px] text-muted-foreground">{author.role}</p>
      </div>
    </motion.div>
  );
};

export default AuthorCard;

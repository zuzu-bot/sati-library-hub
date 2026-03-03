import { Heart } from "lucide-react";
import type { Book } from "@/data/mockData";
import { motion } from "framer-motion";

interface BookCardProps {
  book: Book;
  size?: "sm" | "md" | "lg";
  index?: number;
}

const BookCard = ({ book, size = "md", index = 0 }: BookCardProps) => {
  const sizeClasses = {
    sm: "w-24 h-36",
    md: "w-32 h-48",
    lg: "w-40 h-56",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group flex flex-col gap-2"
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={book.cover}
          alt={book.title}
          className={`${sizeClasses[size]} object-cover rounded-lg transition-transform duration-300 group-hover:scale-105`}
          loading="lazy"
        />
        <button className="absolute top-2 right-2 rounded-full bg-background/60 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
          <Heart className="h-3.5 w-3.5 text-primary" />
        </button>
        {!book.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg">
            <span className="text-xs font-semibold text-destructive">Unavailable</span>
          </div>
        )}
      </div>
      <div className="max-w-[theme(width.32)]">
        <p className="text-xs font-medium text-foreground truncate">{book.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-muted-foreground truncate">{book.author}</span>
          <span className="text-[10px] text-primary font-medium">{book.readers}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;

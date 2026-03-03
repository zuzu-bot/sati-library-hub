import { BookMarked, Calendar, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const issuedBooks = [
  { id: 1, title: "Data Structures & Algorithms", author: "Cormen et al.", issuedDate: "Feb 15, 2026", dueDate: "Mar 5, 2026", status: "overdue" },
  { id: 2, title: "Engineering Physics Vol. 2", author: "H.K. Malik", issuedDate: "Feb 20, 2026", dueDate: "Mar 8, 2026", status: "active" },
  { id: 3, title: "Digital Electronics", author: "Morris Mano", issuedDate: "Feb 25, 2026", dueDate: "Mar 15, 2026", status: "active" },
];

const IssuedPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Issued Books</h1>
        <p className="text-sm text-muted-foreground mt-1">Track your borrowed books and due dates</p>
      </div>

      <div className="space-y-3">
        {issuedBooks.map((book, i) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${
              book.status === "overdue" ? "border-destructive/30" : ""
            }`}
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <BookMarked className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm">{book.title}</p>
              <p className="text-xs text-muted-foreground">{book.author}</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>Due: {book.dueDate}</span>
              </div>
              {book.status === "overdue" && (
                <span className="flex items-center gap-1 text-destructive font-medium">
                  <AlertCircle className="h-3.5 w-3.5" /> Overdue
                </span>
              )}
            </div>
            <Button variant="glass" size="sm">Return</Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IssuedPage;

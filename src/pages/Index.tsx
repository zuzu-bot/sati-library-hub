import LibrarySidebar from "@/components/LibrarySidebar";
import TopNav from "@/components/TopNav";
import StatsBar from "@/components/StatsBar";
import BookCard from "@/components/BookCard";
import SubjectCard from "@/components/SubjectCard";
import AuthorCard from "@/components/AuthorCard";
import SectionHeader from "@/components/SectionHeader";
import { previousReading, popularBooks, newBooks, subjects, authors } from "@/data/mockData";

const Index = () => {
  return (
    <div className="flex min-h-screen">
      <LibrarySidebar />
      
      {/* Main content area */}
      <div className="flex-1 ml-16 lg:ml-64 transition-all duration-300">
        <TopNav />
        
        <div className="flex flex-col lg:flex-row">
          {/* Left column - Main content */}
          <main className="flex-1 p-6 space-y-8 overflow-y-auto">
            {/* Stats */}
            <StatsBar />

            {/* Previous Reading */}
            <section>
              <SectionHeader title="Previous Reading" showFilter />
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {previousReading.map((book, i) => (
                  <BookCard key={book.id} book={book} index={i} />
                ))}
              </div>
            </section>

            {/* Subjects */}
            <section>
              <SectionHeader title="Subjects Section" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {subjects.map((subject, i) => (
                  <SubjectCard key={subject.name} subject={subject} index={i} highlighted={subject.name === "Engineering"} />
                ))}
              </div>
            </section>

            {/* New Books */}
            <section>
              <SectionHeader title="New Books" showAll />
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {newBooks.map((book, i) => (
                  <BookCard key={book.id} book={book} index={i} />
                ))}
              </div>
            </section>
          </main>

          {/* Right column - Sidebar content */}
          <aside className="w-full lg:w-80 border-l border-border p-6 space-y-8">
            {/* Popular Books */}
            <section>
              <SectionHeader title="Popular Books" showAll />
              <div className="grid grid-cols-3 gap-2">
                {popularBooks.map((book, i) => (
                  <BookCard key={book.id} book={book} size="sm" index={i} />
                ))}
              </div>
            </section>

            {/* Writers and Authors */}
            <section>
              <SectionHeader title="Writers & Authors" showAll />
              <div className="grid grid-cols-1 gap-3">
                {authors.slice(0, 4).map((author, i) => (
                  <AuthorCard key={author.id} author={author} index={i} />
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Index;

const previousReading = [
  { id: "1", title: "Steal Like an Artist", author: "Austin Kleon", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348853477i/13099738.jpg", rating: 4.2, readers: "699", category: "Art", available: true },
  { id: "2", title: "Type Matters", author: "Jim Williams", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1328760855i/13355901.jpg", rating: 4.0, readers: "10K+", category: "Design", available: true },
  { id: "3", title: "How to Become a Millionaire", author: "Subhash Lakhotia", cover: "https://m.media-amazon.com/images/I/71g2ednj0JL._AC_UF1000,1000_QL80_.jpg", rating: 3.8, readers: "2.4K", category: "Finance", available: false },
  { id: "4", title: "Show Your Work", author: "Austin Kleon", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1404580714i/18290401.jpg", rating: 4.5, readers: "1.1M", category: "Art", available: true },
  { id: "5", title: "The Complete Novels", author: "Arthur Conan", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1393682425i/188572.jpg", rating: 4.7, readers: "4.89K", category: "Fiction", available: true },
];

const popularBooks = [
  { id: "6", title: "The Subtle Art", author: "Mark Manson", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1465761302i/28257707.jpg", rating: 4.1, readers: "5.2M", category: "Self-Help", available: true },
  { id: "7", title: "The Power of Subconscious Mind", author: "Joseph Murphy", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1389228800i/68984.jpg", rating: 4.3, readers: "3.1M", category: "Psychology", available: true },
  { id: "8", title: "A Girl to Remember", author: "Bhargava C", cover: "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg", rating: 4.0, readers: "890", category: "Fiction", available: false },
  { id: "9", title: "Sherlock Holmes", author: "Arthur Conan Doyle", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1393682425i/188572.jpg", rating: 4.8, readers: "8.9M", category: "Mystery", available: true },
];

const newBooks = [
  { id: "10", title: "Mossad", author: "Michael Bar-Zohar", cover: "https://m.media-amazon.com/images/I/81rFYkUOevL._AC_UF1000,1000_QL80_.jpg", rating: 4.4, readers: "1.2K", category: "Non-Fiction", available: true },
  { id: "11", title: "Less: Winner of the Pulitzer", author: "Andrew S. Greer", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1503889930i/39927096.jpg", rating: 4.1, readers: "2.3K", category: "Fiction", available: true },
  { id: "12", title: "Vyasa: The Beginning", author: "Shreyas", cover: "https://m.media-amazon.com/images/I/71hfYjp2JyL._AC_UF1000,1000_QL80_.jpg", rating: 3.9, readers: "450", category: "Mythology", available: true },
  { id: "13", title: "Shoe Dog: A Memoir", author: "Phil Knight", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg", rating: 4.6, readers: "3.8K", category: "Biography", available: true },
  { id: "14", title: "Touch the Sky", author: "Rashmi Bansal", cover: "https://m.media-amazon.com/images/I/81WmYfOxdYL._AC_UF1000,1000_QL80_.jpg", rating: 4.0, readers: "670", category: "Inspiration", available: false },
  { id: "15", title: "Data Structures & Algorithms", author: "Narasimha Karumanchi", cover: "https://m.media-amazon.com/images/I/718Bv30f6hL._AC_UF1000,1000_QL80_.jpg", rating: 4.5, readers: "15K", category: "Engineering", available: true },
  { id: "16", title: "Machine Learning", author: "Tom Mitchell", cover: "https://m.media-amazon.com/images/I/517f-p-iRFL._AC_UF1000,1000_QL80_.jpg", rating: 4.3, readers: "8K", category: "Engineering", available: true },
];

const subjects = [
  { name: "Science", count: "1.2K", icon: "🔬" },
  { name: "Arts", count: "1.8K", icon: "🎨" },
  { name: "Commerce", count: "230", icon: "📊" },
  { name: "Design", count: "80", icon: "✏️" },
  { name: "Cooking", count: "180", icon: "🍳" },
  { name: "Engineering", count: "2.5K", icon: "⚙️" },
];

const authors = [
  { id: "a1", name: "Austin Kleon", role: "Writer & Author", books: 76, avatar: "AK" },
  { id: "a2", name: "Mark Manson", role: "Author", books: 33, avatar: "MM" },
  { id: "a3", name: "Agatha Christie", role: "Writer & Author", books: 12, avatar: "AC" },
  { id: "a4", name: "Joseph Murphy", role: "Author", books: 110, avatar: "JM" },
  { id: "a5", name: "Subhas Lakhotia", role: "Writer & Author", books: 20, avatar: "SL" },
  { id: "a6", name: "Arthur Conan Doyle", role: "Writer & Author", books: 51, avatar: "AD" },
];

const libraryStats = {
  totalBooks: 12450,
  issuedBooks: 3280,
  availableBooks: 9170,
  totalStudents: 5640,
  overdueBooks: 127,
  newArrivals: 45,
};

window.libraryData = {
  previousReading,
  popularBooks,
  newBooks,
  subjects,
  authors,
  libraryStats
};

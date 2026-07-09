import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// ─── Star Rating ──────────────────────────────────────────────
function StarRating({ rating = 0 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3 h-3 flex-shrink-0 ${
            s <= Math.round(rating) ? "text-[#BDB47B]" : "text-gray-200"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Small Row Card ───────────────────────────────────────────
function SmallCard({ book, last }) {
  return (
    <Link
      to={`/books/${book._id}`}
      className={`flex items-center gap-3 py-3 group ${
        !last ? "border-b border-[#BDB47B]/20" : ""
      }`}
    >
      <img
        src={book.image}
        alt={book.title}
        className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
      />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-widest text-[#37400B] font-semibold truncate">
          {book.author || "Unknown"}
        </p>
        <h4 className="text-sm font-semibold text-[#37400B] line-clamp-1 group-hover:text-[#2A3308] transition-colors mt-0.5">
          {book.title}
        </h4>
        <StarRating rating={book.rating} />
        <p className="text-sm font-bold text-[#37400B] mt-0.5">
          ₹{book.discountedPrice ?? book.price}
        </p>
      </div>
    </Link>
  );
}

// ─── Large Featured Card ──────────────────────────────────────
function LargeCard({ book }) {
  return (
    <Link to={`/books/${book._id}`} className="block group h-full">
      <div className="overflow-hidden rounded-2xl">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="text-[10px] uppercase tracking-widest text-[#37400B] font-semibold mt-3 truncate">
        {book.author || "Unknown"}
      </p>
      <h3 className="text-base font-bold text-[#37400B] mt-0.5 line-clamp-1 group-hover:text-[#2A3308] transition-colors">
        {book.title}
      </h3>
      <StarRating rating={book.rating} />
      <p className="text-base font-bold text-[#37400B] mt-1">
        ₹{book.discountedPrice ?? book.price}
      </p>
    </Link>
  );
}

// ─── Main Component ───────────────────────────────────────────
function FavouriteReads() {
  const { books } = useSelector((state) => state.books);

  const favBooks = [...(books || [])]
    .filter((b) => b.numReviews > 0)
    .sort((a, b) =>
      b.rating !== a.rating ? b.rating - a.rating : b.numReviews - a.numReviews
    )
    .slice(0, 10);

  const leftBooks = favBooks.slice(0, 4);
  const featuredBooks = favBooks.slice(4, 6);
  const rightBooks = favBooks.slice(6, 10);

  if (favBooks.length === 0) return null;

  return (
    <section className="py-14 bg-[#EDE4CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#37400B]">
            Our Favourite Reads
          </h2>
          <Link
            to="/collection/top-rated"
            className="text-sm font-medium text-[#BDB47B] hover:text-[#37400B] flex items-center gap-1 transition-colors"
          >
            View all product
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Outer border card */}
        <div className="border border-[#BDB47B]/30 rounded-2xl p-4 sm:p-6">
          {/* ── Mobile / Tablet (<lg): stacked layout ── */}
          <div className="lg:hidden space-y-6">
            {/* Featured 2 side by side */}
            {featuredBooks.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {featuredBooks.map((book) => (
                  <LargeCard key={book._id} book={book} />
                ))}
              </div>
            )}

            {/* Small cards grid 2-col */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              {[...leftBooks, ...rightBooks].map((book, i, arr) => (
                <SmallCard
                  key={book._id}
                  book={book}
                  last={i === arr.length - 1 || i === arr.length - 2}
                />
              ))}
            </div>
          </div>

          {/* ── Desktop (lg+): 4-column layout ── */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {/* Col 1: small list */}
            <div className="flex flex-col">
              {leftBooks.map((book, i) => (
                <SmallCard
                  key={book._id}
                  book={book}
                  last={i === leftBooks.length - 1}
                />
              ))}
            </div>

            {/* Col 2: large */}
            {featuredBooks[0] && <LargeCard book={featuredBooks[0]} />}

            {/* Col 3: large */}
            {featuredBooks[1] && <LargeCard book={featuredBooks[1]} />}

            {/* Col 4: small list */}
            <div className="flex flex-col">
              {rightBooks.map((book, i) => (
                <SmallCard
                  key={book._id}
                  book={book}
                  last={i === rightBooks.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FavouriteReads;
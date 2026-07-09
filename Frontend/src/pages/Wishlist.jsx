import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaBookOpen,
  FaTrashAlt,
  FaRupeeSign,
  FaRegHeart,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import {
  getWishlist,
  removeFromWishlist,
} from "../redux/wishlistSlice";

function Wishlist() {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const removeHandler = (bookId) => {
    dispatch(removeFromWishlist(bookId));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#EDE4CB] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ─── Header ─── */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <FaHeart className="text-2xl text-[#37400B]" />
              <h1 className="text-3xl font-bold text-[#37400B] tracking-tight">
                Wishlist
              </h1>
              <span className="text-sm text-[#BDB47B] ml-1">
                ({books?.length || 0})
              </span>
            </div>
            <Link
              to="/books"
              className="text-sm text-[#37400B] hover:text-[#2A3308] font-medium flex items-center gap-1 transition"
            >
              <FaBookOpen className="text-xs" />
              Browse Books
            </Link>
          </div>

          {books?.length === 0 ? (
            // ─── Empty State ───────────────────────────────────
            <div className="bg-white rounded-2xl shadow p-10 text-center max-w-md mx-auto border border-[#BDB47B]/20">
              <FaRegHeart className="text-5xl text-[#BDB47B] mx-auto mb-4" />
              <h2 className="text-xl font-bold text-[#37400B] mb-2">Empty</h2>
              <p className="text-sm text-[#6B5D4F] mb-6">Save your favourite books here.</p>
              <Link
                to="/books"
                className="inline-block bg-[#37400B] text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-[#2A3308] transition"
              >
                Browse Books
              </Link>
            </div>
          ) : (
            // ─── Grid ───────────────────────────────────────────
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-[#EDE4CB] hover:border-[#BDB47B]/40 flex flex-col"
                >
                  {/* Image */}
                  <Link
                    to={`/books/${book._id}`}
                    className="block relative aspect-[3/4] bg-[#EDE4CB] overflow-hidden"
                  >
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#BDB47B]">
                        <FaBookOpen className="text-3xl opacity-30" />
                      </div>
                    )}
                    {book.discount > 0 && (
                      <span className="absolute top-2 left-2 bg-[#37400B] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        -{book.discount}%
                      </span>
                    )}
                    {/* Remove button (floating on hover) */}
                    <button
                      onClick={() => removeHandler(book._id)}
                      className="absolute top-2 right-2 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-white transition opacity-0 group-hover:opacity-100"
                      aria-label="Remove"
                    >
                      <FaTrashAlt className="w-3.5 h-3.5" />
                    </button>
                  </Link>

                  {/* Content */}
                  <div className="p-3 flex-1 flex flex-col">
                    <Link to={`/books/${book._id}`}>
                      <h3 className="text-sm font-semibold text-[#2B2118] line-clamp-1 group-hover:text-[#37400B] transition">
                        {book.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#6B5D4F] truncate">{book.author}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-sm font-bold text-[#37400B] flex items-center">
                        <FaRupeeSign className="text-xs" />
                        {book.discount > 0 ? book.discountedPrice : book.price}
                      </span>
                      {book.discount > 0 && (
                        <span className="text-[10px] text-[#6B5D4F]/50 line-through">
                          ₹{book.price}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 pt-2 border-t border-[#EDE4CB] flex gap-2">
                      <Link
                        to={`/books/${book._id}`}
                        className="flex-1 text-center bg-[#37400B] text-white text-xs font-medium py-1.5 rounded hover:bg-[#2A3308] transition"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => removeHandler(book._id)}
                        className="px-2.5 py-1.5 border border-red-300 text-red-500 rounded text-xs hover:bg-red-50 transition"
                      >
                        <FaTrashAlt className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Wishlist;
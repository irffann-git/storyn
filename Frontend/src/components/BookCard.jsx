import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// ─── Star Display ──────────────────────────────────────────────
function Stars({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="w-3 h-3 text-[#BDB47B]" />
      ))}
      {hasHalf && <FaStarHalfAlt className="w-3 h-3 text-[#BDB47B]" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="w-3 h-3 text-gray-300" />
      ))}
    </div>
  );
}

// ─── Book Card ────────────────────────────────────────────────
function BookCard({ book }) {
  const dispatch = useDispatch();
  const [imgLoaded, setImgLoaded] = useState(false);

  // ── Check if book is already in wishlist ──
  const wishlist = useSelector((state) => state.wishlist);
  const isInWishlist = wishlist?.books?.some((b) => b._id === book._id) ?? false;

  const handleCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await dispatch(addToCart(book._id));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Added to cart");
    } else {
      toast.error("Failed to add to cart");
    }
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist) {
      const result = await dispatch(removeFromWishlist(book._id));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Removed from wishlist");
      } else {
        toast.error(result.payload || "Failed to remove");
      }
    } else {
      const result = await dispatch(addToWishlist(book._id));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Added to wishlist");
      } else {
        toast.error(result.payload || "Failed to add to wishlist");
      }
    }
  };

  const isBestseller = book.tags?.includes("Bestseller");
  const isNewArrival = book.tags?.includes("New Arrival");

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm transition-all duration-300 overflow-hidden border border-[#EDE4CB] flex flex-col h-full">
      {/* Image Container — Link wraps ONLY navigation content */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <Link
          to={`/books/${book._id}`}
          className="absolute inset-0 block"
          aria-label={book.title}
        >
          {!imgLoaded && (
            <div className="absolute inset-0 animate-pulse bg-[#EDE4CB]" />
          )}

          <img
            src={book.image}
            alt={book.title}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-contain p-4 sm:p-5 transition-all duration-500 group-hover:scale-105 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Quick View overlay on hover (desktop only) */}
          <div className="hidden sm:flex absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
            <span className="bg-white/90 backdrop-blur-sm text-[#37400B] font-medium text-xs px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Quick View
            </span>
          </div>
        </Link>

        {/* Badges - top left (sibling of Link, not inside it) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {book.discount > 0 && (
            <span className="bg-[#37400B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
              -{book.discount}%
            </span>
          )}
          {isBestseller && (
            <span className="bg-[#BDB47B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
              Bestseller
            </span>
          )}
          {isNewArrival && !isBestseller && (
            <span className="bg-[#37400B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
              New
            </span>
          )}
          {book.inStock === false && (
            <span className="bg-gray-800 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-md">
              Out of stock
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 space-y-1.5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/books/${book._id}`} className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-[#37400B] font-semibold hover:text-[#2A3308] transition truncate">
              {book.author || "Unknown"}
            </p>
          </Link>

          {/* Wishlist button - now inside the content box */}
          <button
            type="button"
            onClick={handleWishlist}
            className={`shrink-0 w-7 h-7 text-red-500 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
              isInWishlist
                ? "text-red-500"
                : "text-gray-300 hover:text-red-500"
            }`}
            aria-label="Toggle wishlist"
          >
            {isInWishlist ? (
              <FaHeart className="w-4 h-4" />
            ) : (
              <FaRegHeart className="w-4 h-4" />
            )}
          </button>
        </div>

        <Link to={`/books/${book._id}`}>
          <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug min-h-[2.5rem] group-hover:text-[#37400B] transition-colors">
            {book.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5">
          <Stars rating={book.rating} />
          <span className="text-[10px] text-gray-400 font-medium">
            ({book.numReviews || 0})
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-2 border-t border-[#EDE4CB]">
          <div>
            {book.discount > 0 ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-extrabold text-[#37400B]">
                  ₹{book.discountedPrice}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹{book.price}
                </span>
              </div>
            ) : (
              <span className="text-base font-extrabold text-[#37400B]">
                ₹{book.price}
              </span>
            )}
          </div>

          <button
            onClick={handleCart}
            disabled={!book.inStock}
            className="flex items-center justify-center gap-1 bg-[#37400B] hover:bg-[#2A3308] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-[10px] font-semibold px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-105 disabled:scale-100"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {book.inStock ? "Add" : "Out"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
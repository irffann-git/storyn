import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getBookDetails, getBooks } from "../redux/bookSlice";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist, getWishlist } from "../redux/wishlistSlice";
import { addReview, getReviews, clearReviews } from "../redux/reviewSlice";

import { toast } from "react-toastify";
import {
    FaStar,
    FaStarHalfAlt,
    FaRegStar,
    FaHeart,
    FaRegHeart,
    FaShoppingCart,
    FaShareAlt,
    FaTruck,
    FaShieldAlt,
    FaUndo,
} from "react-icons/fa";

// ─── Star Display ──────────────────────────────────────────────
function StarDisplay({ rating, size = "w-4 h-4", showNumber = false }) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
        <div className="flex items-center gap-0.5">
            {[...Array(fullStars)].map((_, i) => (
                <FaStar key={`full-${i}`} className={`${size} text-amber-500`} />
            ))}
            {hasHalf && <FaStarHalfAlt className={`${size} text-amber-500`} />}
            {[...Array(emptyStars)].map((_, i) => (
                <FaRegStar key={`empty-${i}`} className={`${size} text-orange-200`} />
            ))}
            {showNumber && (
                <span className="ml-1.5 text-sm font-semibold text-[#2B2118]">{rating.toFixed(1)}</span>
            )}
        </div>
    );
}

// ─── Interactive Star Picker ──────────────────────────────────
function StarPicker({ value, onChange }) {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
                <button
                    key={s}
                    type="button"
                    onClick={() => onChange(s)}
                    onMouseEnter={() => setHovered(s)}
                    onMouseLeave={() => setHovered(0)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                >
                    {s <= (hovered || value) ? (
                        <FaStar className="w-7 h-7 text-amber-500" />
                    ) : (
                        <FaRegStar className="w-7 h-7 text-orange-200" />
                    )}
                </button>
            ))}
            {value > 0 && (
                <span className="ml-2 text-sm font-medium text-[#6B5D4F]">{value} / 5</span>
            )}
        </div>
    );
}

// ─── Review Card ──────────────────────────────────────────────
function ReviewCard({ review }) {
    const date = review.createdAt
        ? new Date(review.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
          })
        : "";

    return (
        <div className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[#F0E4D3] overflow-hidden">
            <span
                aria-hidden="true"
                className="absolute -top-3 right-3 font-serif text-7xl text-orange-100 select-none pointer-events-none"
            >
                &rdquo;
            </span>
            <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-serif font-bold text-sm shadow-sm shrink-0">
                        {review.user?.name?.charAt(0).toUpperCase() ?? "U"}
                    </div>
                    <div>
                        <p className="font-semibold text-[#2B2118] text-sm">
                            {review.user?.name ?? "Anonymous"}
                        </p>
                        <p className="text-xs text-[#6B5D4F]/70">{date}</p>
                    </div>
                </div>
                <StarDisplay rating={review.rating} size="w-3.5 h-3.5" />
            </div>
            <p className="relative text-[#4A3F35] text-sm leading-relaxed mt-3 pl-[52px] break-words">
                {review.comment}
            </p>
        </div>
    );
}

// ─── Review Form ──────────────────────────────────────────────
function ReviewForm({ bookId, onSubmitted }) {
    const dispatch = useDispatch();
    const { submitLoading } = useSelector((state) => state.reviews);
    const { user } = useSelector((state) => state.auth);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = async () => {
        if (!rating) return toast.error("Please select a rating");
        if (!comment.trim()) return toast.error("Please write a comment");

        const result = await dispatch(addReview({ bookId, rating, comment }));
        if (result.meta.requestStatus === "fulfilled") {
            toast.success("Review submitted!");
            setRating(0);
            setComment("");
            onSubmitted?.();
        } else {
            toast.error(result.payload || "Failed to submit review");
        }
    };

    if (!user) {
        return (
            <div className="bg-orange-50/60 border border-dashed border-orange-200 rounded-2xl p-8 text-center">
                <p className="text-[#6B5D4F]">
                    Please{" "}
                    <Link to="/login" className="text-orange-600 font-semibold hover:underline">
                        log in
                    </Link>{" "}
                    to write a review.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#F0E4D3]">
            <h3 className="font-serif text-xl font-bold text-[#2B2118] mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full" />
                Add Your Note
            </h3>

            <div className="mb-5">
                <label className="block text-xs uppercase tracking-wide font-semibold text-[#6B5D4F] mb-2">
                    Your Rating
                </label>
                <StarPicker value={rating} onChange={setRating} />
            </div>

            <div className="mb-6">
                <label className="block text-xs uppercase tracking-wide font-semibold text-[#6B5D4F] mb-2">
                    Your Review
                </label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={5}
                    placeholder="Share your thoughts about this book..."
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to bottom, transparent, transparent 27px, #F0E4D3 28px)",
                        lineHeight: "28px",
                    }}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent resize-none transition"
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={submitLoading}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg"
            >
                {submitLoading ? "Submitting…" : "Submit Review"}
            </button>
        </div>
    );
}

// ─── Related Books Component ─────────────────────────────────
function RelatedBooks({ books, currentBookId, category }) {
    const related = books
        ?.filter((b) => b._id !== currentBookId && b.category === category)
        .slice(0, 4);

    if (!related || related.length === 0) return null;

    return (
        <div className="mt-16 sm:mt-20">
            <div className="flex items-center gap-3 mb-6">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2B2118]">You May Also Like</h2>
                <span className="text-sm text-[#6B5D4F]/70">— from {category}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {related.map((b) => (
                    <Link
                        key={b._id}
                        to={`/books/${b._id}`}
                        className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-[#F0E4D3] overflow-hidden hover:-translate-y-1"
                    >
                        <div className="aspect-[3/4] overflow-hidden bg-orange-50">
                            <img
                                src={b.image || "/placeholder-book.jpg"}
                                alt={b.title}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                        <div className="p-3">
                            <h4 className="text-sm font-bold text-[#2B2118] line-clamp-1 group-hover:text-orange-600 transition">
                                {b.title}
                            </h4>
                            <p className="text-xs text-[#6B5D4F] truncate">{b.author}</p>
                            <p className="text-sm font-bold text-orange-600 mt-1">₹{b.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────
function BookDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const imageRef = useRef(null);

    const { book, loading, error, books } = useSelector((state) => state.books);
    const { reviews, loading: reviewsLoading } = useSelector((state) => state.reviews);
    const wishlist = useSelector((state) => state.wishlist);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getBookDetails(id));
        dispatch(getReviews(id));
        if (!books || books.length === 0) {
            dispatch(getBooks());
        }
        if (user) {
            dispatch(getWishlist());
        }
        return () => dispatch(clearReviews());
    }, [dispatch, id, user, books]);

    const isInWishlist = wishlist?.books?.some((b) => b._id === book?._id) ?? false;

    const addToCartHandler = async () => {
        const result = await dispatch(addToCart(book._id));
        if (result.meta.requestStatus === "fulfilled") {
            toast.success("Added to cart");
        } else {
            toast.error("Failed to add to cart");
        }
    };

    const toggleWishlistHandler = async () => {
        if (!user) {
            toast.error("Please log in to use wishlist");
            return;
        }

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

    if (loading) return <Loader />;
    if (error) return <h1>{error}</h1>;
    if (!book) return <h1>Book Not Found</h1>;

    const avgRating = book.rating || 0;

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-[#FFFBF5]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

                    {/* Breadcrumb trail */}
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[#6B5D4F]/70 mb-6 min-w-0 overflow-hidden">
                        <Link to="/" className="hover:text-orange-600 transition shrink-0">Home</Link>
                        <span className="shrink-0">·</span>
                        <Link to={`/collection?category=${book.category}`} className="hover:text-orange-600 transition shrink-0">
                            {book.category}
                        </Link>
                        <span className="shrink-0">·</span>
                        <span className="text-[#2B2118] font-medium truncate min-w-0">{book.title}</span>
                    </div>

                    {/* ── Book Info Grid ── */}
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

                        {/* Cover Section ── styled like an actual book */}
                        <div className="relative max-w-md mx-auto lg:mx-0 w-full lg:self-start lg:sticky lg:top-24">
                            {/* stacked pages behind the cover */}
                            <div className="absolute inset-0 bg-[#FDF3E7] border border-[#F0E4D3] rounded-2xl rotate-[3deg] translate-x-2 translate-y-2" />
                            <div className="absolute inset-0 bg-[#F7E9D7] border border-[#F0E4D3] rounded-2xl -rotate-[2deg] -translate-x-1 translate-y-1" />

                            {/* cover card */}
                            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#F0E4D3] group">
                                {book.image ? (
                                    <img
                                        ref={imageRef}
                                        src={book.image}
                                        alt={book.title}
                                        className="w-full h-[420px] sm:h-[500px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="h-[420px] sm:h-[500px] md:h-[600px] flex items-center justify-center bg-orange-50 text-[#6B5D4F]">
                                        No Image
                                    </div>
                                )}

                                {/* folded page corner */}
                                <div
                                    className="absolute bottom-0 right-0 w-10 h-10 bg-[#FFFBF5] shadow-[-3px_-3px_8px_rgba(43,33,24,0.15)] [clip-path:polygon(100%_0,0%_100%,100%_100%)]"
                                    aria-hidden="true"
                                />

                                {/* Discount ribbon tag */}
                                {book.discount > 0 && (
                                    <span className="absolute top-6 -left-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold py-1.5 pl-3 pr-4 shadow-lg [clip-path:polygon(0_0,100%_0,86%_50%,100%_100%,0_100%)]">
                                        -{book.discount}% OFF
                                    </span>
                                )}

                                {/* Stamp badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 mt-8">
                                    {book.tags?.includes("Bestseller") && (
                                        <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow-lg w-fit">
                                            Bestseller
                                        </span>
                                    )}
                                    {book.tags?.includes("New Arrival") && !book.tags?.includes("Bestseller") && (
                                        <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow-lg w-fit">
                                            New Arrival
                                        </span>
                                    )}
                                </div>

                                {/* Wishlist & Share */}
                                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                                    <button
                                        onClick={toggleWishlistHandler}
                                        className={`w-10 h-10 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110 ${
                                            isInWishlist
                                                ? "bg-red-500 text-white"
                                                : "bg-white/85 text-[#6B5D4F] hover:text-red-500 hover:bg-white"
                                        }`}
                                        aria-label="Toggle wishlist"
                                    >
                                        {isInWishlist ? (
                                            <FaHeart className="w-4 h-4" />
                                        ) : (
                                            <FaRegHeart className="w-4 h-4" />
                                        )}
                                    </button>
                                    <button
                                        className="w-10 h-10 bg-white/85 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center text-[#6B5D4F] hover:text-orange-600 hover:bg-white transition-all hover:scale-110"
                                        aria-label="Share"
                                    >
                                        <FaShareAlt className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="flex flex-col">
                            {/* Eyebrow */}
                            <span className="text-xs uppercase tracking-widest font-semibold text-orange-600 mb-2">
                                {book.category}
                            </span>

                            {/* Title & Author */}
                            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2118] leading-tight mb-2 break-words">
                                {book.title}
                            </h1>
                            <p className="font-serif italic text-lg sm:text-xl text-[#6B5D4F] mb-5">by {book.author}</p>

                            {/* Rating */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-2 bg-amber-50 px-3.5 py-2 rounded-xl">
                                    <StarDisplay rating={avgRating} size="w-4 h-4" showNumber />
                                    <span className="text-sm font-medium text-[#6B5D4F]">
                                        ({book.numReviews || 0} notes)
                                    </span>
                                </div>
                            </div>

                            <div className="h-px bg-[#F0E4D3] mb-6" />

                            {/* Price & Stock */}
                            <div className="flex flex-wrap items-end gap-3 mb-6">
                                <div className="flex items-baseline gap-3">
                                    {book.discount > 0 ? (
                                        <>
                                            <span className="text-3xl sm:text-4xl font-extrabold text-orange-600">
                                                ₹{book.discountedPrice}
                                            </span>
                                            <span className="text-lg text-[#6B5D4F]/60 line-through">
                                                ₹{book.price}
                                            </span>
                                            <span className="bg-rose-50 text-rose-600 text-xs font-bold py-1 pl-2.5 pr-3.5 [clip-path:polygon(0_0,100%_0,88%_50%,100%_100%,0_100%)]">
                                                Save ₹{book.price - book.discountedPrice}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-3xl sm:text-4xl font-extrabold text-orange-600">
                                            ₹{book.price}
                                        </span>
                                    )}
                                </div>
                                <div className="sm:ml-auto">
                                    {book.inStock ? (
                                        <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                            In Stock
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Tags — stamp style */}
                            {book.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {book.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[11px] font-semibold tracking-wide text-orange-700 bg-orange-50 border border-dashed border-orange-300 px-3 py-1 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Description — with drop cap */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0E4D3] mb-6">
                                <h2 className="font-serif text-lg font-bold text-[#2B2118] mb-3">About this Book</h2>
                                <p className="text-[#4A3F35] leading-relaxed break-words first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:text-orange-600 first-letter:float-left first-letter:mr-2 first-letter:leading-[0.85]">
                                    {book.description}
                                </p>
                            </div>

                            {/* Delivery — ticket stub style */}
                            <div className="bg-white rounded-xl shadow-sm border border-[#F0E4D3] mb-6 flex divide-x divide-dashed divide-[#F0E4D3]">
                                <div className="flex-1 p-3 text-center">
                                    <FaTruck className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                                    <p className="text-[10px] text-[#6B5D4F] font-medium">Free Delivery</p>
                                </div>
                                <div className="flex-1 p-3 text-center">
                                    <FaShieldAlt className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                                    <p className="text-[10px] text-[#6B5D4F] font-medium">Secure Payment</p>
                                </div>
                                <div className="flex-1 p-3 text-center">
                                    <FaUndo className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                                    <p className="text-[10px] text-[#6B5D4F] font-medium">30 Days Return</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={addToCartHandler}
                                    disabled={!book.inStock}
                                    className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-lg hover:shadow-orange-400/30 flex items-center justify-center gap-2"
                                >
                                    <FaShoppingCart />
                                    {book.inStock ? "Add to Cart" : "Out of Stock"}
                                </button>
                                <button
                                    onClick={toggleWishlistHandler}
                                    className={`flex-1 px-8 py-4 rounded-full font-bold text-base transition-all flex items-center justify-center gap-2 hover:shadow-lg border-2 ${
                                        isInWishlist
                                            ? "bg-red-500 border-red-500 text-white"
                                            : "border-red-400 text-red-500 hover:bg-red-500 hover:text-white"
                                    }`}
                                >
                                    {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                                    {isInWishlist ? "Wishlisted" : "Wishlist"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Reader Notes / Reviews Section ── */}
                    <div className="mt-16 sm:mt-20">
                        <div className="flex items-center gap-3 mb-8">
                            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2B2118]">Reader Notes</h2>
                            {reviews.length > 0 && (
                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                                    {reviews.length}
                                </span>
                            )}
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Review Form */}
                            <div>
                                <ReviewForm
                                    bookId={id}
                                    onSubmitted={() => dispatch(getReviews(id))}
                                />
                            </div>

                            {/* Reviews List */}
                            <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                {reviewsLoading ? (
                                    <div className="flex justify-center py-12">
                                        <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
                                    </div>
                                ) : reviews.length === 0 ? (
                                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#F0E4D3]">
                                        <p className="font-serif text-[#6B5D4F] text-lg">No notes yet.</p>
                                        <p className="text-sm text-[#6B5D4F]/60">Be the first to leave one.</p>
                                    </div>
                                ) : (
                                    reviews.map((review) => (
                                        <ReviewCard key={review._id} review={review} />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── RELATED BOOKS ── */}
                    <RelatedBooks
                        books={books}
                        currentBookId={id}
                        category={book.category}
                    />

                </div>
            </div>

            <Footer />

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #FDF3E7;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #F59E0B;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #EA580C;
                }
            `}</style>
        </>
    );
}

export default BookDetails;
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

// ─── Star Rating Component ─────────────────────────────────────
function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {/* Filled stars - yellow fill + black outline */}
      {[...Array(fullStars)].map((_, i) => (
        <FaStar
          key={`full-${i}`}
          className="w-3.5 h-3.5 text-[#C9A800] [&>path]:stroke-[#1a1a1a] [&>path]:stroke-[1.5px]"
        />
      ))}
      {/* Half star - yellow fill + black outline */}
      {hasHalf && (
        <FaStarHalfAlt className="w-3.5 h-3.5 text-[#C9A800] [&>path]:stroke-[#1a1a1a] [&>path]:stroke-[1.5px]" />
      )}
      {/* Empty stars - black outline only */}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar
          key={`empty-${i}`}
          className="w-3.5 h-3.5 text-[#1a1a1a]"
        />
      ))}
    </div>
  );
}

// ─── Book Slide ─────────────────────────────────────────────────
function BookSlide({ book }) {
  return (
    <Link to={`/books/${book._id}`} className="block group">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <p className="text-xs uppercase tracking-widest text-[#6B5D4F] mt-3">
        {book.author || "Unknown Author"}
      </p>

      <h3 className="font-bold text-base sm:text-lg text-[#2B2118] mt-1 line-clamp-2 group-hover:text-[#37400B] transition">
        {book.title}
      </h3>

      {/* Real rating with black outline + yellow fill */}
      <div className="flex items-center gap-2 mt-1.5 ">
        <StarRating rating={book.rating || 0} />
        <span className="text-xs text-[#6B5D4F]">({book.numReviews || 0})</span>
      </div>

      {/* Price */}
      <div className="mt-2">
        {book.discount > 0 ? (
          <>
            <span className="text-lg font-bold text-[#37400B]">
              ₹{book.discountedPrice ?? book.price}
            </span>
            <span className="ml-2 text-sm text-[#6B5D4F]/60 line-through">
              ₹{book.price}
            </span>
          </>
        ) : (
          <span className="text-lg font-bold text-[#37400B]">
            ₹{book.price}
          </span>
        )}
      </div>
    </Link>
  );
}

// ─── Main Component ────────────────────────────────────────────
function NewArrival() {
  const { books } = useSelector((state) => state.books);

  const trendingBooks =
    books?.filter((book) => book.tags?.includes("New Arrival")).slice(0, 10) ?? [];

  return (
    <section className="py-16 bg-[#EDE4CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#37400B]">New Arrival</h2>
          <Link
            to="/collection/new-arrival"
            className="text-sm font-semibold text-[#37400B] hover:text-[#2A3308] transition flex items-center gap-1"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start">
          {/* Carousel — 3/5 */}
          <div className="lg:col-span-3 min-w-0">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={trendingBooks.length > 4}
              slidesPerGroup={1}
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 16 },
                640: { slidesPerView: 3, spaceBetween: 16 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
              }}
            >
              {trendingBooks.map((book) => (
                <SwiperSlide key={book._id}>
                  <BookSlide book={book} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Promo Card — 2/5 */}
          <div
            className="lg:col-span-2 rounded-xl text-white p-8 flex flex-col justify-between h-full min-h-[300px] relative overflow-hidden"
            style={{
              backgroundImage: "url('/promo7.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Link to="/books?discount=90" className="relative z-10 h-full flex flex-col justify-between">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-black/90 via-black/70 to-black/30" />
              <div className="relative z-10">
                <p className="text-lg font-medium">Buy One, Get One</p>
                <h2 className="text-5xl sm:text-6xl font-black mt-4">90% OFF</h2>
                <p className="mt-4 text-white/90">Our monthly Picks.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewArrival;
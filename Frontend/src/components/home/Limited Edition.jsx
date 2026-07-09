import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

function BookSlide({ book }) {
  return (
    <Link to={`/books/${book._id}`} className="block group">
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-60 object-cover rounded-xl"
      />

      <p className="text-xs uppercase tracking-widest text-gray-400 mt-3">
        {book.author || "Unknown Author"}
      </p>

      <h3 className="font-bold text-md mt-2 line-clamp-2">
        {book.title}
      </h3>

      <p className="text-orange-500 mt-1">★★★★★</p>

      <div className="mt-1">
        {book.discount > 0 ? (
          <>
            <span className="text-xl font-bold text-green-600">
              ₹{book.discountedPrice ?? book.price}
            </span>
            <span className="ml-2 line-through text-gray-400">
              ₹{book.price}
            </span>
          </>
        ) : (
          <span className="text-xl font-bold text-green-600">
            ₹{book.price}
          </span>
        )}
      </div>
    </Link>
  );
}

function LimitedEdition() {
  const { books } = useSelector((state) => state.books);

  const trendingBooks =
    books?.filter((book) => book.tags?.includes("Limited Edition")).slice(0, 10) ?? [];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Limited Edition Books</h2>
          <Link to="/collection/limited-edition" className="text-sm font-semibold hover:text-orange-500">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start">

         

          {/* Right: Promo Card — 2/5 */}
          <div
            className="lg:col-span-2 rounded-xl text-white p-8 flex flex-col justify-between h-100 relative overflow-hidden"
            style={{
              backgroundImage: "url('/promo6.avif')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
     <Link to={"/books?discount=15"}>
            {/* Dark overlay so text is readable */}
            
<div className="absolute inset-0 rounded-xl bg-gradient-to-b from-black/90 via-black/70 to-black/30" />
            {/* Content above overlay */}
            <div className="relative z-10">
              <p className="text-lg font-medium">Buy One, Get One</p>
              <h2 className="text-6xl font-black mt-4">15% OFF</h2>
              <p className="mt-4 text-white/90">Valid on selected books only.</p>
            </div>
            </Link>

           
          </div>


           {/* Left: Carousel — 3/5 */}
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
    0: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  }}
>
              {trendingBooks.map((book) => (
                <SwiperSlide key={book._id}>
                  <BookSlide book={book} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>
    </section>
  );
}

export default LimitedEdition;
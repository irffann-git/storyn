import { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const SWIPER_STYLES = `
  .featured-swiper {
    overflow: visible !important;
    clip-path: inset(0 -10px);
  }
  .featured-swiper .swiper-wrapper {
    padding: 8px 0;
  }
  .featured-swiper .swiper-button-next::after,
  .featured-swiper .swiper-button-prev::after {
    display: none;
  }
`;

const BREAKPOINTS = {
  0:    { slidesPerView: 2, spaceBetween: 12 },
  480:  { slidesPerView: 3, spaceBetween: 16 },
  768:  { slidesPerView: 4, spaceBetween: 20 },
  1024: { slidesPerView: 6, spaceBetween: 24 },
  1280: { slidesPerView: 7, spaceBetween: 28 },
};

function BookSlide({ book }) {
  return (
    <Link to={`/books/${book._id}`}>
      <div className="group flex justify-center py-4 px-1">
        <div
          className="
            relative flex items-center justify-center
            w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40
            rounded-full bg-white
            border border-gray-100
            shadow-md
            transition-all duration-300 ease-out
            group-hover:shadow-xl group-hover:scale-105
          "
        >
          <span
            className="
              absolute inset-0 rounded-full
              ring-2 ring-[#37400B] ring-offset-2
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
            "
          />
          <img
            src={book.image}
            alt={book.title}
            className="
              w-[75%] h-[75%]
              object-contain drop-shadow-sm
              transition-transform duration-300
              group-hover:scale-150
            "
          />
        </div>
      </div>
    </Link>
  );
}

function FeaturedBooks() {
  const swiperRef = useRef(null);
  const { books } = useSelector((state) => state.books);
  const featuredBooks = books?.filter((b) => b.featured).slice(0, 10) ?? [];

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  if (featuredBooks.length === 0) {
    return (
      <section className="py-16 bg-[#EDE4CB]">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <p className="text-[#BDB47B] text-sm">No featured books available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#EDE4CB]">
      <style>{SWIPER_STYLES}</style>

      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 relative">

        <button
          onClick={handlePrev}
          className="
            absolute left-0 top-1/2 -translate-y-1/2 z-10
            text-[#BDB47B] hover:text-[#37400B]
            transition-colors duration-200
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="
            absolute right-0 top-1/2 -translate-y-1/2 z-10
            text-[#BDB47B] hover:text-[#37400B]
            transition-colors duration-200
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <Swiper
          className="featured-swiper"
          modules={[Navigation, Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          loop={featuredBooks.length > 7}
          slidesPerGroup={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={BREAKPOINTS}
        >
          {featuredBooks.map((book) => (
            <SwiperSlide key={book._id}>
              <BookSlide book={book} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

export default FeaturedBooks;
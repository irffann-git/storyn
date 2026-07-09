import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────
   HERO SLIDES
───────────────────────────────────────── */
const heroSlides = [
  {
    id: 1,
    image: "/hero1.png",
    eyebrow: "New Season Collection",
    title: "Bestsellers of the Month",
    subtitle: "Discover the most loved stories of 2026",
    cta: "Explore Now",
    ctaLink: "/books",
  },
  {
    id: 2,
    image: "/hero2.png",
    eyebrow: "Limited Time Offer",
    title: "Summer Reading Sale",
    subtitle: "Up to 40% off on selected titles",
    cta: "Grab the Deal",
    ctaLink: "/books",
  },
  {
    id: 3,
    image: "/hero3.png",
    eyebrow: "Just Arrived",
    title: "Fresh From the Press",
    subtitle: "Be the first to discover new voices",
    cta: "Shop New",
    ctaLink: "/books",
  },
];

function Hero() {
  const [slide, setSlide] = useState(0);
  const timerRef = useRef(null);

  const resetTimer = () => {
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const goSlide = (index) => {
    setSlide(index);
    resetTimer();
  };

  return (
    <section
      className="relative w-full bg-[#2A3308]"
      // More sensible height: smaller on mobile, taller on desktop
      style={{
        height: "clamp(400px, 60vh, 1000px)",
      }}
    >
      {/* Background Images */}
      {heroSlides.map((item, index) => (
        <div
          key={item.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: index === slide ? 1 : 0,
            zIndex: index === slide ? 1 : 0,
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(.45)" }}
          />
        </div>
      ))}

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex items-center px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-xl">
            {/* Eyebrow badge */}
            <span className="inline-flex items-center gap-2 bg-[#37400B] text-white text-xs sm:text-sm font-bold uppercase tracking-widest px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-5">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              {heroSlides[slide].eyebrow}
            </span>

            {/* Title with responsive sizing */}
            <h1
              key={slide}
              className="text-[clamp(1.75rem,5vw,3.75rem)] font-black text-white leading-tight mb-4 sm:mb-5"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {heroSlides[slide].title}
            </h1>

            {/* Subtitle */}
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md">
              {heroSlides[slide].subtitle}
            </p>

            {/* CTA Buttons – stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to={heroSlides[slide].ctaLink}
                className="inline-flex items-center justify-center gap-2 bg-[#37400B] hover:bg-[#2A3308] text-white font-semibold px-6 py-3 rounded-full transition text-center"
              >
                {heroSlides[slide].cta}
                <i className="fas fa-arrow-right text-xs"></i>
              </Link>

              <Link
                to="/books"
                className="inline-flex items-center justify-center gap-2 text-white hover:text-[#BDB47B] transition py-3 px-4 rounded-full"
              >
                <i className="fas fa-th-large"></i>
                Browse All
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Counter – hidden on small screens, absolute on medium+ */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-end gap-1">
        <span
          className="text-white text-2xl font-bold"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {String(slide + 1).padStart(2, "0")}
        </span>
        <span className="text-white/40">
          / {String(heroSlides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Dots – larger touch area on mobile */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              slide === index
                ? "w-6 h-2.5 bg-[#BDB47B] md:w-7 md:h-2"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white md:w-2 md:h-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
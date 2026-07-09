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
      className="relative w-full bg-[#2A3308]"  // dark olive fallback
      style={{ height: "clamp(100px,81vh,1200px)" }}
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
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 bg-[#37400B] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              {heroSlides[slide].eyebrow}
            </span>

            <h1
              key={slide}
              className="text-[clamp(2rem,5vw,3.75rem)] font-black text-white leading-tight mb-5"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {heroSlides[slide].title}
            </h1>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8">
              {heroSlides[slide].subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to={heroSlides[slide].ctaLink}
                className="bg-[#37400B] hover:bg-[#2A3308] text-white font-semibold px-7 py-3.5 rounded-full transition flex items-center gap-2"
              >
                {heroSlides[slide].cta}
                <i className="fas fa-arrow-right text-xs"></i>
              </Link>

              <Link
                to="/books"
                className="text-white hover:text-[#BDB47B] transition flex items-center gap-2"
              >
                <i className="fas fa-th-large"></i>
                Browse All
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-end gap-1">
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

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              slide === index
                ? "w-7 h-2 bg-[#BDB47B]"
                : "w-2 h-2 bg-white/40 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
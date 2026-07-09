import { Link } from "react-router-dom";

const promos = [
  {
    id: 1,
    eyebrow: "SUMMER SALE",
    heading: "Sale 25% OFF",
    link: "/books?discount=25",
    bg: "bg-[#37400B]",        // dark olive
    image: "/promo1.jpg",
  },
  {
    id: 2,
    eyebrow: "NOVEL EVERY DAY!",
    heading: "Sale 45% OFF",
    link: "/books?discount=45",
    bg: "bg-[#BDB47B]",        // khaki – works because overlay darkens text area
    image: "/promo2.jpg",
  },
];

function PromoCard({ eyebrow, heading, link, bg, image }) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl ${bg}
        flex-1 min-h-[200px] sm:min-h-[250px] md:min-h-[350px]
      `}
    >
      {/* Full background book image */}
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="
          absolute inset-0
          w-full h-full
          object-cover
          pointer-events-none select-none
        "
      />

      {/* Dark‑to‑light gradient overlay for text readability */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r from-black/100 via-black/30 to-transparent
          pointer-events-none select-none z-10
        "
      />

      {/* Content */}
      <div className="relative z-20 p-6 sm:p-8 flex flex-col gap-3 max-w-[65%] sm:max-w-[55%]">
        <p className="text-white/80 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
          {eyebrow}
        </p>
        <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
          {heading}
        </h3>
        <Link
          to={link}
          className="
            mt-2 inline-flex items-center gap-1
            bg-white text-[#37400B]
            text-xs font-bold tracking-widest uppercase
            px-5 py-2.5 rounded-full
            w-fit
            hover:bg-[#EDE4CB] hover:text-[#2A3308] transition-colors duration-200
          "
        >
          Shop Now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function PromoCards() {
  return (
    <section className="py-20 bg-[#EDE4CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-5">
          {promos.map((promo) => (
            <PromoCard key={promo.id} {...promo} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PromoCards;
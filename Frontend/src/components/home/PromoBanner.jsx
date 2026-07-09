import { Link } from "react-router-dom";

function PromoBanner() {
  return (
    <section className="py-16 bg-[#EDE4CB]">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="relative overflow-hidden rounded-3xl h-[400px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('promobanner.jpg')", // your image
          }}
        >
          {/* Dark overlay – unchanged (works with any palette) */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent from-10% via-black/80 via-40% to-black" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-end px-8 lg:px-20">
            <div className="max-w-sm text-white">
              <p className="uppercase tracking-[3px] text-sm font-bold text-white/80 mb-2">
                Special Offer
              </p>

              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Books Under
                <br />
                <span className="text-[#BDB47B]">₹300</span>
              </h2>

              <p className="mt-4 text-white/80">
                Explore our premium collection of bestselling books priced Under ₹300.
              </p>

              <Link
                to="/books?priceMax=300"
                className="inline-flex items-center gap-2 mt-8 bg-white text-[#37400B] px-7 py-3 rounded-full font-semibold hover:bg-[#EDE4CB] hover:text-[#2A3308] transition-colors"
              >
                SHOP NOW →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
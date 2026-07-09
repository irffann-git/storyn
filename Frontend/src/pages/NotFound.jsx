import { Link } from "react-router-dom";
import { FaBookOpen, FaHome } from "react-icons/fa";

function NotFound() {
  return (
    <div className="min-h-screen bg-[#EDE4CB] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        {/* ─── Illustration / Icon ─── */}
        <div className="relative inline-block mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full shadow-xl flex items-center justify-center mx-auto border border-[#EDE4CB] relative">
            <div className="absolute -top-2 -right-2 bg-[#37400B] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              404
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-24 h-24 bg-[#BDB47B] rounded-full blur-2xl" />
              </div>
              <FaBookOpen className="text-6xl md:text-7xl text-[#37400B] relative z-10" />
            </div>
          </div>
        </div>

        {/* ─── Heading ─── */}
        <h1 className="text-6xl md:text-7xl font-bold text-[#37400B] tracking-tight mb-2 font-serif">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-[#37400B] mb-3">
          Page Not Found
        </h2>

        {/* ─── Divider ─── */}
        <div className="w-16 h-1 bg-[#BDB47B] mx-auto rounded-full mb-5" />

        {/* ─── Message ─── */}
        <p className="text-[#6B5D4F] text-sm md:text-base max-w-sm mx-auto leading-relaxed mb-8">
          Oops! The page you're looking for seems to have wandered off the shelf.
          Let's get you back to browsing our collection.
        </p>

        {/* ─── Actions ─── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#37400B] hover:bg-[#2A3308] text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <FaHome className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/books"
            className="inline-flex items-center gap-2 border-2 border-[#BDB47B] text-[#37400B] hover:bg-[#EDE4CB] px-8 py-3.5 rounded-xl font-semibold text-sm transition-all"
          >
            <FaBookOpen className="w-4 h-4" />
            Browse Books
          </Link>
        </div>

        {/* ─── Footer Text ─── */}
        <p className="mt-8 text-xs text-[#BDB47B]">
          Error 404 • Page not found
        </p>
      </div>
    </div>
  );
}

export default NotFound;
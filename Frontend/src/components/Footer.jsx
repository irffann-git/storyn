import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterest,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaRupeeSign,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2A3308] text-[#EDE4CB]">
      {/* ─── Main Footer ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* ─── Column 1: Brand ─── */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-serif font-bold tracking-wider text-white">
                Storyn<span className="text-[#BDB47B]">.</span>
              </h2>
            </Link>
            <p className="text-sm text-[#BDB47B]/70 leading-relaxed max-w-xs">
              Discover a world of stories, knowledge, and inspiration. Storyn connects readers with books they love.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#37400B]/50 hover:bg-[#37400B] text-[#BDB47B] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#37400B]/50 hover:bg-[#37400B] text-[#BDB47B] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#37400B]/50 hover:bg-[#37400B] text-[#BDB47B] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#37400B]/50 hover:bg-[#37400B] text-[#BDB47B] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#37400B]/50 hover:bg-[#37400B] text-[#BDB47B] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Pinterest"
              >
                <FaPinterest className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ─── Column 2: Quick Links ─── */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/books" className="text-[#BDB47B]/70 hover:text-white text-sm transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link to="/collection/bestseller" className="text-[#BDB47B]/70 hover:text-white text-sm transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/collection/new-arrival" className="text-[#BDB47B]/70 hover:text-white text-sm transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/collection/featured" className="text-[#BDB47B]/70 hover:text-white text-sm transition-colors">
                  Featured Books
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#BDB47B]/70 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* ─── Column 3: Help & Support ─── */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Help & Support
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/contact" className="text-[#BDB47B]/70 hover:text-white text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-[#BDB47B]/70 hover:text-white text-sm transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-[#BDB47B]/70 hover:text-white text-sm transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-[#BDB47B]/70 hover:text-white text-sm transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-[#BDB47B]/70 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* ─── Column 4: Contact & Newsletter ─── */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-[#BDB47B]/70">
                <FaMapMarkerAlt className="w-4 h-4 mt-0.5 text-[#BDB47B] flex-shrink-0" />
                <span>123 Book Street, Literary District, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#BDB47B]/70">
                <FaPhoneAlt className="w-4 h-4 text-[#BDB47B] flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#BDB47B]/70">
                <FaEnvelope className="w-4 h-4 text-[#BDB47B] flex-shrink-0" />
                <a href="mailto:info@storyn.com" className="hover:text-white transition-colors">
                  info@storyn.com
                </a>
              </div>
            </div>

            {/* ─── Newsletter ─── */}
            <div className="mt-5">
              <p className="text-sm text-[#BDB47B]/70 mb-2.5">
                Subscribe for updates &amp; offers
              </p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 rounded-l-xl bg-[#37400B]/50 border border-[#37400B] text-white placeholder:text-[#BDB47B]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#BDB47B] focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#BDB47B] hover:bg-[#D4CCA0] text-[#2A3308] font-semibold text-sm rounded-r-xl transition-all"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ─── Divider ─── */}
        <div className="border-t border-[#37400B] mt-10 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* ─── Copyright ─── */}
            <p className="text-sm text-[#BDB47B]/60">
              &copy; {currentYear} <span className="text-white font-medium">Storyn</span> Book Store. All rights reserved.
            </p>

            {/* ─── Payment Methods ─── */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#BDB47B]/50 uppercase tracking-wider mr-1">We Accept</span>
              <FaCcVisa className="w-8 h-8 text-[#BDB47B]/40 hover:text-[#BDB47B] transition-colors" />
              <FaCcMastercard className="w-8 h-8 text-[#BDB47B]/40 hover:text-[#BDB47B] transition-colors" />
              <FaCcPaypal className="w-8 h-8 text-[#BDB47B]/40 hover:text-[#BDB47B] transition-colors" />
              <FaCcAmex className="w-8 h-8 text-[#BDB47B]/40 hover:text-[#BDB47B] transition-colors" />
              <span className="flex items-center gap-0.5 text-[#BDB47B]/40 hover:text-[#BDB47B] transition-colors">
                <FaRupeeSign className="w-4 h-4" />
                <span className="text-xs font-semibold">UPI</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
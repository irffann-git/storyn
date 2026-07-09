import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import StorynLogo from "../../public/StorynLogo";
import { CATEGORY_STRUCTURE } from "../constants/categories";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { books } = useSelector((state) => state.books);

  const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // ── UI state ──
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [userOpen, setUserOpen] = useState(false);

  // ── Refs ──
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // ── Scroll listener ──
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Click‑outside ──
  useEffect(() => {
    const handleClickOutside = (e) => {
      const isInsideDesktop = desktopSearchRef.current?.contains(e.target);
      const isInsideMobile = mobileSearchRef.current?.contains(e.target);
      if (!isInsideDesktop && !isInsideMobile) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Lock body scroll ──
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // ── Search results ──
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return (books || []).filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q)
    );
  }, [books, searchQuery]);

  // ── Handlers ──
  const closeMobile = useCallback(() => {
    setIsMobileMenuOpen(false);
    setOpenCategory(null);
    setUserOpen(false);
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch(logout());
    navigate("/");
    closeMobile();
  }, [dispatch, navigate, closeMobile]);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value.trim() !== "");
  }, []);

  const handleResultClick = useCallback(
    (book) => {
      setShowSearchResults(false);
      setSearchQuery("");
      const id = book._id || book.id;
      navigate(`/books/${id}`);
    },
    [navigate]
  );

  // ── Render search results ──
  const renderSearchResults = () => {
    if (!showSearchResults || !searchQuery.trim()) return null;
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-y-auto max-h-80 z-50">
        {searchResults.length > 0 ? (
          searchResults.map((book) => (
            <button
              key={book._id}
              onClick={() => handleResultClick(book)}
              className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-[#EDE4CB] transition-colors border-b border-gray-50 last:border-0"
            >
              <img
                src={book.image || "/placeholder-book.jpg"}
                alt={book.title}
                className="w-10 h-14 object-cover rounded flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{book.title}</p>
                <p className="text-xs text-gray-500 truncate">{book.author}</p>
              </div>
            </button>
          ))
        ) : (
          <p className="px-4 py-4 text-sm text-gray-500 text-center">
            No results for "{searchQuery}"
          </p>
        )}
      </div>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-gray-200 transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      {/* ── Utility bar (md+) ── */}
      <div className="hidden md:block bg-[#37400B] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-[#EDE4CB] transition-colors">
              <i className="fas fa-phone-alt" />
              +91 98765 43210
            </a>
            <a href="mailto:info@storyn.com" className="flex items-center gap-1.5 hover:text-[#EDE4CB] transition-colors">
              <i className="fas fa-envelope" />
              info@storyn.com
            </a>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/stores" className="flex items-center gap-1.5 hover:text-[#EDE4CB] transition-colors">
              <i className="fas fa-store" />
              Find a store
            </Link>
            <Link to="/contact" className="flex items-center gap-1.5 hover:text-[#EDE4CB] transition-colors">
              <i className="fas fa-headset" />
              24/7 Support
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 hover:opacity-90 transition-opacity">
            <StorynLogo />
          </Link>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6 relative" ref={desktopSearchRef}>
            <div className="flex w-full rounded-lg border border-gray-300 focus-within:border-[#37400B] focus-within:ring-2 focus-within:ring-[#37400B]/20 bg-white overflow-hidden transition-all">
              <input
                type="text"
                placeholder="Search books, authors..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
                className="flex-1 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none"
              />
              <button
                type="button"
                className="px-4 py-2.5 bg-[#37400B] text-white hover:bg-[#2A3308] transition-colors text-sm font-medium flex items-center gap-1.5 flex-shrink-0"
              >
                <i className="fas fa-search text-xs" />
                <span>Search</span>
              </button>
            </div>
            {renderSearchResults()}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-auto">
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-gray-500 hover:text-[#37400B] hover:bg-[#EDE4CB] transition-colors"
            >
              <i className="far fa-heart text-lg" />
            </Link>

            <Link
              to="/cart"
              aria-label="Cart"
              className="relative flex w-9 h-9 items-center justify-center rounded-lg text-gray-500 hover:text-[#37400B] hover:bg-[#EDE4CB] transition-colors"
            >
              <i className="fas fa-shopping-bag text-lg" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#37400B] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* User dropdown – desktop */}
            {user ? (
              <div className="relative group hidden md:block">
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium">
                  <i className="fas fa-user-circle text-xl text-[#37400B]" />
                  <span className="hidden lg:inline max-w-[100px] truncate">{user?.user?.name}</span>
                  <i className="fas fa-chevron-down text-[10px] text-gray-400 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 scale-95 group-hover:scale-100 origin-top-right z-30">
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#EDE4CB] transition-colors">
                    <i className="fas fa-user w-4 text-[#37400B] text-center text-xs" /> Profile
                  </Link>
                  <Link to="/my-orders" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#EDE4CB] transition-colors">
                    <i className="fas fa-box w-4 text-[#37400B] text-center text-xs" /> My Orders
                  </Link>
                  <Link to="/addresses" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#EDE4CB] transition-colors">
                    <i className="fas fa-map-pin w-4 text-[#37400B] text-center text-xs" /> Addresses
                  </Link>
                  {user?.user?.role === "admin" && (
                    <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#37400B] font-medium hover:bg-[#EDE4CB] transition-colors">
                      <i className="fas fa-crown w-4 text-center text-xs" /> Admin
                    </Link>
                  )}
                  <div className="my-1 border-t border-gray-100" />
                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <i className="fas fa-sign-out-alt w-4 text-center text-xs" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#37400B] hover:bg-gray-50 rounded-lg transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium bg-[#37400B] text-white rounded-lg hover:bg-[#2A3308] transition-colors shadow-sm">
                  Register
                </Link>
              </div>
            )}

            {/* Hamburger */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-lg`} />
            </button>
          </div>
        </div>

        {/* ── Mobile search bar ── */}
        <div className="md:hidden pb-3 relative" ref={mobileSearchRef}>
          <div className="flex rounded-lg border border-gray-300 focus-within:border-[#37400B] focus-within:ring-2 focus-within:ring-[#37400B]/20 bg-white overflow-hidden transition-all">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
              className="flex-1 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none"
            />
            <button
              type="button"
              className="px-4 py-2.5 bg-[#37400B] text-white hover:bg-[#2A3308] transition-colors flex-shrink-0"
            >
              <i className="fas fa-search text-sm" />
            </button>
          </div>
          {renderSearchResults()}
        </div>
      </div>

      {/* ── Desktop nav bar ── */}
      <nav className="hidden md:block border-t border-gray-100 bg-[#EDE4CB] bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-1 h-11 text-sm font-medium text-gray-700">
            {Object.entries(CATEGORY_STRUCTURE).map(([cat, subcats]) => (
              <li className="relative group" key={cat}>
                <Link
                  to={`/collection?category=${encodeURIComponent(cat)}`}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white hover:text-[#37400B] hover:shadow-sm transition-all"
                >
                  <i className="fas fa-book text-[#37400B] text-xs" />
                  {cat}
                  <i className="fas fa-chevron-down text-[9px] text-gray-400 group-hover:rotate-180 transition-transform duration-200" />
                </Link>
                <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 scale-95 group-hover:scale-100 origin-top-left z-30">
                  {subcats.map((sub) => (
                    <Link
                      key={sub}
                      to={`/collection?category=${encodeURIComponent(cat)}&subcategory=${encodeURIComponent(sub)}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#EDE4CB] hover:text-[#37400B] transition-colors"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
            <li>
              <Link to="/about" className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white hover:text-[#37400B] hover:shadow-sm transition-all">
                <i className="fas fa-info-circle text-[#37400B] text-xs" />
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white hover:text-[#37400B] hover:shadow-sm transition-all">
                <i className="fas fa-envelope text-[#37400B] text-xs" />
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobile}
      />

      {/* ── Mobile drawer ── */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 flex-shrink-0">
          <Link to="/" onClick={closeMobile} className="flex items-center hover:opacity-90 transition-opacity">
            <StorynLogo />
          </Link>
          <button
            onClick={closeMobile}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Drawer body */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          <ul className="space-y-0.5 text-sm font-medium text-gray-700">
            {Object.entries(CATEGORY_STRUCTURE).map(([cat, subcats]) => (
              <li key={cat}>
                <div className="flex items-center justify-between w-full rounded-lg hover:bg-gray-50 transition-colors">
                  <Link
                    to={`/collection?category=${encodeURIComponent(cat)}`}
                    onClick={closeMobile}
                    className="flex items-center gap-2.5 flex-1 px-3 py-2.5 text-gray-700 hover:text-[#37400B] transition-colors"
                  >
                    <i className="fas fa-book text-[#37400B] text-xs w-4 text-center" />
                    {cat}
                  </Link>
                  <button
                    onClick={() => setOpenCategory(openCategory === cat ? null : cat)}
                    className="px-3 py-2.5 text-gray-400 hover:text-[#37400B] transition-colors"
                    aria-label={`Toggle ${cat} subcategories`}
                  >
                    <i className={`fas fa-chevron-down text-[10px] transition-transform duration-200 ${openCategory === cat ? "rotate-180" : ""}`} />
                  </button>
                </div>
                {openCategory === cat && (
                  <ul className="mt-0.5 ml-7 space-y-0.5">
                    {subcats.map((sub) => (
                      <li key={sub}>
                        <Link
                          to={`/collection?category=${encodeURIComponent(cat)}&subcategory=${encodeURIComponent(sub)}`}
                          onClick={closeMobile}
                          className="block px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-[#EDE4CB] hover:text-[#37400B] transition-colors"
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            {/* Static nav links */}
            {[
              { to: "/about", icon: "fa-info-circle", label: "About" },
              { to: "/contact", icon: "fa-envelope", label: "Contact" },
              { to: "/wishlist", icon: "fa-heart", label: "Wishlist" },
            ].map(({ to, icon, label }) => (
              <li key={label}>
                <Link
                  to={to}
                  onClick={closeMobile}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-gray-50 hover:text-[#37400B] transition-colors"
                >
                  <i className={`fas ${icon} text-[#37400B] text-xs w-4 text-center`} />
                  {label}
                </Link>
              </li>
            ))}

            {/* Logged‑in user section */}
            {user && (
              <>
                <li className="pt-2">
                  <div className="border-t border-gray-100" />
                </li>
                <li>
                  <button
                    onClick={() => setUserOpen(!userOpen)}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <i className="fas fa-user-circle text-[#37400B] text-base w-4 text-center" />
                      <span className="font-semibold text-gray-900 truncate max-w-[150px]">
                        {user?.user?.name}
                      </span>
                    </span>
                    <i className={`fas fa-chevron-down text-[10px] text-gray-400 transition-transform duration-200 ${userOpen ? "rotate-180" : ""}`} />
                  </button>
                  {userOpen && (
                    <ul className="mt-0.5 ml-7 space-y-0.5">
                      <li>
                        <Link
                          to="/profile"
                          onClick={closeMobile}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-[#EDE4CB] hover:text-[#37400B] transition-colors"
                        >
                          <i className="fas fa-user text-[#37400B] text-xs w-4 text-center" />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/my-orders"
                          onClick={closeMobile}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-[#EDE4CB] hover:text-[#37400B] transition-colors"
                        >
                          <i className="fas fa-box text-[#37400B] text-xs w-4 text-center" />
                          My Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/addresses"
                          onClick={closeMobile}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-[#EDE4CB] hover:text-[#37400B] transition-colors"
                        >
                          <i className="fas fa-map-pin text-[#37400B] text-xs w-4 text-center" />
                          Addresses
                        </Link>
                      </li>
                      {user?.user?.role === "admin" && (
                        <li>
                          <Link
                            to="/admin/dashboard"
                            onClick={closeMobile}
                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#37400B] font-semibold rounded-lg hover:bg-[#EDE4CB] transition-colors"
                          >
                            <i className="fas fa-crown text-xs w-4 text-center" />
                            Admin
                          </Link>
                        </li>
                      )}
                      <li>
                        <button
                          onClick={logoutHandler}
                          className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <i className="fas fa-sign-out-alt text-xs w-4 text-center" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            )}

            {/* Guest section */}
            {!user && (
              <>
                <li className="pt-2">
                  <div className="border-t border-gray-100" />
                </li>
                <li>
                  <Link
                    to="/login"
                    onClick={closeMobile}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-gray-50 hover:text-[#37400B] transition-colors"
                  >
                    <i className="fas fa-sign-in-alt text-[#37400B] text-xs w-4 text-center" />
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={closeMobile}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[#37400B] text-white font-medium hover:bg-[#2A3308] transition-colors mt-1"
                  >
                    <i className="fas fa-user-plus text-xs w-4 text-center" />
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
import { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBooks as fetchBooks } from "../redux/bookSlice";
import { getWishlist } from "../redux/wishlistSlice";
import { CATEGORY_STRUCTURE, CATEGORY_OPTIONS } from "../constants/categories";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import Loader from "../components/Loader";

// ─── Constants ────────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "title_asc", label: "Title: A–Z" },
  { value: "title_desc", label: "Title: Z–A" },
  { value: "rating", label: "Top Rated" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

const RATINGS = [4, 3, 2, 1];

const PRICE_RANGES = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 – ₹1000", min: 500, max: 1000 },
  { label: "₹1000 – ₹2000", min: 1000, max: 2000 },
  { label: "Above ₹2000", min: 2000, max: Infinity },
];

const DEFAULT_FILTERS = {
  category: "",
  subcategory: "",
  priceMin: 0,
  priceMax: Infinity,
  minRating: 0,
  inStockOnly: false,
};

const URL_FILTER_KEYS = ["category", "subcategory", "priceMin", "priceMax"];

// ─── Main Component ───────────────────────────────────────────
function CollectionPage() {
  const dispatch = useDispatch();
  const { type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const discountParam = searchParams.get("discount");
  const minDiscount = discountParam ? Number(discountParam) : 0;
  const priceMinParam = searchParams.get("priceMin");
  const priceMaxParam = searchParams.get("priceMax");
  const categoryParam = searchParams.get("category") || "";
  const subcategoryParam = searchParams.get("subcategory") || "";

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(getWishlist());
  }, [dispatch]);

  const { books, loading, error } = useSelector((state) => state.books);

  const [localFilters, setLocalFilters] = useState({
    minRating: DEFAULT_FILTERS.minRating,
    inStockOnly: DEFAULT_FILTERS.inStockOnly,
  });
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");

  const filters = useMemo(() => ({
    category: categoryParam,
    subcategory: subcategoryParam,
    priceMin: priceMinParam ? Number(priceMinParam) : DEFAULT_FILTERS.priceMin,
    priceMax: priceMaxParam ? Number(priceMaxParam) : DEFAULT_FILTERS.priceMax,
    minRating: localFilters.minRating,
    inStockOnly: localFilters.inStockOnly,
  }), [categoryParam, subcategoryParam, priceMinParam, priceMaxParam, localFilters]);

  const filtered = useMemo(() => {
    let result = [...(books || [])];

    // type-based filtering
    switch (type) {
      case "bestseller":
        result = result.filter(book => book.tags?.includes("Bestseller"));
        break;
      case "trending":
        result = result.filter(book => book.tags?.includes("Trending"));
        break;
      case "popular":
        result = result.filter(book => book.tags?.includes("Popular"));
        break;
      case "new-arrival":
        result = result.filter(book => book.tags?.includes("New Arrival"));
        break;
      case "limited-edition":
        result = result.filter(book => book.tags?.includes("Limited Edition"));
        break;
      case "featured":
        result = result.filter(book => book.featured);
        break;
      case "top-rated":
        result = result.sort((a, b) => {
          if (b.rating === a.rating) return b.numReviews - a.numReviews;
          return b.rating - a.rating;
        });
        break;
      default:
        break;
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(b => b.title?.toLowerCase().includes(q) || b.author?.toLowerCase().includes(q));
    }

    if (filters.category) {
      result = result.filter(b => b.category === filters.category);
    }
    if (filters.subcategory) {
      result = result.filter(b => b.subcategory === filters.subcategory);
    }

    result = result.filter(b => {
      const price = b.discountedPrice ?? b.price;
      return price >= filters.priceMin && price <= filters.priceMax;
    });

    if (filters.minRating > 0) {
      result = result.filter(b => b.rating >= filters.minRating);
    }

    if (filters.inStockOnly) {
      result = result.filter(b => b.inStock);
    }

    if (sort !== "default") {
      switch (sort) {
        case "title_asc":
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "title_desc":
          result.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "rating":
          result.sort((a, b) => b.rating - a.rating);
          break;
        case "price_asc":
          result.sort((a, b) => (a.discountedPrice ?? a.price) - (b.discountedPrice ?? b.price));
          break;
        case "price_desc":
          result.sort((a, b) => (b.discountedPrice ?? b.price) - (a.discountedPrice ?? a.price));
          break;
        case "newest":
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        default:
          break;
      }
    }

    if (minDiscount > 0) {
      result = [...result].sort((a, b) => {
        const aMatch = (a.discount || 0) >= minDiscount ? 1 : 0;
        const bMatch = (b.discount || 0) >= minDiscount ? 1 : 0;
        return bMatch - aMatch;
      });
    }

    return result;
  }, [books, filters, sort, search, type, minDiscount]);

  const handleFilter = (key, value) => {
    if (URL_FILTER_KEYS.includes(key)) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (key === "category") {
          if (value) next.set("category", value); else next.delete("category");
          next.delete("subcategory");
        } else if (key === "subcategory") {
          if (value) next.set("subcategory", value); else next.delete("subcategory");
        } else if (key === "priceMin") {
          if (value && value !== DEFAULT_FILTERS.priceMin) next.set("priceMin", value);
          else next.delete("priceMin");
        } else if (key === "priceMax") {
          if (value && value !== DEFAULT_FILTERS.priceMax) next.set("priceMax", value);
          else next.delete("priceMax");
        }
        return next;
      }, { replace: true });
      return;
    }
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setLocalFilters({
      minRating: DEFAULT_FILTERS.minRating,
      inStockOnly: DEFAULT_FILTERS.inStockOnly,
    });
    setSort("default");
    setSearch("");
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("category");
      next.delete("subcategory");
      next.delete("priceMin");
      next.delete("priceMax");
      return next;
    }, { replace: true });
  };

  const pageHeading = minDiscount > 0
    ? `${minDiscount}% OFF Books`
    : priceMaxParam
    ? `Books Under ₹${priceMaxParam}`
    : priceMinParam
    ? `Books Above ₹${priceMinParam}`
    : subcategoryParam
    ? subcategoryParam
    : categoryParam
    ? categoryParam
    : type
    ? type.replace(/-/g, " ")
    : "All Products";

  if (loading) return <Loader />;
  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#EDE4CB]">
          <p className="text-red-500">Failed to load products: {error}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#EDE4CB] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ─── Heading ─── */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#37400B] capitalize">
              {pageHeading}
            </h1>
            <p className="text-[#BDB47B] text-sm mt-1">
              {filtered.length} item{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* ─── Top Filter Bar ─── */}
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-[#EDE4CB]">
            {/* Row 1: Search + Sort */}
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BDB47B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title or author…"
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#37400B] text-gray-700 placeholder:text-gray-400"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#37400B] text-gray-700"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Row 2: Filters (scrollable horizontal) */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Category */}
              <div className="flex items-center gap-1.5">
                <label className="text-[10px] font-medium text-[#BDB47B] uppercase tracking-wider">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilter("category", e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#37400B]"
                >
                  <option value="">All</option>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Subcategory */}
              {filters.category && (
                <div className="flex items-center gap-1.5">
                  <label className="text-[10px] font-medium text-[#BDB47B] uppercase tracking-wider">Sub</label>
                  <select
                    value={filters.subcategory}
                    onChange={(e) => handleFilter("subcategory", e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#37400B]"
                  >
                    <option value="">All</option>
                    {(CATEGORY_STRUCTURE[filters.category] || []).map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-1.5">
                <label className="text-[10px] font-medium text-[#BDB47B] uppercase tracking-wider">Price</label>
                <select
                  value={PRICE_RANGES.find(
                    (r) => r.min === filters.priceMin && r.max === filters.priceMax
                  )?.label || "All"}
                  onChange={(e) => {
                    const selected = PRICE_RANGES.find((r) => r.label === e.target.value);
                    if (selected) {
                      handleFilter("priceMin", selected.min);
                      handleFilter("priceMax", selected.max);
                    }
                  }}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#37400B]"
                >
                  {PRICE_RANGES.map((range) => (
                    <option key={range.label} value={range.label}>{range.label}</option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <label className="text-[10px] font-medium text-[#BDB47B] uppercase tracking-wider">Rating</label>
                <select
                  value={filters.minRating}
                  onChange={(e) => handleFilter("minRating", Number(e.target.value))}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#37400B]"
                >
                  <option value={0}>All</option>
                  {RATINGS.map((r) => (
                    <option key={r} value={r}>{r}★ & up</option>
                  ))}
                </select>
              </div>

              {/* In Stock */}
              <div className="flex items-center gap-1.5">
                <label className="flex items-center gap-1 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => handleFilter("inStockOnly", e.target.checked)}
                    className="accent-[#37400B] w-4 h-4"
                  />
                  <span className="text-[10px] font-medium text-[#BDB47B] uppercase tracking-wider">In Stock</span>
                </label>
              </div>

              {/* Reset */}
              <button
                onClick={handleReset}
                className="ml-auto text-xs font-medium text-[#37400B] hover:text-[#2A3308] border border-[#BDB47B]/30 hover:border-[#37400B] px-4 py-1.5 rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* ─── Product Grid ─── */}
          <div>
            {filtered.length === 0 ? (
              <div className="text-center py-24 bg-white/50 rounded-3xl border border-[#BDB47B]/20">
                <p className="text-5xl mb-4">📚</p>
                <p className="text-gray-500 font-medium">No products found</p>
                <button
                  onClick={handleReset}
                  className="mt-4 text-[#37400B] text-sm font-semibold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filtered.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CollectionPage;








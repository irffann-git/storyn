import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, createBook, updateBook, deleteBook } from "../../redux/bookSlice";
import Loader from "../../components/Loader";
import ConfirmModal from "../../components/ConfirmModal";
import { CATEGORY_STRUCTURE, CATEGORY_OPTIONS } from "../../constants/categories";
import API from "../../api/axios";

import {
  FaPlus,
  FaTimes,
  FaEdit,
  FaTrashAlt,
  FaImage,
  FaTag,
  FaStar,
  FaShoppingBag,
  FaExclamationTriangle,
} from "react-icons/fa";

const TAG_OPTIONS = [
  "Bestseller", "Trending", "New Arrival", "Popular", "Limited Edition",
];

const DISCOUNT_OPTIONS = [0, 5, 10, 15, 20, 25, 30, 40, 45, 50, 90];

const EMPTY_FORM = {
  title: "",
  author: "",
  description: "",
  category: CATEGORY_OPTIONS[0],
  subcategory: CATEGORY_STRUCTURE[CATEGORY_OPTIONS[0]][0],
  price: "",
  stock: "",
  image: "",
  featured: false,
  tags: [],
  discount: 0,
};

function Books() {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.books);

  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setEditingBook(null);
    setImagePreview(null);
  };

  const handleDelete = (id) => {
    setModal({
      message: "Are you sure you want to delete this book?",
      onConfirm: () => {
        dispatch(deleteBook(id));
        setModal(null);
      },
    });
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    const category = book.category || CATEGORY_OPTIONS[0];
    const subcategory =
      book.subcategory || CATEGORY_STRUCTURE[category]?.[0] || "";

    setFormData({
      title: book.title,
      author: book.author,
      description: book.description,
      category,
      subcategory,
      price: book.price,
      stock: book.stock,
      image: book.image,
      featured: book.featured,
      tags: book.tags || [],
      discount: book.discount || 0,
    });
    setImagePreview(book.image);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        category: value,
        subcategory: CATEGORY_STRUCTURE[value]?.[0] || "",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagChange = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    const imageData = new FormData();
    imageData.append("image", file);

    try {
      const { data } = await API.post("/upload", imageData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData((prev) => ({ ...prev, image: data.image }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (editingBook) {
      await dispatch(updateBook({ id: editingBook._id, bookData: formData }));
    } else {
      await dispatch(createBook(formData));
    }
    dispatch(getBooks());
    resetForm();
    setShowForm(false);
    setIsSubmitting(false);
  };

  const filteredBooks = books?.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const lowStockBooks = books?.filter((book) => book.stock < 5).length || 0;

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#EDE4CB] p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* ─── Header ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#37400B] tracking-tight">
              Books Management
            </h1>
            <p className="text-[#BDB47B] text-xs sm:text-sm mt-0.5">Manage your store's inventory</p>
          </div>
          <button
            onClick={() => {
              if (showForm) resetForm();
              setShowForm(!showForm);
            }}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg w-full sm:w-auto ${
              showForm
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-[#37400B] text-white hover:bg-[#2A3308] hover:-translate-y-0.5"
            }`}
          >
            {showForm ? <FaTimes /> : <FaPlus />}
            {showForm ? "Cancel" : "Add New Book"}
          </button>
        </div>

        {/* ─── Stats ─── */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-3.5 sm:p-5 border border-[#EDE4CB] flex items-center gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B] shrink-0">
              <FaShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-sm text-[#6B5D4F] font-medium truncate">Total Books</p>
              <p className="text-lg sm:text-2xl font-bold text-[#37400B]">{books?.length || 0}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-3.5 sm:p-5 border border-[#EDE4CB] flex items-center gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B] shrink-0">
              <FaExclamationTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-sm text-[#6B5D4F] font-medium truncate">Low Stock (&lt;5)</p>
              <p className="text-lg sm:text-2xl font-bold text-red-600">{lowStockBooks}</p>
            </div>
          </div>
        </div>

        {/* ─── Search ─── */}
        <div className="mb-5 sm:mb-6">
          <input
            type="text"
            placeholder="Search by title…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#EDE4CB] rounded-xl px-4 py-3 text-sm text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-[#37400B] placeholder:text-[#BDB47B] transition"
          />
        </div>

        {/* ─── Form ─── */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8 mb-6 border border-[#EDE4CB]"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#37400B] mb-5 sm:mb-6 flex items-center gap-2">
              <span className="w-1 h-6 sm:h-8 bg-[#37400B] rounded-full" />
              {editingBook ? "Edit Book" : "Add New Book"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <input
                type="text"
                name="title"
                placeholder="Title *"
                value={formData.title}
                onChange={handleChange}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#37400B] transition"
                required
              />
              <input
                type="text"
                name="author"
                placeholder="Author / Artist *"
                value={formData.author}
                onChange={handleChange}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#37400B] transition"
                required
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#37400B] transition"
                required
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#37400B] transition"
                required
              >
                {(CATEGORY_STRUCTURE[formData.category] || []).map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>

              <input
                type="number"
                name="price"
                placeholder="Price *"
                value={formData.price}
                onChange={handleChange}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#37400B] transition"
                required
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock *"
                value={formData.stock}
                onChange={handleChange}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#37400B] transition"
                required
              />

              <div>
                <label className="block text-xs font-medium text-[#6B5D4F] mb-1.5">Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm file:mr-3 file:py-2 file:px-3 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-[#EDE4CB] file:text-[#37400B] hover:file:bg-[#BDB47B]/30 transition"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-28 sm:w-28 sm:h-36 object-cover rounded-xl border border-[#EDE4CB]"
                    />
                  </div>
                )}
              </div>

              <select
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#37400B] transition"
              >
                {DISCOUNT_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {d === 0 ? "No Discount" : `${d}% OFF`}
                  </option>
                ))}
              </select>

              {formData.price && formData.discount > 0 && (
                <div className="border border-[#EDE4CB] rounded-xl p-3 bg-[#EDE4CB]/30 flex items-center gap-2 col-span-1 sm:col-span-2">
                  <span className="text-xs sm:text-sm text-[#6B5D4F]">Discounted Price:</span>
                  <span className="font-bold text-[#37400B] text-sm sm:text-base">
                    ₹{Math.round(formData.price - (formData.price * formData.discount) / 100)}
                  </span>
                </div>
              )}
            </div>

            <textarea
              name="description"
              placeholder="Description *"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#37400B] transition mt-3.5 sm:mt-4"
              required
            />

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4">
              <label className="flex items-center gap-2 text-sm text-[#37400B] cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="accent-[#37400B] w-4 h-4"
                />
                <span>Featured Product</span>
              </label>
            </div>

            <div className="mt-5 sm:mt-6">
              <h3 className="font-semibold text-sm text-[#6B5D4F] mb-3 flex items-center gap-2">
                <FaTag className="text-[#BDB47B]" />
                Product Tags
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {TAG_OPTIONS.map((tag) => (
                  <label
                    key={tag}
                    className={`flex items-center gap-2 border rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm cursor-pointer transition-all ${
                      formData.tags.includes(tag)
                        ? "border-[#37400B] bg-[#EDE4CB] text-[#37400B]"
                        : "border-gray-200 hover:border-[#BDB47B]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.tags.includes(tag)}
                      onChange={() => handleTagChange(tag)}
                      className="accent-[#37400B] w-3.5 h-3.5"
                    />
                    <span>{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full md:w-auto bg-[#37400B] hover:bg-[#2A3308] disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Saving...
                </>
              ) : (
                editingBook ? "Update Book" : "Save Book"
              )}
            </button>
          </form>
        )}

        {/* ─── MOBILE: Card List (below md) ─── */}
        <div className="md:hidden space-y-3">
          {filteredBooks?.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-2xl shadow-sm border border-[#EDE4CB] p-3.5 flex gap-3"
              >
                {book.image ? (
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-16 h-22 object-cover rounded-lg shrink-0"
                  />
                ) : (
                  <div className="w-16 h-22 bg-gray-100 rounded-lg flex items-center justify-center text-[#BDB47B] shrink-0">
                    <FaImage className="w-5 h-5" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-[#37400B] text-sm truncate">{book.title}</p>
                      <p className="text-[#6B5D4F] text-xs truncate">{book.author}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleEdit(book)}
                        className="p-1.5 bg-[#EDE4CB] text-[#37400B] rounded-lg"
                        aria-label="Edit"
                      >
                        <FaEdit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="p-1.5 bg-red-50 text-red-500 rounded-lg"
                        aria-label="Delete"
                      >
                        <FaTrashAlt className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="font-bold text-[#37400B] text-sm">₹{book.price}</span>
                    {book.discount > 0 && (
                      <>
                        <span className="text-[#BDB47B] text-xs line-through">₹{book.discountedPrice}</span>
                        <span className="bg-[#37400B]/10 text-[#37400B] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {book.discount}% OFF
                        </span>
                      </>
                    )}
                    <span className={`text-xs font-semibold ml-auto ${book.stock < 5 ? "text-red-600" : "text-green-600"}`}>
                      Stock: {book.stock}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="bg-[#EDE4CB] text-[#37400B] text-[10px] px-2 py-0.5 rounded-full">
                      {book.category}
                    </span>
                    {book.featured && (
                      <span className="inline-flex items-center gap-1 bg-[#37400B] text-white text-[10px] px-2 py-0.5 rounded-full">
                        <FaStar className="w-2.5 h-2.5" />
                        Featured
                      </span>
                    )}
                    {book.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#EDE4CB] text-[#37400B] text-[10px] px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-[#EDE4CB] p-8 text-center text-[#6B5D4F]/60 text-sm">
              No books found
            </div>
          )}
        </div>

        {/* ─── DESKTOP: Table (md and up) ─── */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-[#EDE4CB] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#EDE4CB] text-[#37400B]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Image</th>
                  <th className="px-4 py-3 text-left font-semibold">Title</th>
                  <th className="px-4 py-3 text-left font-semibold">Author</th>
                  <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Category</th>
                  <th className="px-4 py-3 text-left font-semibold hidden xl:table-cell">Subcategory</th>
                  <th className="px-4 py-3 text-left font-semibold">Price</th>
                  <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Discount</th>
                  <th className="px-4 py-3 text-left font-semibold">Stock</th>
                  <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Featured</th>
                  <th className="px-4 py-3 text-left font-semibold hidden xl:table-cell">Tags</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks?.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr key={book._id} className="border-b border-[#EDE4CB] hover:bg-[#EDE4CB]/20 transition">
                      <td className="px-4 py-3">
                        {book.image ? (
                          <img
                            src={book.image}
                            alt={book.title}
                            className="w-12 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-12 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-[#BDB47B]">
                            <FaImage className="w-5 h-5" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium text-[#37400B] max-w-[160px] truncate">
                        {book.title}
                      </td>
                      <td className="px-4 py-3 text-[#6B5D4F]">{book.author}</td>
                      <td className="px-4 py-3 text-[#6B5D4F] hidden lg:table-cell">{book.category}</td>
                      <td className="px-4 py-3 text-[#6B5D4F] hidden xl:table-cell">{book.subcategory || "—"}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-semibold text-[#37400B]">₹{book.price}</p>
                          {book.discount > 0 && (
                            <p className="text-[#BDB47B] text-xs">₹{book.discountedPrice}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {book.discount > 0 ? (
                          <span className="bg-[#37400B]/10 text-[#37400B] text-xs font-bold px-2 py-1 rounded-full">
                            {book.discount}% OFF
                          </span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className={`px-4 py-3 font-semibold ${book.stock < 5 ? "text-red-600" : "text-green-600"}`}>
                        {book.stock}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {book.featured ? (
                          <span className="inline-flex items-center gap-1 bg-[#37400B] text-white text-xs px-2 py-1 rounded-full">
                            <FaStar className="w-3 h-3" />
                            Featured
                          </span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 hidden xl:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {book.tags?.length > 0 ? (
                            book.tags.map((tag) => (
                              <span
                                key={tag}
                                className="bg-[#EDE4CB] text-[#37400B] text-[10px] px-2 py-0.5 rounded-full"
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(book)}
                            className="p-2 bg-[#EDE4CB] text-[#37400B] rounded-lg hover:bg-[#BDB47B]/30 transition"
                            aria-label="Edit"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(book._id)}
                            className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition"
                            aria-label="Delete"
                          >
                            <FaTrashAlt className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center p-8 text-[#6B5D4F]/60">
                      No books found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {modal && (
          <ConfirmModal
            message={modal.message}
            onConfirm={modal.onConfirm}
            onCancel={() => setModal(null)}
          />
        )}
      </div>
    </div>
  );
}

export default Books;
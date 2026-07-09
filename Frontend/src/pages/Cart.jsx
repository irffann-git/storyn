import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaTrashAlt,
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaBookOpen,
  FaArrowRight,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import ConfirmModal from "../components/ConfirmModal";

import {
  getCart,
  removeCartItem,
  updateCartItem,
  clearCart,
} from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const removeHandler = (bookId) => {
    dispatch(removeCartItem(bookId));
  };

  const quantityHandler = (bookId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartItem({ bookId, quantity }));
  };

  const clearCartHandler = () => {
    setModal({
      message: "Are you sure you want to clear your cart?",
      onConfirm: () => {
        dispatch(clearCart());
        setModal(null);
      },
    });
  };

  const items = cart?.items || [];
  const totalPrice = items.reduce(
    (acc, item) => acc + (item.book?.price || 0) * item.quantity,
    0
  );
  const subtotal = totalPrice;
  const shipping = totalPrice > 500 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + shipping + tax;

  if (loading && !cart) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#EDE4CB] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#37400B] tracking-tight">
                Your Cart
              </h1>
              <p className="text-gray-500 mt-1">
                {items.length} {items.length === 1 ? "item" : "items"} in your bag
              </p>
            </div>
            <Link
              to="/books"
              className="hidden sm:flex items-center gap-2 text-[#37400B] hover:text-[#2A3308] font-medium transition-colors"
            >
              <FaBookOpen />
              Continue Shopping
              <FaArrowRight className="text-sm" />
            </Link>
          </div>

          {items.length === 0 ? (
            // ─── Empty State ─────────────────────────────────
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-2xl mx-auto border border-[#BDB47B]/20">
              <div className="w-24 h-24 bg-[#EDE4CB] rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShoppingBag className="text-5xl text-[#BDB47B]" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Your cart feels lonely
              </h2>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                Looks like you haven't added any books yet. Discover our collection and fill it with stories.
              </p>
              <Link
                to="/books"
                className="inline-flex items-center gap-2 bg-[#37400B] hover:bg-[#2A3308] text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <FaBookOpen />
                Browse Books
              </Link>
            </div>
          ) : (
            // ─── Cart with Items ─────────────────────────────
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Items List */}
              <div className="lg:col-span-2 space-y-5">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col sm:flex-row gap-5 border border-transparent hover:border-[#BDB47B]/30"
                  >
                    {/* Book Cover */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.book?.image}
                        alt={item.book?.title}
                        className="w-28 h-36 object-cover rounded-xl shadow-sm"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link
                          to={`/books/${item.book?._id}`}
                          className="text-lg font-bold text-gray-800 hover:text-[#37400B] transition-colors line-clamp-1"
                        >
                          {item.book?.title}
                        </Link>
                        <p className="text-sm text-gray-500">{item.book?.author}</p>
                        <p className="text-[#37400B] text-xl font-bold mt-2">
                          ₹{item.book?.price}
                        </p>
                      </div>

                      {/* Quantity + Remove */}
                      <div className="flex items-center justify-between mt-4 sm:mt-0">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              quantityHandler(item.book._id, item.quantity - 1)
                            }
                            disabled={item.quantity === 1}
                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#EDE4CB] hover:border-[#BDB47B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <FaMinus className="text-xs" />
                          </button>
                          <span className="font-bold text-lg w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              quantityHandler(item.book._id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#EDE4CB] hover:border-[#BDB47B] transition-colors"
                          >
                            <FaPlus className="text-xs" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeHandler(item.book._id)}
                          className="text-red-400 hover:text-red-600 transition-colors flex items-center gap-1 text-sm"
                        >
                          <FaTrashAlt />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Total per item */}
                    <div className="sm:text-right flex sm:block justify-between items-center sm:mt-0">
                      <span className="sm:hidden text-gray-500">Total:</span>
                      <span className="text-xl font-bold text-[#37400B]">
                        ₹{(item.book?.price || 0) * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border border-[#BDB47B]/20">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaShoppingBag className="text-[#37400B]" />
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({items.length} items)</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Estimated Tax</span>
                      <span>₹{tax}</span>
                    </div>
                    <hr className="my-3 border-[#EDE4CB]" />
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Total</span>
                      <span className="text-[#37400B]">₹{grandTotal}</span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
                        You've qualified for free shipping!
                      </p>
                    )}
                  </div>

                  <Link
                    to="/checkout"
                    className="block w-full text-center bg-[#37400B] hover:bg-[#2A3308] text-white py-4 rounded-xl font-semibold mt-6 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Proceed to Checkout
                  </Link>

                  <button
                    onClick={clearCartHandler}
                    className="w-full mt-3 text-red-500 border border-red-300 py-3 rounded-xl hover:bg-red-50 transition-colors font-medium"
                  >
                    Clear Cart
                  </button>

                  <Link
                    to="/books"
                    className="block text-center text-sm text-gray-400 hover:text-[#37400B] transition-colors mt-4"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {modal && (
        <ConfirmModal
          message={modal.message}
          onConfirm={modal.onConfirm}
          onCancel={() => setModal(null)}
        />
      )}
    </>
  );
}

export default Cart;
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FaMapMarkerAlt, FaShoppingBag, FaArrowLeft, FaPlus, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getCart } from "../redux/cartSlice";
import { getAddresses } from "../redux/addressSlice";
import { createOrder } from "../redux/orderSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, loading: cartLoading } = useSelector((state) => state.cart);
  const { addresses, loading: addressLoading } = useSelector((state) => state.address);
  const { loading: orderLoading } = useSelector((state) => state.order);

  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    dispatch(getCart());
    dispatch(getAddresses());
  }, [dispatch]);

  const items = useMemo(() => cart?.items || [], [cart]);
  const subtotal = items.reduce(
    (acc, item) => acc + (item.book?.price || 0) * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + shipping + tax;

  const defaultAddress = addresses?.find((addr) => addr.isDefault);
  const activeAddressId = selectedAddress || defaultAddress?._id;

  useEffect(() => {
    if (!cartLoading && items.length === 0) {
      navigate("/cart");
    }
  }, [items, cartLoading, navigate]);

  const placeOrderHandler = async () => {
    if (!activeAddressId) {
      toast.error("Please select a shipping address.");
      return;
    }
    const result = await dispatch(createOrder(activeAddressId));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Order placed successfully!");
      navigate("/my-orders");
    } else {
      toast.error(result.payload || "Failed to place order");
    }
  };

  if (cartLoading || addressLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#EDE4CB] py-6 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ─── Header ─── */}
          <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#37400B] tracking-tight">
              Checkout
            </h1>
            <Link
              to="/cart"
              className="inline-flex items-center gap-1.5 text-[#37400B] hover:text-[#2A3308] font-medium transition-colors text-sm shrink-0"
            >
              <FaArrowLeft className="w-3 h-3" />
              <span className="hidden sm:inline">Back to Cart</span>
              <span className="sm:hidden">Cart</span>
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center max-w-2xl mx-auto border border-[#BDB47B]/20">
              <FaShoppingBag className="text-5xl text-[#BDB47B] mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-6 text-sm sm:text-base">
                Add some books and come back to checkout.
              </p>
              <Link
                to="/books"
                className="inline-block bg-[#37400B] hover:bg-[#2A3308] text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                Browse Books
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-5 lg:gap-8 items-start">
              {/* ─── Left Column: Address + Items ─── */}
              <div className="lg:col-span-2 space-y-5 lg:space-y-6 min-w-0">
                {/* Shipping Address */}
                <section className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-[#BDB47B]/10">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#37400B] shrink-0" />
                    Shipping Address
                  </h2>

                  {addresses?.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4 text-sm">No saved addresses yet.</p>
                      <Link
                        to="/addresses/new"
                        className="inline-flex items-center gap-2 bg-[#37400B] hover:bg-[#2A3308] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition"
                      >
                        <FaPlus className="text-xs" />
                        Add New Address
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {addresses.map((address) => {
                        const isSelected = activeAddressId === address._id;
                        return (
                          <label
                            key={address._id}
                            className={`relative block border-2 rounded-xl p-4 pr-10 cursor-pointer transition-all ${
                              isSelected
                                ? "border-[#37400B] bg-[#EDE4CB]/30"
                                : "border-gray-200 hover:border-[#BDB47B]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="address"
                              checked={isSelected}
                              onChange={() => setSelectedAddress(address._id)}
                              className="sr-only"
                            />

                            {isSelected && (
                              <FaCheckCircle className="absolute top-4 right-4 text-[#37400B] w-4 h-4" />
                            )}

                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <p className="font-semibold text-gray-800 text-sm">
                                {address.fullName}
                              </p>
                              {address.isDefault && (
                                <span className="inline-block bg-[#EDE4CB] text-[#37400B] text-[10px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 leading-snug">
                              {address.addressLine1}
                            </p>
                            <p className="text-sm text-gray-600 leading-snug">
                              {address.city}, {address.state} – {address.postalCode}
                            </p>
                            <p className="text-sm text-gray-600 leading-snug">
                              {address.country}
                            </p>
                          </label>
                        );
                      })}
                      <Link
                        to="/addresses/new"
                        className="inline-flex items-center gap-1.5 text-sm text-[#37400B] hover:text-[#2A3308] font-medium transition pt-1"
                      >
                        <FaPlus className="text-xs" />
                        Add New Address
                      </Link>
                    </div>
                  )}
                </section>

                {/* Order Items Preview */}
                <section className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-[#BDB47B]/10">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
                    Items in your order ({items.length})
                  </h3>
                  <div className="divide-y divide-gray-100">
                    {items.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-3 sm:gap-4 py-3 first:pt-0 last:pb-0"
                      >
                        <img
                          src={item.book?.image}
                          alt={item.book?.title}
                          className="w-12 h-16 sm:w-14 sm:h-20 object-cover rounded-lg bg-gray-50 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate">
                            {item.book?.title}
                          </p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-[#37400B] text-sm shrink-0">
                          ₹{(item.book?.price || 0) * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* ─── Right Column: Order Summary ─── */}
              <div className="lg:col-span-1 min-w-0">
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-24 border border-[#BDB47B]/20">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-5 flex items-center gap-2">
                    <FaShoppingBag className="text-[#37400B]" />
                    Order Summary
                  </h2>

                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({items.length} items)</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Estimated Tax</span>
                      <span>₹{tax}</span>
                    </div>
                    <hr className="my-3 border-[#EDE4CB]" />
                    <div className="flex justify-between items-baseline">
                      <span className="text-base font-bold text-gray-800">Total</span>
                      <span className="text-xl font-extrabold text-[#37400B]">
                        ₹{grandTotal}
                      </span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-xs text-green-600 flex items-center gap-1.5 mt-1">
                        <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full shrink-0" />
                        Free shipping applied
                      </p>
                    )}
                  </div>

                  <button
                    onClick={placeOrderHandler}
                    disabled={orderLoading}
                    className="w-full bg-[#37400B] hover:bg-[#2A3308] text-white py-3.5 rounded-xl font-semibold mt-6 transition-all shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-md text-sm"
                  >
                    {orderLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Placing Order...
                      </span>
                    ) : (
                      "Place Order"
                    )}
                  </button>

                  <Link
                    to="/cart"
                    className="block text-center text-xs text-gray-400 hover:text-[#37400B] transition-colors mt-4"
                  >
                    ← Back to Cart
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Checkout;
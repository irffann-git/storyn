import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBox,
  FaMapMarkerAlt,
  FaBookOpen,
  FaRupeeSign,
  FaCalendarAlt,
  FaArrowLeft,
  FaCreditCard,
  FaCheckCircle,
  FaTimesCircle,
  FaImage,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import {
  getOrderById,
  markOrderPaid,
} from "../redux/orderSlice";

function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  const handlePayment = () => {
    dispatch(markOrderPaid(id));
  };

  const handleImageError = (itemId) => {
    setImageErrors((prev) => ({ ...prev, [itemId]: true }));
  };

  if (loading && !order) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#EDE4CB] flex items-center justify-center px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full text-center border border-red-200">
            <FaTimesCircle className="text-5xl text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Order</h2>
            <p className="text-gray-600 text-sm">{error}</p>
            <Link
              to="/my-orders"
              className="inline-block mt-6 bg-[#37400B] hover:bg-[#2A3308] text-white px-6 py-2.5 rounded-xl transition text-sm font-medium"
            >
              Back to Orders
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!order) return null;

  const statusColors = {
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
  };
  const orderStatusClass = statusColors[order.orderStatus] || "bg-gray-100 text-gray-700";

  const paymentStatusClass =
    order.paymentStatus === "Paid"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  // Helper to get the best available image URL
  const getItemImage = (item) => {
    return (
      item.coverImage ||
      item.image ||
      item.book?.image ||
      item.book?.coverImage ||
      null
    );
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#EDE4CB] py-6 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ─── Header ─── */}
          <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                to="/my-orders"
                className="text-[#37400B] hover:text-[#2A3308] transition shrink-0"
                aria-label="Back to orders"
              >
                <FaArrowLeft className="text-lg sm:text-xl" />
              </Link>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#37400B] tracking-tight truncate">
                Order Details
              </h1>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 font-mono shrink-0">
              #{order._id.slice(-8)}
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-5 lg:gap-8 items-start">
            {/* ─── Left Column ─── */}
            <div className="lg:col-span-2 space-y-5 lg:space-y-6 min-w-0">
              {/* Order Information */}
              <section className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-[#BDB47B]/10">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaBox className="text-[#37400B] shrink-0" />
                  Order Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 text-sm">
                  <div className="min-w-0">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Order ID</p>
                    <p className="font-mono font-medium text-gray-700 truncate">{order._id}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Date</p>
                    <p className="font-medium text-gray-700 flex items-center gap-1.5">
                      <FaCalendarAlt className="text-[#BDB47B] text-xs shrink-0" />
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${orderStatusClass}`}>
                      {order.orderStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Payment</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${paymentStatusClass}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div className="sm:col-span-2 min-w-0">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Transaction ID</p>
                    <p className="font-mono text-sm text-gray-700 truncate">
                      {order.transactionId || "N/A"}
                    </p>
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-[#BDB47B]/10">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#37400B] shrink-0" />
                  Shipping Address
                </h2>
                <div className="text-sm text-gray-700 space-y-1 leading-relaxed">
                  <p className="font-semibold">{order.shippingAddress?.fullName}</p>
                  <p>{order.shippingAddress?.phone}</p>
                  <p>{order.shippingAddress?.addressLine1}</p>
                  {order.shippingAddress?.addressLine2 && (
                    <p>{order.shippingAddress.addressLine2}</p>
                  )}
                  <p>
                    {order.shippingAddress?.city}, {order.shippingAddress?.state}
                  </p>
                  <p>{order.shippingAddress?.postalCode}</p>
                  <p>{order.shippingAddress?.country}</p>
                </div>
              </section>

              {/* Ordered Books */}
              <section className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-[#BDB47B]/10">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaBookOpen className="text-[#37400B] shrink-0" />
                  Ordered Books ({order.orderItems?.length || 0})
                </h2>
                <div className="divide-y divide-[#EDE4CB]">
                  {order.orderItems?.map((item) => {
                    const imageUrl = getItemImage(item);
                    const hasError = imageErrors[item._id];
                    return (
                      <div key={item._id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                        {/* ─── Book Image ─── */}
                        <div className="shrink-0">
                          {imageUrl && !hasError ? (
                            <img
                              src={imageUrl}
                              alt={item.title}
                              className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-lg shadow-sm bg-gray-50"
                              onError={() => handleImageError(item._id)}
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-20 h-28 sm:w-24 sm:h-32 rounded-lg bg-gray-100 flex flex-col items-center justify-center text-gray-400 border border-dashed border-gray-300">
                              <FaImage className="text-2xl sm:text-3xl" />
                              <span className="text-[10px] mt-1 text-gray-400">No image</span>
                            </div>
                          )}
                        </div>

                        {/* ─── Book Details ─── */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 text-sm sm:text-base truncate">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                          <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                          <p className="font-semibold text-[#37400B] text-sm sm:text-base mt-1">
                            Total: ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* ─── Right Column ─── */}
            <div className="lg:col-span-1 min-w-0">
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-24 border border-[#BDB47B]/20">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-5 flex items-center gap-2">
                  <FaRupeeSign className="text-[#37400B] shrink-0" />
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-baseline text-gray-600">
                    <span>Total Amount</span>
                    <span className="font-extrabold text-lg text-[#37400B]">
                      ₹{order.totalPrice}
                    </span>
                  </div>
                  <hr className="border-[#EDE4CB]" />
                  <div className="flex justify-between text-gray-600">
                    <span>Status</span>
                    <span className="font-medium text-gray-800">{order.orderStatus}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Payment</span>
                    <span className="font-medium text-gray-800">{order.paymentStatus}</span>
                  </div>
                </div>

                {order.paymentStatus !== "Paid" && (
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full mt-6 bg-[#37400B] hover:bg-[#2A3308] text-white py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-md text-sm flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaCreditCard />
                        Mark as Paid
                      </>
                    )}
                  </button>
                )}

                {order.paymentStatus === "Paid" && (
                  <div className="mt-6 p-4 bg-green-50 rounded-xl flex items-center gap-2 text-green-700 text-sm font-medium">
                    <FaCheckCircle className="text-lg shrink-0" />
                    Payment confirmed
                  </div>
                )}

                <Link
                  to="/my-orders"
                  className="block text-center text-xs text-gray-400 hover:text-[#37400B] transition-colors mt-4"
                >
                  ← Back to Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default OrderDetails;
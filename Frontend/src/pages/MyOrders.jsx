import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaBox, FaCalendarAlt, FaRupeeSign, FaArrowRight } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getMyOrders } from "../redux/orderSlice";

function MyOrders() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#EDE4CB] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ─── Header ─── */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#37400B] tracking-tight flex items-center gap-3">
              <FaBox className="text-[#BDB47B]" />
              My Orders
            </h1>
            <Link
              to="/books"
              className="inline-flex items-center gap-2 text-[#37400B] hover:text-[#2A3308] font-medium transition-colors text-sm"
            >
              Browse Books
              <FaArrowRight />
            </Link>
          </div>

          {orders?.length === 0 ? (
            // ─── Empty State ───────────────────────────────────
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center max-w-2xl mx-auto border border-[#BDB47B]/20">
              <div className="w-20 h-20 bg-[#EDE4CB] rounded-full flex items-center justify-center mx-auto mb-5">
                <FaShoppingBag className="text-4xl text-[#BDB47B]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                No orders yet
              </h2>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                You haven't placed any orders. Start shopping and discover your next favourite book.
              </p>
              <Link
                to="/books"
                className="inline-flex items-center gap-2 bg-[#37400B] hover:bg-[#2A3308] text-white px-8 py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <FaShoppingBag />
                Start Shopping
              </Link>
            </div>
          ) : (
            // ─── Order List ────────────────────────────────────
            <div className="space-y-5 sm:space-y-6">
              {orders.map((order) => {
                const statusColors = {
                  Delivered: "bg-green-100 text-green-700",
                  Cancelled: "bg-red-100 text-red-700",
                  Pending: "bg-yellow-100 text-yellow-700",
                  Processing: "bg-blue-100 text-blue-700",
                  Shipped: "bg-purple-100 text-purple-700",
                };
                const statusClass = statusColors[order.orderStatus] || "bg-gray-100 text-gray-700";

                return (
                  <div
                    key={order._id}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6 border border-transparent hover:border-[#BDB47B]/30"
                  >
                    {/* ─── Order Header ─── */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#EDE4CB]">
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Order ID</p>
                          <p className="font-mono text-sm font-semibold text-gray-700">
                            #{order._id.slice(-8)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Date</p>
                          <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <FaCalendarAlt className="text-[#BDB47B] text-xs" />
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold ${statusClass}`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>

                    {/* ─── Order Details ─── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Payment Status</p>
                        <p className="text-sm font-medium text-gray-700">{order.paymentStatus}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Total Amount</p>
                        <p className="text-2xl font-bold text-[#37400B] flex items-center gap-1">
                          <FaRupeeSign className="text-lg" />
                          {order.totalPrice}
                        </p>
                      </div>
                    </div>

                    {/* ─── Action Button ─── */}
                    <div className="mt-5 pt-4 border-t border-[#EDE4CB]">
                      <Link
                        to={`/orders/${order._id}`}
                        className="inline-flex items-center gap-2 bg-[#37400B] hover:bg-[#2A3308] text-white px-6 py-2.5 rounded-xl font-medium text-sm transition shadow hover:shadow-md hover:-translate-y-0.5"
                      >
                        View Details
                        <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default MyOrders;
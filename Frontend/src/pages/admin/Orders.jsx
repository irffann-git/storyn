import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../redux/orderSlice";

import Loader from "../../components/Loader";

// ─── Icons ──────────────────────────────────────────────────────
import {
  FaShoppingBag,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaUser,
  FaCalendarAlt,  
  FaEdit,
} from "react-icons/fa";

function Orders() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);
  const [statusMap, setStatusMap] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    setStatusMap((prev) => ({ ...prev, [orderId]: status }));
  };

  const handleUpdate = async (id) => {
    await dispatch(updateOrderStatus({ id, status: statusMap[id] || "Pending" }));
    dispatch(getAllOrders());
  };

  const sortedOrders = [...(orders || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filteredOrders = sortedOrders.filter((order) =>
    order.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const getPaymentBadge = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getOrderBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-purple-100 text-purple-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return <Loader />;
  }

  const totalOrders = orders?.length || 0;
  const delivered = orders?.filter((o) => o.orderStatus === "Delivered").length || 0;
  const pending = orders?.filter((o) => o.orderStatus === "Pending").length || 0;

  return (
    <div className="min-h-screen bg-[#EDE4CB] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* ─── Header ─── */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#37400B] tracking-tight">
            Orders Management
          </h1>
          <p className="text-[#BDB47B] text-sm mt-1">Track and update customer orders</p>
        </div>

        {/* ─── Stats ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition flex items-center gap-4">
            <div className="w-12 h-12 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
              <FaShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-[#6B5D4F] font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-[#37400B]">{totalOrders}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition flex items-center gap-4">
            <div className="w-12 h-12 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
              <FaCheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-[#6B5D4F] font-medium">Delivered</p>
              <p className="text-2xl font-bold text-green-600">{delivered}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition flex items-center gap-4">
            <div className="w-12 h-12 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
              <FaClock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-[#6B5D4F] font-medium">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pending}</p>
            </div>
          </div>
        </div>

        {/* ─── Search ─── */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BDB47B]" />
          <input
            type="text"
            placeholder="Search by customer name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#EDE4CB] rounded-xl pl-11 pr-4 py-3 text-sm text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-[#37400B] placeholder:text-[#BDB47B]"
          />
        </div>

        {/* ─── Table ─── */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#EDE4CB] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#EDE4CB] text-[#37400B]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Order ID</th>
                  <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">Customer</th>
                  <th className="px-4 py-3 text-left font-semibold">Total</th>
                  <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Payment</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="border-b border-[#EDE4CB] hover:bg-[#EDE4CB]/20 transition">
                      <td className="px-4 py-3 font-mono font-medium text-[#37400B]">
                        #{order._id.slice(-6)}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-[#BDB47B] w-3.5 h-3.5" />
                          <span>{order.user?.name || "Guest"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#37400B]">
                        ₹{order.totalPrice}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getPaymentBadge(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getOrderBadge(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 text-[#6B5D4F]">
                          <FaCalendarAlt className="w-3.5 h-3.5" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <select
                            value={statusMap[order._id] || order.orderStatus}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="border border-[#EDE4CB] rounded-lg px-2 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#37400B]"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => handleUpdate(order._id)}
                            className="p-2 bg-[#37400B] text-white rounded-lg hover:bg-[#2A3308] transition shadow-sm hover:shadow-md"
                            aria-label="Update status"
                          >
                            <FaEdit className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-8 text-[#6B5D4F]/60">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
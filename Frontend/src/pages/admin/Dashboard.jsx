import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getOrderStats,
  getRevenueAnalytics,
  getRecentOrders,
  getMonthlySalesReport,
} from "../../redux/dashboardSlice";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Loader from "../../components/Loader";

// ─── Icons ──────────────────────────────────────────────────────
import {
  FaShoppingBag,
  FaRupeeSign,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

// ─── Custom Tooltip ────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#BDB47B]/30 rounded-xl shadow-lg p-3 text-sm">
        <p className="font-medium text-[#37400B]">{label}</p>
        <p className="text-[#37400B] font-semibold">
          ₹{payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

function Dashboard() {
  const dispatch = useDispatch();

  const {
    stats,
    revenue,
    recentOrders,
    monthlySales,
    loading,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getOrderStats());
    dispatch(getRevenueAnalytics());
    dispatch(getRecentOrders());
    dispatch(getMonthlySalesReport());
  }, [dispatch]);

  // ─── Chart Data ──────────────────────────────────────────────
  const orderStatusData = [
    { name: "Pending", value: stats.pendingOrders || 0 },
    { name: "Processing", value: stats.processingOrders || 0 },
    { name: "Shipped", value: stats.shippedOrders || 0 },
    { name: "Delivered", value: stats.deliveredOrders || 0 },
    { name: "Cancelled", value: stats.cancelledOrders || 0 },
  ];

  const revenueData = [
    { name: "Revenue", amount: revenue.totalRevenue || 0 },
    { name: "Avg Order", amount: revenue.averageOrderValue || 0 },
  ];

  // ─── Palette for Pie Chart ──────────────────────────────────
  const pieColors = [
    "#BDB47B", // khaki
    "#37400B", // olive
    "#2A3308", // dark olive
    "#D4CCA0", // light khaki
    "#E8D5B5", // warm beige
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[#EDE4CB] p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#37400B] tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-[#BDB47B] text-sm mt-1">
            Overview of your bookstore's performance
          </p>
        </div>

        {/* ─── Stats Cards ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatCard
            label="Total Orders"
            value={stats.totalOrders || 0}
            icon={FaShoppingBag}
            accent="border-[#37400B]"
          />
          <StatCard
            label="Revenue"
            value={`₹${(revenue.totalRevenue || 0).toLocaleString()}`}
            icon={FaRupeeSign}
            accent="border-[#BDB47B]"
          />
          <StatCard
            label="Average Order"
            value={`₹${(revenue.averageOrderValue || 0).toLocaleString()}`}
            icon={FaChartLine}
            accent="border-[#D4CCA0]"
          />
          <StatCard
            label="Delivered"
            value={stats.deliveredOrders || 0}
            icon={FaCheckCircle}
            accent="border-[#2A3308]"
          />
        </div>

        {/* ─── Charts Row ─── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Bar Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
            <h2 className="text-lg font-semibold text-[#37400B] mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#37400B] rounded-full" />
              Revenue Analytics
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueData}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6B5D4F", fontSize: 12 }}
                  axisLine={{ stroke: "#EDE4CB" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#6B5D4F", fontSize: 12 }}
                  axisLine={{ stroke: "#EDE4CB" }}
                  tickLine={false}
                  tickFormatter={(v) => `₹${v.toLocaleString()}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="amount"
                  fill="#37400B"
                  radius={[6, 6, 0, 0]}
                  barSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Order Status Pie Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
            <h2 className="text-lg font-semibold text-[#37400B] mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#37400B] rounded-full" />
              Order Status
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={orderStatusData.filter((d) => d.value > 0)}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  paddingAngle={4}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    percent,
                  }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#37400B"
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-xs font-medium"
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                >
                  {orderStatusData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={pieColors[index % pieColors.length]}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white border border-[#BDB47B]/30 rounded-xl shadow-lg p-3 text-sm">
                          <p className="font-medium text-[#37400B]">{data.name}</p>
                          <p className="text-[#37400B] font-semibold">{data.value} orders</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ─── Monthly Sales ─── */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
          <h2 className="text-lg font-semibold text-[#37400B] mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#37400B] rounded-full" />
            Monthly Sales Report
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlySales}>
              <XAxis
                dataKey="month"
                tick={{ fill: "#6B5D4F", fontSize: 12 }}
                axisLine={{ stroke: "#EDE4CB" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6B5D4F", fontSize: 12 }}
                axisLine={{ stroke: "#EDE4CB" }}
                tickLine={false}
                tickFormatter={(v) => `₹${v.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="totalSales"
                fill="#BDB47B"
                radius={[6, 6, 0, 0]}
                barSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ─── Recent Orders Table ─── */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
          <h2 className="text-lg font-semibold text-[#37400B] mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#37400B] rounded-full" />
            Recent Orders
          </h2>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#EDE4CB] text-[#6B5D4F]">
                  <th className="px-4 py-3 text-left font-semibold">Order ID</th>
                  <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">Customer</th>
                  <th className="px-4 py-3 text-left font-semibold">Amount</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders?.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-[#6B5D4F]/60">
                      No recent orders
                    </td>
                  </tr>
                ) : (
                  recentOrders?.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-[#EDE4CB] last:border-0 hover:bg-[#EDE4CB]/20 transition"
                    >
                      <td className="px-4 py-3 font-mono text-[#37400B] font-medium">
                        #{order._id.slice(-6)}
                      </td>
                      <td className="px-4 py-3 text-[#4A3F35] hidden sm:table-cell">
                        {order.user?.name || "Guest User"}
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#37400B]">
                        ₹{order.totalPrice?.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={order.orderStatus} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card Component ──────────────────────────────────────
function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm p-5 sm:p-6 border-l-4 ${accent} border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition hover:shadow-md`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm text-[#6B5D4F] font-medium">{label}</p>
          <p className="text-2xl font-bold text-[#37400B] mt-0.5">{value}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────
function StatusBadge({ status }) {
  const statusMap = {
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
  };

  const className = statusMap[status] || "bg-gray-100 text-gray-700";

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${className}`}>
      {status}
    </span>
  );
}

export default Dashboard;
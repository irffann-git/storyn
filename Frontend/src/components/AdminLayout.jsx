import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaBook,
  FaClipboardList,
  FaUsers,
  FaStore,
  FaBars,
  FaTimes,
  FaEnvelope, // <-- add this
} from "react-icons/fa";

function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
      isActive
        ? "bg-[#EDE4CB] text-[#37400B] shadow-md"
        : "text-[#BDB47B] hover:bg-[#2A3308] hover:text-[#EDE4CB]"
    }`;

  return (
    <div className="flex min-h-screen bg-[#EDE4CB]">
      {/* ─── Mobile Toggle ─── */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#37400B] text-white p-2.5 rounded-xl shadow-lg hover:bg-[#2A3308] transition-colors"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <FaBars size={22} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ─── Sidebar ─── */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-[#37400B] shadow-2xl flex flex-col p-5 gap-2 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:shadow-r-xl`}
      >
        <div className="flex items-center justify-between mb-6 px-2 pt-1">
          <h1 className="text-2xl font-serif font-bold tracking-wider text-white">
            Storyn<span className="text-[#BDB47B]">.Admin</span>
          </h1>
          <button
            className="lg:hidden text-white hover:text-[#BDB47B] transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <FaHome className="text-lg" />
            Dashboard
          </NavLink>
          <NavLink to="/admin/books" className={linkClass}>
            <FaBook className="text-lg" />
            Books
          </NavLink>
          <NavLink to="/admin/orders" className={linkClass}>
            <FaClipboardList className="text-lg" />
            Orders
          </NavLink>
          <NavLink to="/admin/users" className={linkClass}>
            <FaUsers className="text-lg" />
            Users
          </NavLink>
          <NavLink to="/admin/contact" className={linkClass}>  {/* <-- new */}
            <FaEnvelope className="text-lg" />
            Contact
          </NavLink>
        </nav>

        <div className="mt-auto pt-4 border-t border-[#BDB47B]/20">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#BDB47B] hover:bg-[#2A3308] hover:text-[#EDE4CB] transition-all duration-200 font-medium"
          >
            <FaStore className="text-lg" />
            Back to Store
          </NavLink>
        </div>
      </aside>

      <main className="flex-1 ml-0 lg:ml-72 min-h-screen p-4 md:p-8 lg:p-10">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
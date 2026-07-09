import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getUsers,
  deleteUser,
} from "../../redux/userSlice";

import Loader from "../../components/Loader";
import ConfirmModal from "../../components/ConfirmModal";

// ─── Icons ──────────────────────────────────────────────────────
import {
  FaUsers,
  FaUserShield,
  FaSearch,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaTrashAlt,
} from "react-icons/fa";

function Users() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    setModal({
      message: "Are you sure you want to delete this user?",
      onConfirm: () => {
        dispatch(deleteUser(id));
        setModal(null);
      },
    });
  };

  const sortedUsers = [...(users || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }

  const totalUsers = users?.length || 0;
  const adminCount = users?.filter((u) => u.role === "admin").length || 0;

  return (
    <div className="min-h-screen bg-[#EDE4CB] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* ─── Header ─── */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#37400B] tracking-tight">
            Users Management
          </h1>
          <p className="text-[#BDB47B] text-sm mt-1">Manage your store's registered users</p>
        </div>

        {/* ─── Stats ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition flex items-center gap-4">
            <div className="w-12 h-12 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
              <FaUsers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-[#6B5D4F] font-medium">Total Users</p>
              <p className="text-2xl font-bold text-[#37400B]">{totalUsers}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition flex items-center gap-4">
            <div className="w-12 h-12 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
              <FaUserShield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-[#6B5D4F] font-medium">Admin Users</p>
              <p className="text-2xl font-bold text-blue-600">{adminCount}</p>
            </div>
          </div>
        </div>

        {/* ─── Search ─── */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BDB47B]" />
          <input
            type="text"
            placeholder="Search by name or email…"
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
                  <th className="px-4 py-3 text-left font-semibold">Name</th>
                  <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">Email</th>
                  <th className="px-4 py-3 text-left font-semibold">Role</th>
                  <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Joined</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b border-[#EDE4CB] hover:bg-[#EDE4CB]/20 transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-[#BDB47B] w-3.5 h-3.5" />
                          <span className="font-medium text-[#37400B]">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <div className="flex items-center gap-2 text-[#6B5D4F]">
                          <FaEnvelope className="text-[#BDB47B] w-3.5 h-3.5" />
                          <span>{user.email}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="flex items-center gap-1.5 text-[#6B5D4F]">
                          <FaCalendarAlt className="text-[#BDB47B] w-3.5 h-3.5" />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition"
                          aria-label="Delete user"
                        >
                          <FaTrashAlt className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-8 text-[#6B5D4F]/60">
                      No users found
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

export default Users;
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaTag,
  FaEdit,
  FaSave,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle,
  FaLock,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API from "../api/axios";
import { logout } from "../redux/authSlice";
import { toast } from "react-toastify";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setProfile(res.data.user);
        setFormData({
          name: res.data.user.name,
          email: res.data.user.email,
          password: "",
        });
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const payload = { name: formData.name, email: formData.email };
      if (formData.password) payload.password = formData.password;

      const res = await API.put("/auth/profile", payload);
      setProfile(res.data.user);
      setEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#EDE4CB]">
          <div className="w-8 h-8 border-4 border-[#BDB47B] border-t-[#37400B] rounded-full animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#EDE4CB] py-8 md:py-12">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          {/* ─── Header ─── */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#37400B] tracking-tight mb-8 flex items-center gap-3">
            <FaUserCircle className="text-[#BDB47B]" />
            My Profile
          </h1>

          {/* ─── Profile Card ─── */}
          <div className="bg-white rounded-2xl shadow-md border border-[#EDE4CB] p-6 md:p-8 transition hover:border-[#BDB47B]/30">
            {/* Avatar & Basic Info */}
            <div className="flex items-center gap-5 mb-7 pb-6 border-b border-[#EDE4CB]">
              <div className="w-20 h-20 rounded-full bg-[#EDE4CB] flex items-center justify-center text-[#37400B] text-3xl font-bold shadow-inner">
                {profile?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#37400B]">{profile?.name}</h2>
                <p className="text-[#6B5D4F] text-sm flex items-center gap-1.5">
                  <FaEnvelope className="text-[#BDB47B] w-3.5 h-3.5" />
                  {profile?.email}
                </p>
                <span className="inline-block mt-1.5 bg-[#EDE4CB] text-[#37400B] text-xs font-semibold px-3 py-0.5 rounded-full">
                  {profile?.role}
                </span>
              </div>
            </div>

            {/* ─── View Mode ─── */}
            {!editing ? (
              <div className="space-y-4">
                <InfoRow icon={<FaUser />} label="Name" value={profile?.name} />
                <InfoRow icon={<FaEnvelope />} label="Email" value={profile?.email} />
                <InfoRow icon={<FaTag />} label="Role" value={profile?.role} />

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#EDE4CB]">
                  <button
                    onClick={() => setEditing(true)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#37400B] hover:bg-[#2A3308] text-white px-6 py-3 rounded-xl font-semibold text-sm transition shadow-md hover:shadow-lg"
                  >
                    <FaEdit />
                    Edit Profile
                  </button>
                  <button
                    onClick={logoutHandler}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-6 py-3 rounded-xl font-semibold text-sm transition"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              /* ─── Edit Mode ─── */
              <form onSubmit={submitHandler} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#6B5D4F] mb-1.5 flex items-center gap-2">
                    <FaUser className="text-[#BDB47B]" />
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={changeHandler}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B5D4F] mb-1.5 flex items-center gap-2">
                    <FaEnvelope className="text-[#BDB47B]" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B5D4F] mb-1.5 flex items-center gap-2">
                    <FaLock className="text-[#BDB47B]" />
                    New Password
                    <span className="text-xs font-normal text-[#BDB47B] ml-1">(optional)</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder="Leave blank to keep current"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent transition placeholder:text-gray-400"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-[#EDE4CB]">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#37400B] hover:bg-[#2A3308] text-white px-6 py-3 rounded-xl font-semibold text-sm transition shadow-md hover:shadow-lg"
                  >
                    <FaSave />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold text-sm transition"
                  >
                    <FaTimes />
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

// ─── Helper Component ──────────────────────────────────────────
function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#EDE4CB] last:border-0">
      <span className="flex items-center gap-2 text-[#6B5D4F] text-sm">
        <span className="text-[#BDB47B]">{icon}</span>
        {label}
      </span>
      <span className="font-medium text-[#2B2118] text-sm capitalize">{value}</span>
    </div>
  );
}

export default Profile;
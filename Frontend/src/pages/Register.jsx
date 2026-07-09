import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

import { register } from "../redux/authSlice";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDE4CB] px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border border-[#BDB47B]/20 transition-all">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#37400B] tracking-tight">
              Create Account
            </h1>
            <p className="text-[#BDB47B] text-sm mt-2">
              Join our community of book lovers
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-5">
            {/* Name */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BDB47B]">
                <FaUser className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Full name"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BDB47B]">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BDB47B]">
                <FaLock className="w-4 h-4" />
              </div>
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#37400B] hover:bg-[#2A3308] text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <FaArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-[#EDE4CB] text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#37400B] hover:text-[#2A3308] transition"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Optional decorative text */}
        <p className="text-center text-xs text-[#BDB47B] mt-6">
          Join thousands of happy readers • Secure & private
        </p>
      </div>
    </div>
  );
}

export default Register;
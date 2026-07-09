import { Link } from "react-router-dom";
import {
  FaTruck,
  FaGlobe,
  FaClock,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaEnvelope,
  FaPhoneAlt,
  FaCheckCircle,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ShippingPolicy() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#EDE4CB] py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ─── Header ─── */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-[#37400B] border border-[#BDB47B]/20 mb-4">
              <FaTruck className="text-[#BDB47B]" />
              Shipping Policy
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#37400B] tracking-tight">
              Delivery Information
            </h1>
            <p className="text-[#6B5D4F] mt-2 max-w-xl mx-auto">
              Everything you need to know about shipping, delivery times, and costs.
            </p>
          </div>

          {/* ─── Content ─── */}
          <div className="space-y-6">
            {/* ─── Section 1: Processing Time ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaClock className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">Order Processing</h2>
              </div>
              <p className="text-[#6B5D4F] leading-relaxed">
                All orders are processed within <strong>1–2 business days</strong> (excluding weekends and public holidays).
                You will receive a confirmation email once your order has been dispatched.
              </p>
            </section>

            {/* ─── Section 2: Domestic Shipping ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaMapMarkerAlt className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">Domestic Shipping (India)</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#EDE4CB] text-[#37400B]">
                      <th className="px-4 py-3 text-left font-semibold">Shipping Method</th>
                      <th className="px-4 py-3 text-left font-semibold">Delivery Time</th>
                      <th className="px-4 py-3 text-left font-semibold">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#EDE4CB]">
                      <td className="px-4 py-3 font-medium text-[#2B2118]">Standard</td>
                      <td className="px-4 py-3 text-[#6B5D4F]">3–5 business days</td>
                      <td className="px-4 py-3 text-[#37400B] font-semibold">₹49</td>
                    </tr>
                    <tr className="border-b border-[#EDE4CB]">
                      <td className="px-4 py-3 font-medium text-[#2B2118]">Express</td>
                      <td className="px-4 py-3 text-[#6B5D4F]">1–2 business days</td>
                      <td className="px-4 py-3 text-[#37400B] font-semibold">₹149</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-[#2B2118]">Free Shipping</td>
                      <td className="px-4 py-3 text-[#6B5D4F]">3–5 business days</td>
                      <td className="px-4 py-3 text-green-600 font-semibold">FREE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-[#6B5D4F] mt-4">
                <span className="font-semibold text-[#37400B]">Free shipping</span> is automatically applied on orders above ₹499.
              </p>
            </section>

            {/* ─── Section 3: International Shipping ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaGlobe className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">International Shipping</h2>
              </div>
              <p className="text-[#6B5D4F] leading-relaxed mb-4">
                We ship to over <strong>50 countries</strong> worldwide. Delivery times and costs vary by destination.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#EDE4CB] text-[#37400B]">
                      <th className="px-4 py-3 text-left font-semibold">Region</th>
                      <th className="px-4 py-3 text-left font-semibold">Delivery Time</th>
                      <th className="px-4 py-3 text-left font-semibold">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#EDE4CB]">
                      <td className="px-4 py-3 font-medium text-[#2B2118]">Asia</td>
                      <td className="px-4 py-3 text-[#6B5D4F]">5–7 business days</td>
                      <td className="px-4 py-3 text-[#37400B] font-semibold">₹800</td>
                    </tr>
                    <tr className="border-b border-[#EDE4CB]">
                      <td className="px-4 py-3 font-medium text-[#2B2118]">Europe / UK</td>
                      <td className="px-4 py-3 text-[#6B5D4F]">7–10 business days</td>
                      <td className="px-4 py-3 text-[#37400B] font-semibold">₹1,200</td>
                    </tr>
                    <tr className="border-b border-[#EDE4CB]">
                      <td className="px-4 py-3 font-medium text-[#2B2118]">USA / Canada</td>
                      <td className="px-4 py-3 text-[#6B5D4F]">7–10 business days</td>
                      <td className="px-4 py-3 text-[#37400B] font-semibold">₹1,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-[#2B2118]">Rest of World</td>
                      <td className="px-4 py-3 text-[#6B5D4F]">10–14 business days</td>
                      <td className="px-4 py-3 text-[#37400B] font-semibold">₹1,500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-[#6B5D4F] mt-4">
                International shipping costs include handling and packaging. Customs duties and taxes may apply and are the responsibility of the customer.
              </p>
            </section>

            {/* ─── Section 4: Tracking ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaBoxOpen className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">Order Tracking</h2>
              </div>
              <p className="text-[#6B5D4F] leading-relaxed">
                Once your order is shipped, you will receive a <strong>tracking number</strong> via email. You can track your package in real-time using the link provided.
              </p>
              <div className="mt-4 p-4 bg-[#EDE4CB]/30 rounded-xl border border-[#EDE4CB]">
                <p className="text-sm text-[#37400B] flex items-center gap-2">
                  <FaCheckCircle className="text-[#BDB47B]" />
                  <strong>Tip:</strong> You can also track your order from your account dashboard under <Link to="/my-orders" className="text-[#37400B] font-semibold hover:underline">My Orders</Link>.
                </p>
              </div>
            </section>

            {/* ─── Section 5: Delivery Issues ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaRupeeSign className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">Damaged or Lost Packages</h2>
              </div>
              <p className="text-[#6B5D4F] leading-relaxed">
                We take great care in packaging your books. However, if your order arrives damaged or is lost in transit, please contact us within <strong>48 hours</strong> of delivery. We will arrange a replacement or issue a full refund.
              </p>
              <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="text-sm text-red-600">
                  <strong>⚠️ Important:</strong> Please keep all packaging materials and take photos of any damage to help us process your claim quickly.
                </p>
              </div>
            </section>

            {/* ─── Contact Section ─── */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-[#EDE4CB] text-center">
              <h3 className="text-xl font-bold text-[#37400B] mb-2">Need Help with Your Order?</h3>
              <p className="text-[#6B5D4F] text-sm mb-6">
                Our support team is available Monday–Friday, 9 AM – 8 PM.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:support@storyn.com"
                  className="inline-flex items-center gap-2 bg-[#37400B] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#2A3308] transition shadow-sm hover:shadow"
                >
                  <FaEnvelope />
                  support@storyn.com
                </a>
                <Link
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 border-2 border-[#BDB47B] text-[#37400B] px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#EDE4CB] transition"
                >
                  <FaPhoneAlt />
                  +91 98765 43210
                </Link>
              </div>
            </div>

            {/* ─── Last Updated ─── */}
            <p className="text-center text-xs text-[#BDB47B] mt-6">
              Last updated: {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default ShippingPolicy;
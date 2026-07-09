import { Link } from "react-router-dom";
import {
  FaUndo,
  FaExchangeAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaBoxOpen,
  FaEnvelope,
  FaPhoneAlt,
  FaFileInvoice,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ReturnsRefunds() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#EDE4CB] py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ─── Header ─── */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-[#37400B] border border-[#BDB47B]/20 mb-4">
              <FaUndo className="text-[#BDB47B]" />
              Returns & Refunds
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#37400B] tracking-tight">
              Returns & Refund Policy
            </h1>
            <p className="text-[#6B5D4F] mt-2 max-w-xl mx-auto">
              We want you to love your purchase. If you’re not satisfied, we’re here to help.
            </p>
          </div>

          {/* ─── Content ─── */}
          <div className="space-y-6">
            {/* ─── Section 1: Overview ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaFileInvoice className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">30‑Day Return Guarantee</h2>
              </div>
              <p className="text-[#6B5D4F] leading-relaxed">
                We stand behind every book we sell. If for any reason you are not completely satisfied with your purchase,
                you can return it within <strong>30 days</strong> of delivery for a full refund or exchange.
              </p>
            </section>

            {/* ─── Section 2: Eligibility ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaCheckCircle className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">Return Eligibility</h2>
              </div>
              <ul className="list-disc list-inside text-[#6B5D4F] space-y-2 leading-relaxed">
                <li>Books must be in <strong>unread, undamaged condition</strong> (no markings, creases, or water damage).</li>
                <li>All original packaging, tags, and accessories must be included.</li>
                <li>Return requests must be initiated within <strong>30 days</strong> of delivery.</li>
                <li>For defective or damaged items, we cover <strong>return shipping</strong>.</li>
                <li>For change-of-mind returns, return shipping costs are the customer’s responsibility.</li>
              </ul>
            </section>

            {/* ─── Section 3: Non-Returnable Items ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaTimesCircle className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">Non‑Returnable Items</h2>
              </div>
              <ul className="list-disc list-inside text-[#6B5D4F] space-y-2 leading-relaxed">
                <li>E‑books, audiobooks, and digital downloads</li>
                <li>Personalised or custom‑printed books</li>
                <li>Workbooks, journals, and colouring books that have been written in</li>
                <li>Gift cards and store credit</li>
                <li>Sale and clearance items (unless defective)</li>
              </ul>
            </section>

            {/* ─── Section 4: Return Process ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaExchangeAlt className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">How to Return an Item</h2>
              </div>
              <ol className="list-decimal list-inside text-[#6B5D4F] space-y-3 leading-relaxed">
                <li>
                  <strong>Contact us</strong> at <Link href="mailto:returns@storyn.com" className="text-[#37400B] font-medium hover:underline">returns@storyn.com</Link> with your order number and reason for return.
                </li>
                <li>
                  We will send you a <strong>return authorisation</strong> and, if applicable, a prepaid shipping label.
                </li>
                <li>
                  <strong>Pack the book securely</strong> in its original packaging (or equivalent) to prevent damage during transit.
                </li>
                <li>
                  <strong>Ship the item</strong> to the address provided in our return instructions.
                </li>
                <li>
                  Once we receive and inspect the item, we will process your refund or exchange within <strong>3–5 business days</strong>.
                </li>
              </ol>
              <div className="mt-4 p-4 bg-[#EDE4CB]/30 rounded-xl border border-[#EDE4CB]">
                <p className="text-sm text-[#37400B] flex items-center gap-2">
                  <FaCheckCircle className="text-[#BDB47B]" />
                  <strong>Tip:</strong> Use a trackable shipping method to avoid any delivery issues.
                </p>
              </div>
            </section>

            {/* ─── Section 5: Refund Timeline ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaClock className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">Refund Timeline</h2>
              </div>
              <ul className="space-y-3 text-[#6B5D4F] leading-relaxed">
                <li>
                  <span className="font-semibold text-[#37400B]">Inspection:</span> 1–2 business days after we receive your return.
                </li>
                <li>
                  <span className="font-semibold text-[#37400B]">Processing:</span> Refunds are processed within 3–5 business days after inspection.
                </li>
                <li>
                  <span className="font-semibold text-[#37400B]">Banking:</span> Depending on your payment provider, it may take an additional 3–7 business days for the refund to appear in your account.
                </li>
                <li>
                  <span className="font-semibold text-[#37400B]">Store Credit:</span> If you choose store credit, it is available immediately after processing.
                </li>
              </ul>
            </section>

            {/* ─── Section 6: Damaged or Defective Items ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaBoxOpen className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">Damaged or Defective Items</h2>
              </div>
              <p className="text-[#6B5D4F] leading-relaxed">
                If your book arrives damaged or has printing defects, please contact us within <strong>48 hours</strong> of delivery.
                We will arrange a free replacement or issue a full refund, including return shipping costs.
              </p>
              <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="text-sm text-red-600">
                  <strong>⚠️ Important:</strong> Keep all packaging materials and take clear photos of the damage to help us resolve your issue quickly.
                </p>
              </div>
            </section>

            {/* ─── Section 7: Contact ─── */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-[#EDE4CB] text-center">
              <h3 className="text-xl font-bold text-[#37400B] mb-2">Need Assistance with a Return?</h3>
              <p className="text-[#6B5D4F] text-sm mb-6">
                Our returns team is available Monday–Friday, 9 AM – 8 PM.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="mailto:returns@storyn.com"
                  className="inline-flex items-center gap-2 bg-[#37400B] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#2A3308] transition shadow-sm hover:shadow"
                >
                  <FaEnvelope />
                  returns@storyn.com
                </Link>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 border-2 border-[#BDB47B] text-[#37400B] px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#EDE4CB] transition"
                >
                  <FaPhoneAlt />
                  +91 98765 43210
                </a>
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

export default ReturnsRefunds;
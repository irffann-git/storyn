import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaEnvelope,
  FaPhoneAlt,
  FaLifeRing,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const faqData = [
  {
    id: 1,
    question: "How do I place an order?",
    answer:
      "Simply browse our collection, click on a book you like, select the quantity, and click 'Add to Cart'. When you're ready, go to your cart and proceed to checkout. Fill in your shipping details and payment information to complete your order.",
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit/debit cards (Visa, Mastercard, Amex), UPI, PayPal, and net banking. All transactions are secure and encrypted.",
  },
  {
    id: 3,
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3–5 business days. Express shipping (1–2 business days) is available at checkout for an additional fee. You will receive a tracking link once your order is dispatched.",
  },
  {
    id: 4,
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide! International delivery times vary by destination (typically 7–14 business days). Shipping costs are calculated at checkout based on your location and order weight.",
  },
  {
    id: 5,
    question: "Can I cancel or change my order?",
    answer:
      "Orders can be cancelled or modified within 2 hours of placement. Contact our support team immediately with your order number. After that, the order may have been processed and cannot be changed.",
  },
  {
    id: 6,
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of delivery. Books must be in their original condition (unread, with no damage). You will receive a full refund or store credit. Return shipping is free for defective items.",
  },
  {
    id: 7,
    question: "How do I track my order?",
    answer:
      "Once your order ships, you'll receive an email with a tracking number and a link to the courier's website. You can also track your order from your account dashboard under 'My Orders'.",
  },
  {
    id: 8,
    question: "What if my book arrives damaged?",
    answer:
      "We take great care in packaging, but if your book arrives damaged, please contact us within 48 hours with photos of the damage. We'll arrange a replacement or full refund at no extra cost.",
  },
  {
    id: 9,
    question: "How do I create an account?",
    answer:
      "Click on the 'Register' link at the top of the page. Fill in your name, email, and password. You'll receive a confirmation email to verify your account. Once verified, you can start shopping!",
  },
  {
    id: 10,
    question: "How do I reset my password?",
    answer:
      "On the login page, click 'Forgot Password'. Enter your registered email address. We'll send you a link to reset your password. Follow the instructions in the email to create a new password.",
  },
  {
    id: 11,
    question: "Do you have a loyalty program?",
    answer:
      "Yes! Every purchase earns you points that can be redeemed for discounts on future orders. You also get exclusive early access to sales and new releases. Sign up for our newsletter to stay updated.",
  },
  {
    id: 12,
    question: "How can I contact customer support?",
    answer:
      "You can reach us via email at support@storyn.com, or call us at +91 98765 43210 (Mon–Fri, 9 AM – 8 PM). You can also use the live chat on our website for quick assistance.",
  },
];

function Faq() {
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState("");

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaq = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#EDE4CB] py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ─── Header ─── */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-[#37400B] border border-[#BDB47B]/20 mb-4">
              <FaLifeRing className="text-[#BDB47B]" />
              Help Center
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#37400B] tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-[#6B5D4F] mt-2 max-w-xl mx-auto">
              Find answers to the most common questions about our store, orders, and policies.
            </p>
          </div>

          {/* ─── Search ─── */}
          <div className="relative mb-8 max-w-lg mx-auto">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BDB47B]" />
            <input
              type="text"
              placeholder="Search for a question..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-[#EDE4CB] rounded-xl pl-11 pr-4 py-3 text-sm text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-[#37400B] placeholder:text-[#BDB47B] shadow-sm"
            />
          </div>

          {/* ─── FAQ List ─── */}
          <div className="space-y-3">
            {filteredFaq.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-[#EDE4CB]">
                <p className="text-[#6B5D4F]">No questions match your search.</p>
              </div>
            ) : (
              filteredFaq.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm border border-[#EDE4CB] hover:border-[#BDB47B]/40 transition overflow-hidden"
                >
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-[#2B2118] hover:bg-[#EDE4CB]/30 transition"
                  >
                    <span className="font-medium text-sm md:text-base flex-1">
                      {item.question}
                    </span>
                    <span className="text-[#BDB47B] shrink-0">
                      {openId === item.id ? (
                        <FaChevronUp className="w-4 h-4" />
                      ) : (
                        <FaChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  {openId === item.id && (
                    <div className="px-5 pb-5 pt-1 text-sm text-[#6B5D4F] leading-relaxed border-t border-[#EDE4CB]">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* ─── Contact CTA ─── */}
          <div className="mt-12 bg-white rounded-2xl shadow-md p-6 md:p-8 border border-[#EDE4CB] text-center">
            <h3 className="text-xl font-bold text-[#37400B] mb-2">Still have questions?</h3>
            <p className="text-[#6B5D4F] text-sm mb-6">
              Our support team is here to help you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="mailto:support@storyn.com"
                className="inline-flex items-center gap-2 bg-[#37400B] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#2A3308] transition shadow-sm hover:shadow"
              >
                <FaEnvelope />
                support@storyn.com
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
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Faq;
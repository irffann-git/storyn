import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaUserSecret,
  FaDatabase,
  FaCookie,
  FaLock,
  FaShareAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaCheckCircle,
  FaFileInvoice,
  FaUserCog,
  FaGlobe,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#EDE4CB] py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ─── Header ─── */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-[#37400B] border border-[#BDB47B]/20 mb-4">
              <FaShieldAlt className="text-[#BDB47B]" />
              Privacy Policy
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#37400B] tracking-tight">
              Your Privacy Matters
            </h1>
            <p className="text-[#6B5D4F] mt-2 max-w-xl mx-auto">
              How we collect, use, and protect your personal information.
            </p>
          </div>

          {/* ─── Content ─── */}
          <div className="space-y-6">
            {/* ─── Section 1: Introduction ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaUserSecret className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">Our Commitment to Privacy</h2>
              </div>
              <p className="text-[#6B5D4F] leading-relaxed">
                At <strong>Storyn</strong>, we take your privacy seriously. This policy explains how we collect, use,
                disclose, and safeguard your information when you visit our website or make a purchase.
                We are committed to protecting your personal data and being transparent about our practices.
              </p>
            </section>

            {/* ─── Section 2: Information We Collect ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaDatabase className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">Information We Collect</h2>
              </div>
              <div className="space-y-3 text-[#6B5D4F] leading-relaxed">
                <div>
                  <h4 className="font-semibold text-[#37400B]">Personal Information You Provide</h4>
                  <ul className="list-disc list-inside ml-4 space-y-1 mt-1">
                    <li>Name, email address, phone number, and shipping address</li>
                    <li>Payment information (processed securely through our payment partners)</li>
                    <li>Account login credentials</li>
                    <li>Order history and preferences</li>
                    <li>Communications with our support team</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#37400B]">Automatically Collected Information</h4>
                  <ul className="list-disc list-inside ml-4 space-y-1 mt-1">
                    <li>IP address, browser type, and device information</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referral source and search terms</li>
                    <li>Cookies and tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ─── Section 3: How We Use Your Information ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaUserCog className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">How We Use Your Information</h2>
              </div>
              <ul className="list-disc list-inside text-[#6B5D4F] space-y-2 leading-relaxed">
                <li><strong>Process orders</strong> – Fulfil your purchases, send order confirmations, and provide shipping updates.</li>
                <li><strong>Improve our services</strong> – Analyse usage patterns to enhance your shopping experience.</li>
                <li><strong>Personalise recommendations</strong> – Suggest books and offers tailored to your interests.</li>
                <li><strong>Communicate with you</strong> – Send newsletters, promotional offers, and important updates (you can opt out anytime).</li>
                <li><strong>Prevent fraud</strong> – Protect our platform and users from fraudulent activity.</li>
                <li><strong>Comply with legal obligations</strong> – Meet regulatory and legal requirements.</li>
              </ul>
            </section>

            {/* ─── Section 4: Cookies & Tracking ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaCookie className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">Cookies & Tracking Technologies</h2>
              </div>
              <p className="text-[#6B5D4F] leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your browsing experience, remember your preferences,
                and analyse site traffic. You can control cookie settings in your browser preferences.
              </p>
              <div className="p-4 bg-[#EDE4CB]/30 rounded-xl border border-[#EDE4CB]">
                <p className="text-sm text-[#37400B] flex items-center gap-2">
                  <FaCheckCircle className="text-[#BDB47B]" />
                  <strong>Managing Cookies:</strong> Most browsers allow you to block or delete cookies. However, disabling cookies may affect certain features of our website.
                </p>
              </div>
            </section>

            {/* ─── Section 5: Data Security ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaLock className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">Data Security</h2>
              </div>
              <p className="text-[#6B5D4F] leading-relaxed">
                We implement industry‑standard security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-[#6B5D4F] space-y-2 leading-relaxed mt-3">
                <li><strong>SSL encryption</strong> – All data transmitted between your browser and our servers is encrypted.</li>
                <li><strong>Secure payment processing</strong> – We use trusted payment gateways that comply with PCI DSS standards.</li>
                <li><strong>Access controls</strong> – Only authorised personnel have access to your data.</li>
                <li><strong>Regular monitoring</strong> – We continuously monitor our systems for potential vulnerabilities.</li>
              </ul>
            </section>

            {/* ─── Section 6: Third-Party Sharing ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaShareAlt className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">Third‑Party Sharing</h2>
              </div>
              <p className="text-[#6B5D4F] leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. However, we may share your
                information with trusted service providers who assist us in operating our website and delivering services:
              </p>
              <ul className="list-disc list-inside text-[#6B5D4F] space-y-2 leading-relaxed mt-3">
                <li><strong>Payment processors</strong> – To securely handle transactions.</li>
                <li><strong>Shipping partners</strong> – To deliver your orders.</li>
                <li><strong>Email service providers</strong> – To send order confirmations and updates.</li>
                <li><strong>Analytics tools</strong> – To understand how users interact with our site.</li>
              </ul>
            </section>

            {/* ─── Section 7: Your Rights ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaGlobe className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">Your Rights</h2>
              </div>
              <p className="text-[#6B5D4F] leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-[#6B5D4F] space-y-2 leading-relaxed">
                <li><strong>Access</strong> – Request a copy of the personal data we hold about you.</li>
                <li><strong>Correct</strong> – Update or correct inaccurate information.</li>
                <li><strong>Delete</strong> – Request deletion of your personal data (subject to legal obligations).</li>
                <li><strong>Restrict</strong> – Limit how we use your data.</li>
                <li><strong>Portability</strong> – Receive your data in a machine‑readable format.</li>
                <li><strong>Withdraw consent</strong> – Opt out of marketing communications at any time.</li>
              </ul>
              <div className="mt-4 p-4 bg-[#EDE4CB]/30 rounded-xl border border-[#EDE4CB]">
                <p className="text-sm text-[#37400B]">
                  To exercise any of these rights, please contact us at <strong>privacy@storyn.com</strong>.
                </p>
              </div>
            </section>

            {/* ─── Section 8: Children's Privacy ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaUserSecret className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">Children's Privacy</h2>
              </div>
              <p className="text-[#6B5D4F] leading-relaxed">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal
                information from children under 13. If you believe we have inadvertently collected such information,
                please contact us immediately and we will take steps to remove it.
              </p>
            </section>

            {/* ─── Section 9: Changes to Policy ─── */}
            <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#EDE4CB] hover:border-[#BDB47B]/30 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EDE4CB] rounded-full flex items-center justify-center text-[#37400B]">
                  <FaFileInvoice className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#37400B]">Changes to This Policy</h2>
              </div>
              <p className="text-[#6B5D4F] leading-relaxed">
                We may update this privacy policy from time to time to reflect changes in our practices or legal requirements.
                We will notify you of any significant changes by posting the new policy on this page.
                We encourage you to review this page periodically.
              </p>
            </section>

            {/* ─── Section 10: Contact Us ─── */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-[#EDE4CB] text-center">
              <h3 className="text-xl font-bold text-[#37400B] mb-2">Questions About Privacy?</h3>
              <p className="text-[#6B5D4F] text-sm mb-6">
                Our privacy team is available Monday–Friday, 9 AM – 8 PM.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="mailto:privacy@storyn.com"
                  className="inline-flex items-center gap-2 bg-[#37400B] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#2A3308] transition shadow-sm hover:shadow"
                >
                  <FaEnvelope />
                  privacy@storyn.com
                </Link>
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

export default PrivacyPolicy;
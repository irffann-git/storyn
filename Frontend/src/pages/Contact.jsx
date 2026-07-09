import { useState } from "react";
import axios from "axios";
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaClock,
    FaPaperPlane,
    FaCheckCircle,
    FaArrowRight,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const contactInfo = [
    {
        icon: <FaMapMarkerAlt className="text-3xl" />,
        title: "Visit Us",
        details: "123 Book Street, Literary District,\nNew York, NY 10001",
        bg: "bg-[#EDE4CB]",
        color: "text-[#37400B]",
    },
    {
        icon: <FaPhoneAlt className="text-3xl" />,
        title: "Call Us",
        details: "+1 (555) 123-4567\n+1 (555) 987-6543",
        bg: "bg-[#EDE4CB]",
        color: "text-[#37400B]",
    },
    {
        icon: <FaEnvelope className="text-3xl" />,
        title: "Email Us",
        details: "hello@storyn.com\nsupport@storyn.com",
        bg: "bg-[#EDE4CB]",
        color: "text-[#37400B]",
    },
    {
        icon: <FaClock className="text-3xl" />,
        title: "Working Hours",
        details: "Mon - Fri: 9:00 AM – 8:00 PM\nSat - Sun: 10:00 AM – 6:00 PM",
        bg: "bg-[#EDE4CB]",
        color: "text-[#37400B]",
    },
];

const socialLinks = [
    { icon: <FaFacebookF />, label: "Facebook", href: "#" },
    { icon: <FaTwitter />, label: "Twitter", href: "#" },
    { icon: <FaInstagram />, label: "Instagram", href: "#" },
    { icon: <FaLinkedinIn />, label: "LinkedIn", href: "#" },
];

export default function Contact() {
    const [formStatus, setFormStatus] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus("sending");
        setErrorMsg("");

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, formData);

            setFormStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setFormStatus(null), 4000);
        } catch (error) {
            setFormStatus("error");
            setErrorMsg(
                error.response?.data?.message || "Something went wrong. Please try again."
            );
            setTimeout(() => setFormStatus(null), 4000);
        }
    };

    return (
        <div className="bg-white font-sans">
            <Navbar />

            {/* ===== HERO ===== */}
            <section className="relative overflow-hidden bg-[#37400B] text-white">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute top-1/2 -left-32 w-80 h-80 bg-[#BDB47B]/20 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-[#BDB47B]/20 rounded-full blur-3xl animate-pulse delay-500" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-8 border border-white/20">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                        </span>
                        <span className="text-sm font-medium tracking-wide">Get in Touch</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                        Contact <span className="text-[#BDB47B]">Us</span>
                    </h1>

                    <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-white/80 font-light">
                        Have questions, feedback, or just want to say hello? We'd love to hear from you.
                        Reach out and our team will get back to you as soon as possible.
                    </p>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
                            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CONTACT INFO CARDS ===== */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-[#EDE4CB] text-[#37400B] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                            <span className="w-2 h-2 bg-[#37400B] rounded-full" />
                            Contact Information
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                            We'd Love to <span className="text-[#37400B]">Hear From You</span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactInfo.map((item, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100/80 relative overflow-hidden"
                            >
                                <div className={`absolute inset-0 ${item.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                                <div className="relative">
                                    <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-6 ${item.color} text-3xl group-hover:scale-110 transition duration-300`}>
                                        {item.icon}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#37400B] transition">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-500 leading-relaxed whitespace-pre-line">
                                        {item.details}
                                    </p>

                                    <div className="mt-4 w-12 h-1 bg-[#BDB47B]/30 rounded-full group-hover:w-16 group-hover:bg-[#BDB47B] transition-all" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CONTACT FORM + MAP ===== */}
            <section className="py-24 bg-[#EDE4CB] relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-[#BDB47B]/30 text-[#37400B] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                            <span className="w-2 h-2 bg-[#37400B] rounded-full" />
                            Send a Message
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                            Drop Us a <span className="text-[#37400B]">Line</span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Form */}
                        <div className="lg:col-span-3 bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-[#BDB47B]/20">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Your Name <span className="text-[#37400B]">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent transition placeholder-gray-400"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address <span className="text-[#37400B]">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent transition placeholder-gray-400"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Subject <span className="text-[#37400B]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent transition placeholder-gray-400"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Message <span className="text-[#37400B]">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent transition placeholder-gray-400 resize-none"
                                        placeholder="Tell us what's on your mind..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={formStatus === "sending"}
                                    className={`w-full py-4 px-6 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-3 ${
                                        formStatus === "sending"
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-[#37400B] hover:bg-[#2A3308] hover:shadow-lg hover:shadow-[#37400B]/30 hover:-translate-y-1"
                                    }`}
                                >
                                    {formStatus === "sending" ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Sending...
                                        </>
                                    ) : formStatus === "success" ? (
                                        <>
                                            <FaCheckCircle />
                                            Message Sent!
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane />
                                            Send Message
                                        </>
                                    )}
                                </button>

                                {formStatus === "success" && (
                                    <div className="text-center text-green-600 bg-green-50 p-4 rounded-2xl font-medium">
                                        Thank you! We'll get back to you shortly.
                                    </div>
                                )}

                                {formStatus === "error" && (
                                    <div className="text-center text-red-600 bg-red-50 p-4 rounded-2xl font-medium">
                                        {errorMsg}
                                    </div>
                                )}
                            </form>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-500 mb-4">Connect with us on social media</p>
                                <div className="flex gap-4">
                                    {socialLinks.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.href}
                                            className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#37400B] hover:text-white transition-all hover:scale-110 hover:shadow-lg"
                                            aria-label={link.label}
                                        >
                                            {link.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#BDB47B]/20 h-64 lg:h-auto">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb7ae0b%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1644262070686!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, minHeight: "250px" }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Store Location"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#BDB47B]/20">
                                <h4 className="font-bold text-xl text-gray-800 mb-4">Frequently Asked</h4>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between text-left font-semibold text-gray-700">
                                            <span>How long does shipping take?</span>
                                            <Link to="/faq"><FaArrowRight className="text-[#BDB47B] text-sm" /></Link>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">Standard shipping takes 3–5 business days. Express available.</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between text-left font-semibold text-gray-700">
                                            <span>Can I return a book?</span>
                                            <Link to="/faq"><FaArrowRight className="text-[#BDB47B] text-sm" /></Link>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">Yes, we accept returns within 30 days of purchase.</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between text-left font-semibold text-gray-700">
                                            <span>Do you offer international shipping?</span>
                                            <Link to="/faq"><FaArrowRight className="text-[#BDB47B] text-sm" /></Link>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">Yes, we ship worldwide. Rates vary by location.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[#37400B]" />

                <div className="relative max-w-4xl mx-auto text-center px-6">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-semibold border border-white/20 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                        </span>
                        Let's Connect
                    </div>

                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        Have a Question? <br />
                        <span className="text-[#BDB47B]">We're Here to Help</span>
                    </h2>

                    <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Whether you need book recommendations, order assistance, or just want to chat about literature – we're all ears.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="group bg-white text-[#37400B] font-bold px-10 py-4 rounded-full shadow-2xl hover:shadow-[#37400B]/30 hover:-translate-y-1 transition-all flex items-center gap-3">
                            <FaEnvelope />
                            Email Us
                            <FaArrowRight className="group-hover:translate-x-1 transition" />
                        </button>
                        <button className="group bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-10 py-4 rounded-full hover:bg-white/20 transition-all flex items-center gap-3">
                            <FaPhoneAlt />
                            Call Now
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
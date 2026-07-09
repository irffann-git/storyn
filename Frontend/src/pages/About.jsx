import {
    FaBookOpen,
    FaShippingFast,
    FaLock,
    FaStar,
    FaUsers,
    FaGlobe,
    FaArrowRight,
    FaQuoteLeft,
    FaHeart,
    FaRocket,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
    {
        icon: <FaBookOpen className="text-4xl" />,
        title: "Wide Book Collection",
        description: "Explore thousands of books across fiction, education, business, children's books, and more.",
        bg: "bg-[#EDE4CB]",
    },
    {
        icon: <FaShippingFast className="text-4xl" />,
        title: "Fast Delivery",
        description: "Get your favorite books delivered safely and quickly to your doorstep.",
        bg: "bg-[#EDE4CB]",
    },
    {
        icon: <FaLock className="text-4xl" />,
        title: "Secure Shopping",
        description: "Shop with confidence using safe and secure payment methods.",
        bg: "bg-[#EDE4CB]",
    },
    {
        icon: <FaStar className="text-4xl" />,
        title: "Trusted Quality",
        description: "We offer books from trusted publishers and bestselling authors.",
        bg: "bg-[#EDE4CB]",
    },
];

const stats = [
    { number: "10K+", label: "Books Available" },
    { number: "5K+", label: "Happy Readers" },
    { number: "500+", label: "Best Sellers" },
    { number: "24/7", label: "Customer Support" },
];

const values = [
    {
        icon: <FaBookOpen className="text-3xl" />,
        title: "Passion for Reading",
        text: "We believe every book has the power to educate, inspire, and transform lives.",
        bg: "bg-[#EDE4CB]",
        color: "text-[#37400B]",
    },
    {
        icon: <FaUsers className="text-3xl" />,
        title: "Customer First",
        text: "Your satisfaction is our highest priority in everything we do.",
        bg: "bg-[#EDE4CB]",
        color: "text-[#37400B]",
    },
    {
        icon: <FaStar className="text-3xl" />,
        title: "Quality",
        text: "Every book is carefully selected to ensure the best reading experience.",
        bg: "bg-[#EDE4CB]",
        color: "text-[#37400B]",
    },
    {
        icon: <FaGlobe className="text-3xl" />,
        title: "Community",
        text: "Building a community of readers who share knowledge and inspiration.",
        bg: "bg-[#EDE4CB]",
        color: "text-[#37400B]",
    },
];

const teamMembers = [
    {
        name: "Sarah Johnson",
        role: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    },
    {
        name: "Michael Chen",
        role: "Head of Curation",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    {
        name: "Emily Rodriguez",
        role: "Customer Experience",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    },
    {
        name: "David Kim",
        role: "Operations Director",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
];

export default function About() {
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
                        <span className="text-sm font-medium tracking-wide">Welcome to Storyn</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                        About <span className="text-[#BDB47B]">Storyn</span>
                    </h1>

                    <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-white/80 font-light">
                        Discover a world of stories, knowledge, and inspiration. Storyn connects readers with books
                        they love through a modern, enjoyable, and secure online shopping experience.
                    </p>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
                            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== OUR STORY ===== */}
            <section className="py-24 bg-white relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#EDE4CB]/50 to-transparent pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#BDB47B]/30 rounded-2xl rotate-12 -z-10" />
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#BDB47B]/20 rounded-full -z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=900"
                            alt="Book Store"
                            className="rounded-3xl shadow-2xl object-cover h-[480px] w-full hover:scale-[1.01] transition duration-700"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-4">
                            <div className="bg-[#37400B] rounded-full p-3 text-white">
                                <FaHeart />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-800">10K+</div>
                                <div className="text-xs text-gray-500">Books Sold</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="inline-flex items-center gap-2 bg-[#EDE4CB] text-[#37400B] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                            <span className="w-2 h-2 bg-[#37400B] rounded-full" />
                            Our Story
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                            Every Book Tells a <span className="text-[#37400B]">Story</span>
                        </h2>

                        <p className="text-gray-600 leading-relaxed mb-5 text-lg">
                            Storyn was founded with a simple mission—to make quality books accessible to everyone.
                            We believe books inspire creativity, expand knowledge, and change lives.
                        </p>

                        <p className="text-gray-600 leading-relaxed mb-5">
                            From bestselling novels to educational resources, children's books, biographies, and
                            self-development titles, we carefully curate a collection for readers of every age.
                        </p>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            Our goal is to create a trusted online bookstore where discovering your next favorite
                            book is simple, enjoyable, and affordable.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button className="group bg-[#37400B] hover:bg-[#2A3308] text-white font-semibold px-8 py-3.5 rounded-full flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                                Learn More
                                <FaArrowRight className="group-hover:translate-x-1 transition" />
                            </button>
                            <button className="group bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-3.5 rounded-full flex items-center gap-2 transition-all">
                                <FaBookOpen />
                                Browse Books
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== MISSION & VISION ===== */}
            <section className="py-24 bg-[#EDE4CB] relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-[#BDB47B]/30 text-[#37400B] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                            <span className="w-2 h-2 bg-[#37400B] rounded-full" />
                            Our Purpose
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                            Mission &amp; <span className="text-[#37400B]">Vision</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-[#BDB47B]/20 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#37400B]" />
                            <div className="relative">
                                <div className="w-16 h-16 bg-[#EDE4CB] rounded-2xl flex items-center justify-center mb-6 text-[#37400B] text-3xl">
                                    <FaRocket />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    To inspire a lifelong love of reading by providing quality books, affordable prices,
                                    and exceptional customer service for readers around the world.
                                </p>
                            </div>
                        </div>

                        <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-[#BDB47B]/20 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#37400B]" />
                            <div className="relative">
                                <div className="w-16 h-16 bg-[#EDE4CB] rounded-2xl flex items-center justify-center mb-6 text-[#37400B] text-3xl">
                                    <FaGlobe />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-gray-800">Our Vision</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    To become one of the most trusted online bookstores, connecting readers with stories
                                    that educate, entertain, and inspire.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== WHY CHOOSE US ===== */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-[#EDE4CB] text-[#37400B] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                            <span className="w-2 h-2 bg-[#37400B] rounded-full" />
                            Why Us
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Why Choose <span className="text-[#37400B]">Storyn</span>?
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            We focus on delivering an outstanding reading and shopping experience for every customer.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((item, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100/80 overflow-hidden"
                            >
                                <div className={`absolute inset-0 ${item.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                                <div className="relative">
                                    <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-6 text-[#37400B] text-3xl group-hover:scale-110 transition duration-300`}>
                                        {item.icon}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#37400B] transition">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-500 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== STATISTICS ===== */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[#37400B]">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-semibold border border-white/20">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            Our Impact
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
                            By the <span className="text-[#BDB47B]">Numbers</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((item, index) => (
                            <div
                                key={index}
                                className="group text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-2 hover:shadow-2xl"
                            >
                                <div className="text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-tight">
                                    {item.number}
                                </div>
                                <p className="text-white/80 text-lg font-medium tracking-wide">
                                    {item.label}
                                </p>
                                <div className="w-12 h-1 bg-[#BDB47B]/50 mx-auto mt-4 rounded-full group-hover:w-20 transition-all" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CORE VALUES ===== */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-[#EDE4CB] text-[#37400B] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                            <span className="w-2 h-2 bg-[#37400B] rounded-full" />
                            Our Values
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                            Core <span className="text-[#37400B]">Values</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((item, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100/80 relative overflow-hidden"
                            >
                                <div className={`absolute inset-0 ${item.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                                <div className="relative">
                                    <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-5 ${item.color} text-3xl group-hover:scale-110 transition duration-300`}>
                                        {item.icon}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#37400B] transition">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-500 leading-relaxed">
                                        {item.text}
                                    </p>

                                    <div className="mt-4 w-12 h-1 bg-[#BDB47B]/30 rounded-full group-hover:w-16 group-hover:bg-[#BDB47B] transition-all" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TEAM ===== */}
            <section className="py-24 bg-[#EDE4CB]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-[#BDB47B]/30 text-[#37400B] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                            <span className="w-2 h-2 bg-[#37400B] rounded-full" />
                            Team
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                            Meet Our <span className="text-[#37400B]">Team</span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-3"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-72 object-cover group-hover:scale-105 transition duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#37400B]/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
                                </div>
                                <div className="p-6 text-center">
                                    <h4 className="text-lg font-bold text-gray-800">{member.name}</h4>
                                    <p className="text-[#37400B] font-medium text-sm">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIAL ===== */}
            <section className="py-24 bg-white relative">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-[#EDE4CB] text-[#37400B] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                        <span className="w-2 h-2 bg-[#37400B] rounded-full" />
                        Testimonial
                    </div>

                    <div className="relative">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-7xl text-[#BDB47B]/30">
                            <FaQuoteLeft />
                        </div>

                        <blockquote className="text-2xl md:text-3xl font-light text-gray-700 leading-relaxed pt-8">
                            "Storyn has completely transformed how I discover and buy books.
                            The collection is incredible, and the service is second to none."
                        </blockquote>

                        <div className="mt-8 flex items-center justify-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-[#37400B] flex items-center justify-center text-white font-bold text-xl">
                                JD
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-gray-800">Jessica Davis</div>
                                <div className="text-sm text-gray-500">Avid Reader &amp; Book Blogger</div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-1 mt-6 text-[#BDB47B]">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className="text-xl" />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="relative py-28 overflow-hidden">
                <div className="absolute inset-0 bg-[#37400B]" />

                <div className="relative max-w-4xl mx-auto text-center px-6">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-semibold border border-white/20 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                        </span>
                        Join the Community
                    </div>

                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Ready to Discover Your <br />
                        <span className="text-[#BDB47B]">Next Favorite Book</span>?
                    </h2>

                    <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Browse thousands of books across every genre and start your reading journey today.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="group bg-white text-[#37400B] font-bold px-10 py-4 rounded-full shadow-2xl hover:shadow-[#37400B]/30 hover:-translate-y-1 transition-all flex items-center gap-3">
                            <FaBookOpen />
                            Shop Now
                            <FaArrowRight className="group-hover:translate-x-1 transition" />
                        </button>
                        <button className="group bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-10 py-4 rounded-full hover:bg-white/20 transition-all flex items-center gap-3">
                            <FaUsers />
                            Join Community
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
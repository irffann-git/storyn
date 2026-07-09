import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import Hero from "../components/home/Hero";
import FeaturedBooks from "../components/home/FeaturedBooks";

import { getBooks } from "../redux/bookSlice";
import PromoCards from "../components/home/promoCard";
import TrendingBooks from "../components/home/TrendingBooks";
import Bestselling from "../components/home/bestselling";
import PromoBanner from "../components/home/PromoBanner";
import PopularBooks from "../components/home/popularBooks";
import LimitedEdition from "../components/home/Limited Edition";
import NewArrival from "../components/home/NewArrival";
import FavouriteReads from "../components/home/Favouritereads";

function Home() {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />

        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="bg-white border border-red-100 rounded-3xl shadow-sm px-10 py-10 max-w-sm w-full text-center">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-exclamation-triangle text-red-400 text-lg"></i>
            </div>

            <h3 className="font-bold text-gray-900 mb-2">
              Something went wrong
            </h3>

            <p className="text-gray-500 mb-6">
              {error}
            </p>

            <button
              onClick={() => dispatch(getBooks())}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition"
            >
              Try Again
            </button>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main>

        <Hero />

        <FeaturedBooks />
        <PromoCards/>
        <NewArrival/>
        <TrendingBooks/>
        <PromoBanner/>
        <Bestselling/>
         <FavouriteReads/>
        <PopularBooks/>
        <LimitedEdition/>
       

      </main>

      <Footer />
    </>
  );
}

export default Home;
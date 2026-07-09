import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BookDetails from "../pages/BookDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Address from "../pages/Address";
import Checkout from "../pages/Checkout";
import MyOrders from "../pages/MyOrders";
import OrderDetails from "../pages/OrderDetails";
import Dashboard from "../pages/admin/Dashboard";
import Books from "../pages/admin/Books";
import Orders from "../pages/admin/Orders";
import Users from "../pages/admin/Users";
import Profile from "../pages/Profile";
import AdminLayout from "../components/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import NotFound from "../pages/NotFound";
import CollectionPage from "../pages/CollectionPage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Faq from "../pages/Faq";
import ShippingPolicy from "../pages/ShippingPolicy";
import ReturnsRefunds from "../pages/ReturnsRefunds";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import AdminContact from "../pages/admin/Contact";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/books" element={<CollectionPage />} />
      <Route path="/collection" element={<CollectionPage />} />
      <Route path="/collection/:type" element={<CollectionPage />} />

      {/* User Protected Routes */}
      <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
      <Route path="/addresses" element={<ProtectedRoute><Address /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
      <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/faq" element={<Faq/>}/>
      <Route path="/shipping" element={<ShippingPolicy/>}/>
      <Route path="/returns" element={<ReturnsRefunds/>}/>
      <Route path="/privacy" element={<PrivacyPolicy/>}/>








      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="books" element={<Books />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<Users />} />
         <Route path="contact" element={<AdminContact/>} /> 
      </Route>

      {/* Catch-all — must stay last so it doesn't shadow real routes */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;
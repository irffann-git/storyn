import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/authSlice";
import bookReducer from "../redux/bookSlice";
import cartReducer from "../redux/cartSlice";
import wishlistReducer from "../redux/wishlistSlice";
import addressReducer from "../redux/addressSlice";
import orderReducer from "../redux/orderSlice";
import dashboardReducer from "../redux/dashboardSlice";
import userReducer from "../redux/userSlice";
import reviewReducer from "../redux/reviewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    address: addressReducer,
    order: orderReducer,
    dashboard: dashboardReducer,
    users: userReducer,
    reviews: reviewReducer,
  },
});
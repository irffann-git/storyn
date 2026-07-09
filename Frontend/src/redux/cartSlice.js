import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// GET CART
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/cart");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch cart"
      );
    }
  }
);

// ADD TO CART
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (bookId, thunkAPI) => {
    try {
      const response = await API.post("/cart", {
        bookId,
        quantity: 1,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to add to cart"
      );
    }
  }
);

// REMOVE ITEM
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (bookId, thunkAPI) => {
    try {
      const response = await API.delete(
        `/cart/${bookId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to remove item"
      );
    }
  }
);

// UPDATE QUANTITY
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ bookId, quantity }, thunkAPI) => {
    try {
      const response = await API.put(
        `/cart/${bookId}`,
        {
          quantity,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update quantity"
      );
    }
  }
);

// CLEAR CART
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      const response = await API.delete("/cart/clear");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to clear cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cart: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET CART
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD TO CART
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REMOVE ITEM
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE QUANTITY
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CLEAR CART
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;

        if (state.cart) {
          state.cart.items = [];
        }
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
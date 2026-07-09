import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// GET WISHLIST
export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/wishlist");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch wishlist"
      );
    }
  }
);

// ADD TO WISHLIST
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (bookId, thunkAPI) => {
    try {
      const response = await API.post("/wishlist", {
        bookId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to add wishlist"
      );
    }
  }
);

// REMOVE FROM WISHLIST
export const removeFromWishlist =
  createAsyncThunk(
    "wishlist/removeFromWishlist",
    async (bookId, thunkAPI) => {
      try {
        const response = await API.delete(
          `/wishlist/${bookId}`
        );

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to remove wishlist"
        );
      }
    }
  );

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: {
    books: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET WISHLIST
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getWishlist.fulfilled,
        (state, action) => {
          state.loading = false;
          state.books =
            action.payload.books || [];
        }
      )

      .addCase(
        getWishlist.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // ADD TO WISHLIST
      .addCase(
        addToWishlist.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        addToWishlist.fulfilled,
        (state, action) => {
          state.loading = false;
          // action.meta.arg is the bookId passed to dispatch(addToWishlist(bookId))
          const bookId = action.meta.arg;
          const alreadyThere = state.books.some(
            (book) => book._id === bookId
          );
          if (!alreadyThere) {
            // Partial entry (just _id) until the next getWishlist() refetch
            // populates full book details.
            state.books.push({ _id: bookId });
          }
        }
      )

      .addCase(
        addToWishlist.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // REMOVE FROM WISHLIST
      .addCase(
        removeFromWishlist.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        removeFromWishlist.fulfilled,
        (state, action) => {
          state.loading = false;

          state.books =
            state.books.filter(
              (book) =>
                book._id !==
                action.meta.arg
            );
        }
      )

      .addCase(
        removeFromWishlist.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default wishlistSlice.reducer;
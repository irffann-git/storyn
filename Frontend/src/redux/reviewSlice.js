import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// ─── Add Review ──────────────────────────────────────────────
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ bookId, rating, comment }, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`/books/${bookId}/reviews`, {
        rating,
        comment,
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        "Failed to submit review"
      );
    }
  }
);

// ─── Get Reviews ─────────────────────────────────────────────
export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async (bookId, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/books/${bookId}/reviews`);
      return data.reviews;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────
const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    submitLoading: false,
    error: null,
  },
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get reviews
    builder
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add review
    builder
      .addCase(addReview.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.submitLoading = false;
        // Prepend new review to list
        state.reviews.unshift(action.payload.review);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
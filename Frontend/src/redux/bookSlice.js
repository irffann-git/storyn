import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/books");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch books"
      );
    }
  }
);

export const getBookDetails = createAsyncThunk(
  "books/getBookDetails",
  async (id, thunkAPI) => {
    try {
      const response = await API.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch book"
      );
    }
  }
);

export const createBook = createAsyncThunk(
  "books/createBook",
  async (bookData, thunkAPI) => {
    try {
      const response = await API.post("/books", bookData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create book"
      );
    }
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, bookData }, thunkAPI) => {
    try {
      const response = await API.put(`/books/${id}`, bookData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update book"
      );
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/books/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete book"
      );
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    book: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL BOOKS
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books =
          action.payload.books ||
          action.payload.data ||
          action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET SINGLE BOOK
      .addCase(getBookDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.book =
          action.payload.book ||
          action.payload.data ||
          action.payload;
      })
      .addCase(getBookDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE BOOK
      .addCase(createBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.book) {
          state.books.unshift(action.payload.book);
        }
      })
      .addCase(createBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE BOOK
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.book) {
          state.books = state.books.map((book) =>
            book._id === action.payload.book._id
              ? action.payload.book
              : book
          );
          // update single book too if it's open
          if (state.book?._id === action.payload.book._id) {
            state.book = action.payload.book;
          }
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE BOOK
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter(
          (book) => book._id !== action.payload
        );
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
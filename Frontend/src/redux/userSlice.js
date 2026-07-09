import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import API from "../api/axios";

// GET ALL USERS

export const getUsers =
  createAsyncThunk(
    "users/getUsers",
    async (_, thunkAPI) => {
      try {
        const response =
          await API.get("/auth/users");

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch users"
        );
      }
    }
  );

// DELETE USER

export const deleteUser =
  createAsyncThunk(
    "users/deleteUser",
    async (id, thunkAPI) => {
      try {
        await API.delete(
          `/auth/users/${id}`
        );

        return id;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to delete user"
        );
      }
    }
  );

const userSlice = createSlice({
  name: "users",

  initialState: {
    users: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        getUsers.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        getUsers.fulfilled,
        (state, action) => {
          state.loading = false;
          state.users =
            action.payload.users;
        }
      )

      .addCase(
        getUsers.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      )

      .addCase(
        deleteUser.fulfilled,
        (state, action) => {
          state.users =
            state.users.filter(
              (user) =>
                user._id !==
                action.payload
            );
        }
      );
  },
});

export default userSlice.reducer;
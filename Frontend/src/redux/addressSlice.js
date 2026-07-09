import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// GET ADDRESSES
export const getAddresses = createAsyncThunk(
  "address/getAddresses",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/addresses");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch addresses"
      );
    }
  }
);

// ADD ADDRESS
export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData, thunkAPI) => {
    try {
      const response = await API.post(
        "/addresses",
        addressData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to add address"
      );
    }
  }
);

// UPDATE ADDRESS
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, addressData }, thunkAPI) => {
    try {
      const response = await API.put(
        `/addresses/${id}`,
        addressData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update address"
      );
    }
  }
);

// DELETE ADDRESS
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/addresses/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete address"
      );
    }
  }
);

// SET DEFAULT
export const setDefaultAddress =
  createAsyncThunk(
    "address/setDefaultAddress",
    async (id, thunkAPI) => {
      try {
        const response = await API.put(
          `/addresses/${id}/default`
        );

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to set default address"
        );
      }
    }
  );

const addressSlice = createSlice({
  name: "address",

  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAddresses.fulfilled,
        (state, action) => {
          state.loading = false;
          state.addresses =
            action.payload.addresses || [];
        }
      )
      .addCase(
        getAddresses.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // ADD
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAddress.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        addAddress.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // UPDATE
      .addCase(
        updateAddress.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        updateAddress.fulfilled,
        (state) => {
          state.loading = false;
        }
      )
      .addCase(
        updateAddress.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // DELETE
      .addCase(
        deleteAddress.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        deleteAddress.fulfilled,
        (state, action) => {
          state.loading = false;

          state.addresses =
            state.addresses.filter(
              (address) =>
                address._id !== action.payload
            );
        }
      )
      .addCase(
        deleteAddress.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // DEFAULT
      .addCase(
        setDefaultAddress.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        setDefaultAddress.fulfilled,
        (state) => {
          state.loading = false;
        }
      )
      .addCase(
        setDefaultAddress.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default addressSlice.reducer;
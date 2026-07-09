import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import API from "../api/axios";

// CREATE ORDER
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (addressId, thunkAPI) => {
    try {
      const response = await API.post(
        "/orders",
        { addressId }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to create order"
      );
    }
  }
);

// GET MY ORDERS
export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, thunkAPI) => {
    try {
      const response = await API.get(
        "/orders/my-orders"
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch orders"
      );
    }
  }
);

// GET SINGLE ORDER
export const getOrderById =
  createAsyncThunk(
    "order/getOrderById",
    async (id, thunkAPI) => {
      try {
        const response = await API.get(
          `/orders/${id}`
        );

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch order"
        );
      }
    }
  );

// MARK ORDER PAID
export const markOrderPaid =
  createAsyncThunk(
    "order/markOrderPaid",
    async (id, thunkAPI) => {
      try {
        const response = await API.put(
          `/orders/${id}/pay`
        );

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Payment Failed"
        );
      }
    }
  );

// ADMIN - GET ALL ORDERS
export const getAllOrders =
  createAsyncThunk(
    "order/getAllOrders",
    async (_, thunkAPI) => {
      try {
        const response =
          await API.get("/orders");

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch orders"
        );
      }
    }
  );

// ADMIN - UPDATE ORDER STATUS
export const updateOrderStatus =
  createAsyncThunk(
    "order/updateOrderStatus",
    async (
      { id, status },
      thunkAPI
    ) => {
      try {
        const response = await API.put(
          `/orders/${id}/status`,
          { status }
        );

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to update status"
        );
      }
    }
  );

const orderSlice = createSlice({
  name: "order",

  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // CREATE ORDER
      .addCase(
        createOrder.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        createOrder.fulfilled,
        (state, action) => {
          state.loading = false;
          state.order =
            action.payload.order;
        }
      )

      .addCase(
        createOrder.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // GET MY ORDERS
      .addCase(
        getMyOrders.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getMyOrders.fulfilled,
        (state, action) => {
          state.loading = false;
          state.orders =
            action.payload.orders;
        }
      )

      .addCase(
        getMyOrders.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // GET ORDER BY ID
      .addCase(
        getOrderById.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getOrderById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.order =
            action.payload.order;
        }
      )

      .addCase(
        getOrderById.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // MARK ORDER PAID
      .addCase(
        markOrderPaid.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        markOrderPaid.fulfilled,
        (state, action) => {
          state.loading = false;
          state.order =
            action.payload.order;
        }
      )

      .addCase(
        markOrderPaid.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // GET ALL ORDERS
      .addCase(
        getAllOrders.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getAllOrders.fulfilled,
        (state, action) => {
          state.loading = false;
          state.orders =
            action.payload.orders;
        }
      )

      .addCase(
        getAllOrders.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // UPDATE ORDER STATUS
      .addCase(
        updateOrderStatus.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        updateOrderStatus.fulfilled,
        (state, action) => {
          state.loading = false;

          const updatedOrder = action.payload.order;

state.orders = state.orders.map((order) =>
  order._id === updatedOrder._id
    ? updatedOrder
    : order
);
        }
      )

      .addCase(
        updateOrderStatus.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default orderSlice.reducer;
import {
createSlice,
createAsyncThunk,
} from "@reduxjs/toolkit";

import API from "../api/axios";

// ORDER STATS
export const getOrderStats =
createAsyncThunk(
"dashboard/getOrderStats",
async (_, thunkAPI) => {
try {
const response = await API.get(
"/orders/stats"
);


    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        "Failed to fetch stats"
    );
  }
}


);

// REVENUE ANALYTICS
export const getRevenueAnalytics =
createAsyncThunk(
"dashboard/getRevenueAnalytics",
async (_, thunkAPI) => {
try {
const response = await API.get(
"/orders/analytics/revenue"
);


    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        "Failed to fetch revenue"
    );
  }
}


);

// RECENT ORDERS
export const getRecentOrders =
createAsyncThunk(
"dashboard/getRecentOrders",
async (_, thunkAPI) => {
try {
const response = await API.get(
"/orders/recent"
);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        "Failed to fetch recent orders"
    );
  }
}


);

// MONTHLY SALES REPORT
export const getMonthlySalesReport =
createAsyncThunk(
"dashboard/getMonthlySalesReport",
async (_, thunkAPI) => {
try {
const response = await API.get(
"/orders/analytics/monthly-sales"
);


    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        "Failed to fetch monthly sales"
    );
  }
}


);

const dashboardSlice = createSlice({
name: "dashboard",

initialState: {
stats: {},
revenue: {},
recentOrders: [],
monthlySales: [],
loading: false,
error: null,
},

reducers: {},

extraReducers: (builder) => {
builder

  // ORDER STATS
  .addCase(
    getOrderStats.pending,
    (state) => {
      state.loading = true;
      state.error = null;
    }
  )

  .addCase(
    getOrderStats.fulfilled,
    (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    }
  )

  .addCase(
    getOrderStats.rejected,
    (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  )

  // REVENUE
  .addCase(
    getRevenueAnalytics.pending,
    (state) => {
      state.loading = true;
    }
  )

  .addCase(
    getRevenueAnalytics.fulfilled,
    (state, action) => {
      state.loading = false;
      state.revenue = action.payload;
    }
  )

  .addCase(
    getRevenueAnalytics.rejected,
    (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  )

  // RECENT ORDERS
  .addCase(
    getRecentOrders.pending,
    (state) => {
      state.loading = true;
    }
  )

  .addCase(
    getRecentOrders.fulfilled,
    (state, action) => {
      state.loading = false;
      state.recentOrders =
        action.payload.recentOrders;
    }
  )

  .addCase(
    getRecentOrders.rejected,
    (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  )

  // MONTHLY SALES
  .addCase(
    getMonthlySalesReport.pending,
    (state) => {
      state.loading = true;
    }
  )

  .addCase(
    getMonthlySalesReport.fulfilled,
    (state, action) => {
      state.loading = false;
      state.monthlySales =
        action.payload.salesReport ||
        [];
    }
  )

  .addCase(
    getMonthlySalesReport.rejected,
    (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  );


},
});

export default dashboardSlice.reducer;

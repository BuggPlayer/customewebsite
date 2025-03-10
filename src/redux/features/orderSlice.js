import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../utils/apiList";

export const place_order = createAsyncThunk(
  "order/place_order",
  async (
    { price, products, shipping_fee, shippingInfo, userId, navigate, items ,paymentMethod},
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`${base_URL}/api/home/order/palce-order`, {
        price,
        products,
        shipping_fee,
        shippingInfo,
        userId,
        navigate,
        items,
        paymentMethod
      });
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Order placement failed");
    }
  }
);

export const get_orders = createAsyncThunk(
  "order/get_orders",
  async ({ customerId, status }, { rejectWithValue }) => {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_URL}/api/home/customer/gat-orders/${customerId}/${status}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
  }
);

export const get_order = createAsyncThunk(
  "order/get_order",
  async (orderId, { rejectWithValue }) => {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_URL}/api/home/customer/gat-order/${orderId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch order details");
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    myOrder: {},
    isLoading: false,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Place Order
      .addCase(place_order.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(place_order.fulfilled, (state) => {
        state.isLoading = false;
        state.successMessage = "Order placed successfully";
      })
      .addCase(place_order.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload;
      })

      // Get Orders
      .addCase(get_orders.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(get_orders.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.myOrders = payload.orders;
      })
      .addCase(get_orders.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload;
      })

      // Get Order
      .addCase(get_order.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(get_order.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.myOrder = payload.order;
      })
      .addCase(get_order.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload;
      });
  },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import api from "../../api/api";
// import axios from "axios";
// import { base_URL } from "../../utils/apiList";

// export const place_order = createAsyncThunk(
//   "order/place_order",
//   async ({
//     price,
//     products,
//     shipping_fee,
//     shippingInfo,
//     userId,
//     navigate,
//     items,
//   }) => {
    
//     try {
//       const { data } = await axios.post(`${base_URL}/api/home/order/palce-order`, {
//         price,
//         products,
//         shipping_fee,
//         shippingInfo,
//         userId,
//         navigate,
//         items,
//       });
      
//       // navigate("/payment", {
//       //   state: {
//       //     price: price + shipping_fee,
//       //     items,
//       //     orderId: data.orderId,
//       //   },
//       // });
//       // console.log("payment---" , data);
//       return true;
//     } catch (error) {
//       console.log(error.response);
//     }
//   }
// );

// export const get_orders = createAsyncThunk(
//   "order/get_orders",
//   async (
//     { customerId, status },
//     { rejectWithValue, fulfillWithValue, getState }
//   ) => {
//     const userInfo = JSON.parse(localStorage.getItem("user-info"));

//     // const { token } = getState().auth;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };
//     try {
//       const { data } = await axios.get(
//         `${base_URL}/api/home/customer/gat-orders/${customerId}/${status}`, config
//       );
//       return fulfillWithValue(data);
//     } catch (error) {
//       console.log(error.response);
//     }
//   }
// );

// export const get_order = createAsyncThunk(
//   "order/get_order",
//   async (orderId, { rejectWithValue, fulfillWithValue, getState }) => {
//     const userInfo = JSON.parse(localStorage.getItem("user-info"));

//     // const { token } = getState().auth;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };
//     try {
//       const { data } = await axios.get(
//         `${base_URL}/api/home/customer/gat-order/${orderId}`,
//         config
//       );
//       return fulfillWithValue(data);
//     } catch (error) {
//       console.log(error.response);
//     }
//   }
// );

// export const orderReducer = createSlice({
//   name: "order",
//   initialState: {
//     myOrders: [],
//     errorMessage: "",
//     successMessage: "",
//     myOrder: {},
//   },
//   reducers: {
//     messageClear: (state, _) => {
//       state.errorMessage = "";
//       state.successMessage = "";
//     },
//   },
//   extraReducers: {
//     [get_orders.fulfilled]: (state, { payload }) => {
//       state.myOrders = payload.orders;
//     },
//     [get_order.fulfilled]: (state, { payload }) => {
//       state.myOrder = payload.order;
//     },
//   },
// });

// export const { messageClear } = orderReducer.actions;
// export default orderReducer.reducer;
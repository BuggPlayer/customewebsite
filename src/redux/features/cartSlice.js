import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../utils/apiList";

export const add_to_card = createAsyncThunk(
  "card/add_to_card",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_URL}/api/home/product/add-to-card`,
        info,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: "An error occurred" });
    }
  }
);

export const get_card_products = createAsyncThunk(
  "card/get_card_products",
  async (userId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_URL}/api/home/product/get-card-product/${userId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: "An error occurred" });
    }
  }
);

export const delete_card_product = createAsyncThunk(
  "card/delete_card_product",
  async (card_id, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${base_URL}/api/home/product/delete-card-product/${card_id}`,
        config
      );
      return fulfillWithValue({ ...data, card_id });
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: "An error occurred" });
    }
  }
);

export const quantity_inc = createAsyncThunk(
  "card/quantity_inc",
  async (card_id, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${base_URL}/api/home/product/quantity-inc/${card_id}`,
        {},
        config
      );
      return fulfillWithValue({ ...data, card_id });
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: "An error occurred" });
    }
  }
);

export const quantity_dec = createAsyncThunk(
  "card/quantity_dec",
  async (card_id, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${base_URL}/api/home/product/quantity-dec/${card_id}`,
        {},
        config
      );
      return fulfillWithValue({ ...data, card_id });
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: "An error occurred" });
    }
  }
);

export const cardReducer = createSlice({
  name: "card",
  initialState: {
    card_products: [],
    card_product_count: 0,
    buy_product_item: 0,
    wishlist_count: 0,
    wishlist: [],
    price: 0,
    errorMessage: "",
    successMessage: "",
    shipping_fee: 0,
    outofstock_products: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    reset_count: (state, _) => {
      state.card_product_count = 0;
      state.wishlist_count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_to_card.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
      })
      .addCase(add_to_card.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.card_product_count += 1;
      })
      .addCase(get_card_products.fulfilled, (state, { payload }) => {
        state.card_products = payload.card_products;
        state.price = payload.price;
        state.card_product_count = payload.card_product_count;
        state.shipping_fee = payload.shipping_fee;
        state.outofstock_products = payload.outOfStockProduct;
        state.buy_product_item = payload.buy_product_item;
      })
      .addCase(delete_card_product.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.card_products = state.card_products.filter(
          (product) => product._id !== payload.card_id
        );
        state.card_product_count -= 1;
      })
      .addCase(quantity_inc.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        const product = state.card_products.find(
          (p) => p._id === payload.card_id
        );
        if (product) {
          product.quantity += 1;
        }
      })
      .addCase(quantity_dec.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        const product = state.card_products.find(
          (p) => p._id === payload.card_id
        );
        if (product && product.quantity > 1) {
          product.quantity -= 1;
        }
      });
  },
});

export const { messageClear, reset_count } = cardReducer.actions;
export default cardReducer.reducer;
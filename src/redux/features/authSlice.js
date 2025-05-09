import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt from "jwt-decode";

import axios from "axios";
import { base_URL } from "../../utils/apiList";
export const customer_register = createAsyncThunk(
  "auth/customer_register",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("config", config, base_URL);
    try {
      const { data } = await axios.post(
        `${base_URL}/api/customer/customer-register`,
        info,
        config
      );
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const customer_login = createAsyncThunk(
  "auth/customer_login",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_URL}/api/customer/customer-login`,
        info,
        config
      );
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const decodeToken = (token) => {
  if (token) {
    const userInfo = jwt(token);
    const expireTime = new Date(userInfo.exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem("customerToken");
      return "";
    } else {
      return userInfo;
    }
  } else {
    return "";
  }
};

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    userInfo: decodeToken(localStorage.getItem("customerToken")),
    errorMessage: "",
    successMessage: "",
    token: localStorage.getItem("customerToken"),
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    user_reset: (state, _) => {
      state.userInfo = "";
    },
  },
  extraReducers: {
    [customer_register.pending]: (state, ) => {
      state.loader = true;
    },
    [customer_register.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
      state.loader = false;
    },
    [customer_register.fulfilled]: (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.loader = false;
      state.userInfo = userInfo;
      state.token = payload.token; 
    },
    [customer_login.pending]: (state, ) => {
      state.loader = true;
    },
    [customer_login.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
      state.loader = false;
    },
    [customer_login.fulfilled]: (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.loader = false;
      state.userInfo = userInfo;
      state.token = payload.token; 
    },
  },
});

export const { messageClear, user_reset } = authReducer.actions;
export default authReducer.reducer;
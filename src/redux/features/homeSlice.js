
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {base_URL} from "../../utils/apiList"

// Async Thunk for fetching products
export const get_products = createAsyncThunk(
  "product/get_products",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${base_URL}/api/home/get-products`);
      // console.log("data" , data)
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data); // Pass error response data
    }
  }
);

// Async Thunk for fetching a single product by slug
export const get_product = createAsyncThunk(
  "product/get_product",
  async (slug, { fulfillWithValue, rejectWithValue, getState }) => {
    // const { token } = getState().auth;
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    try {
      const { data } = await axios.get(
        `${base_URL}/api/home/get-product/${slug}`,
        // config
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data); // Pass error response data
    }
  }
);

// Async Thunk for fetching banners
export const get_banners = createAsyncThunk(
  "product/get_banners",
  async (_, { fulfillWithValue, rejectWithValue, getState }) => {
    // const { token } = getState().auth;
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    try {
      const { data } = await axios.get(`${base_URL}/api/banners`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data); // Pass error response data
    }
  }
);

// Slice definition
export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categorys: [],
    products: [],
    totalProduct: 0,
    parPage: 4,
    latest_product: [],
    topRated_product: [],
    discount_product: [],
    priceRange: {
      low: 0,
      high: 100,
    },
    product: {},
    relatedProducts: [],
    moreProducts: [],
    successMessage: "",
    errorMessage: "",
    totalReview: 0,
    rating_review: [],
    reviews: [],
    banners: [],
    loading: false, // Added loading state
    error: null,    // Added error state
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle get_products
      .addCase(get_products.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(get_products.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload.products;
        state.latest_product = payload.latest_product;
        state.topRated_product = payload.topRated_product;
        state.discount_product = payload.discount_product;
      })
      .addCase(get_products.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Failed to fetch products"; // Set error message
      })

      // Handle get_product
      .addCase(get_product.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(get_product.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.product = payload.product;
        state.relatedProducts = payload.relatedProducts;
        state.moreProducts = payload.moreProducts;
      })
      .addCase(get_product.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Failed to fetch product details"; // Set error message
      })

      // Handle get_banners
      .addCase(get_banners.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(get_banners.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.banners = payload.banners;
      })
      .addCase(get_banners.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Failed to fetch banners"; // Set error message
      });
  },
});

export const { messageClear } = homeReducer.actions;
export default homeReducer.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import axios from "axios";
// import { base_URL } from "../../utils/apiList";


// // export const get_category = createAsyncThunk(
// //   "product/get_category",
// //   async (_, { fulfillWithValue, rejectWithValue, getState }) => {
// //     const { token } = getState().auth;
// //     const config = {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     };

// //     try {
// //       const { data } = await axios.get(
// //         `${base_URL}/api/home/get-categorys`,
// //         config
// //       );
// //       return fulfillWithValue(data);
// //     } catch (error) {
// //       console.log(error);
// //       return rejectWithValue(error);
// //     }
// //   }
// // );

// export const get_products = createAsyncThunk(
//   "product/get_products",
//   async (_, { fulfillWithValue, rejectWithValue, getState }) => {
//     // const { token } = getState().auth;
//     // const config = {
//     //   headers: {
//     //     Authorization: `Bearer ${token}`,
//     //   },
//     // };
//     try {
//       const { data } = await axios.get(
//         `${base_URL}/api/home/get-products`,
//         // config
//       );

//       return fulfillWithValue(data);
//     } catch (error) {
//       console.log(error.response);
//       return rejectWithValue(error);
//     }
//   }
// );

// export const get_product = createAsyncThunk(
//   "product/get_product",
//   async (slug, { fulfillWithValue, rejectWithValue, getState }) => {
//     const { token } = getState().auth;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     try {
//       const { data } = await axios.get(
//         `${base_URL}/api/home/get-product/${slug}`,
//         config
//       );
//       console.log(data);
//       return fulfillWithValue(data);
//     } catch (error) {
//       console.log(error.response);
//       return rejectWithValue(error);
//     }
//   }
// );

// // export const price_range_product = createAsyncThunk(
// //   "product/price_range_product",
// //   async (_, { fulfillWithValue, rejectWithValue, getState }) => {
// //     const { token } = getState().auth;
// //     const config = {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     };
// //     try {
// //       const { data } = await axios.get(
// //         `${base_URL}/api/home/price-range-latest-product`,
// //         config
// //       );
// //       return fulfillWithValue(data);
// //     } catch (error) {
// //       console.log(error.response);
// //       return rejectWithValue(error);
// //     }
// //   }
// // );

// export const get_banners = createAsyncThunk(
//   "product/get_banners",
//   async (_, { fulfillWithValue, rejectWithValue, getState }) => {
//     const { token } = getState().auth;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     try {
//       const { data } = await axios.get(`${base_URL}/api/banners`, config);
//       return fulfillWithValue(data);
//     } catch (error) {
//       console.log(error.response);
//       return rejectWithValue(error);
//     }
//   }
// );

// // export const query_products = createAsyncThunk(
// //   "product/query_products",
// //   async (query, { fulfillWithValue, rejectWithValue, getState }) => {
// //     const { token } = getState().auth;
// //     const config = {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     };
// //     try {
// //       const { data } = await axios.get(
// //         `${base_URL}/api/home/query-products?category=${
// //           query.category
// //         }&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${
// //           query.high
// //         }&&sortPrice=${query.sortPrice}&&pageNumber=${
// //           query.pageNumber
// //         }&&searchValue=${query.searchValue ? query.searchValue : ""}`,
// //         config
// //       );
// //       return fulfillWithValue(data);
// //     } catch (error) {
// //       console.log(error.response);
// //       return rejectWithValue(error);
// //     }
// //   }
// // );

// // export const customer_review = createAsyncThunk(
// //   "review/customer_review",
// //   async (info, { fulfillWithValue, rejectWithValue, getState }) => {
// //     const { token } = getState().auth;
// //     const config = {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     };
// //     try {
// //       const { data } = await axios.post(
// //         `${base_URL}/api/home/customer/submit-review`,
// //         info,
// //         config
// //       );
// //       return fulfillWithValue(data);
// //     } catch (error) {
// //       return rejectWithValue(error);
// //     }
// //   }
// // );

// // export const get_reviews = createAsyncThunk(
// //   "review/get_reviews",
// //   async (
// //     { productId, pageNumber },
// //     { fulfillWithValue, rejectWithValue, getState }
// //   ) => {
// //     const { token } = getState().auth;
// //     const config = {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     };
// //     try {
// //       const { data } = await axios.get(
// //         `${base_URL}/api/home/customer/get-reviews/${productId}?pageNo=${pageNumber}`,
// //         config
// //       );
// //       console.log(data);
// //       return fulfillWithValue(data);
// //     } catch (error) {
// //       return rejectWithValue(error);
// //     }
// //   }
// // );

// export const homeReducer = createSlice({
//   name: "home",
//   initialState: {
//     categorys: [],
//     products: [],
//     totalProduct: 0,
//     parPage: 4,
//     latest_product: [],
//     topRated_product: [],
//     discount_product: [],
//     priceRange: {
//       low: 0,
//       high: 100,
//     },
//     product: {},
//     relatedProducts: [],
//     moreProducts: [],
//     successMessage: "",
//     errorMessage: "",
//     totalReview: 0,
//     rating_review: [],
//     reviews: [],
//     banners: [],
//   },
//   reducers: {
//     messageClear: (state, _) => {
//       state.successMessage = "";
//       state.errorMessage = "";
//     },
//   },
//   extraReducers: {
//     // [get_category.fulfilled]: (state, { payload }) => {
//     //   state.categorys = payload.categorys;
//     // },
//     [get_products.fulfilled]: (state, { payload }) => {
//       state.products = payload.products;
//       state.latest_product = payload.latest_product;
//       state.topRated_product = payload.topRated_product;
//       state.discount_product = payload.discount_product;
//     },
//     [get_product.fulfilled]: (state, { payload }) => {
//       state.product = payload.product;
//       state.relatedProducts = payload.relatedProducts;
//       state.moreProducts = payload.moreProducts;
//     },
//     // [price_range_product.fulfilled]: (state, { payload }) => {
//     //   state.latest_product = payload.latest_product;
//     //   state.priceRange = payload.priceRange;
//     // },
//     // [query_products.fulfilled]: (state, { payload }) => {
//     //   state.products = payload.products;
//     //   state.totalProduct = payload.totalProduct;
//     //   state.parPage = payload.parPage;
//     // },
//     // [customer_review.fulfilled]: (state, { payload }) => {
//     //   state.successMessage = payload.message;
//     // },
//     // [get_reviews.fulfilled]: (state, { payload }) => {
//     //   state.reviews = payload.reviews;
//     //   state.totalReview = payload.totalReview;
//     //   state.rating_review = payload.rating_review;
//     // },
//     [get_banners.fulfilled]: (state, { payload }) => {
//       state.banners = payload.banners;
//     },
//   },
// });
// export const { messageClear } = homeReducer.actions;
// export default homeReducer.reducer;


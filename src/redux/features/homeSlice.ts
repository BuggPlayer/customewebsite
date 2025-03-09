import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api';

interface HomeState {
  featuredProducts: any[];
  newArrivals: any[];
  bestSellers: any[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  featuredProducts: [],
  newArrivals: [],
  bestSellers: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
});

export default homeSlice.reducer;

// Home API endpoints
export const homeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedProducts: builder.query({
      query: () => '/products/featured',
      providesTags: ['Product'],
    }),
    getNewArrivals: builder.query({
      query: () => '/products/new-arrivals',
      providesTags: ['Product'],
    }),
    getBestSellers: builder.query({
      query: () => '/products/best-sellers',
      providesTags: ['Product'],
    }),
    getHomeData: builder.query({
      query: () => '/home',
      providesTags: ['Product'],
    }),
  }),
});

export const {
  useGetFeaturedProductsQuery,
  useGetNewArrivalsQuery,
  useGetBestSellersQuery,
  useGetHomeDataQuery,
} = homeApi; 
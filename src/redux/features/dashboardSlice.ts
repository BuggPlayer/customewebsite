import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api';

interface DashboardState {
  stats: {
    totalOrders: number;
    totalSpent: number;
    wishlistItems: number;
  };
  recentOrders: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: {
    totalOrders: 0,
    totalSpent: 0,
    wishlistItems: 0,
  },
  recentOrders: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
});

export default dashboardSlice.reducer;

// Dashboard API endpoints
export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => '/dashboard/stats',
      providesTags: ['User', 'Order'],
    }),
    getRecentOrders: builder.query({
      query: () => '/dashboard/recent-orders',
      providesTags: ['Order'],
    }),
    getDashboardData: builder.query({
      query: () => '/dashboard',
      providesTags: ['User', 'Order', 'Wishlist'],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetRecentOrdersQuery,
  useGetDashboardDataQuery,
} = dashboardApi; 
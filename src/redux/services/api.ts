// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const api = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://nodejs-backend-red.vercel.app',
//     prepareHeaders: (headers, { getState }) => {
//       // Get token from auth state
//       const token = (getState() as any).auth.token;
//       if (token) {
//         headers.set('authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: () => ({}),
//   tagTypes: ['User', 'Product', 'Cart', 'Order', 'Wishlist'],
// }); 
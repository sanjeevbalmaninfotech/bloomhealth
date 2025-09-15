import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { showToast } from '../utils/toast';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const auth = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['User'], // recommended when using tags
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          showToast.success('Login successful!');
          sessionStorage.setItem('token', data?.token);
        } catch (err) {
          showToast.error(err?.error?.data?.message || 'Login failed!');
        }
      },
    }),

    register: builder.mutation({
      query: (user) => ({
        url: '/register',
        method: 'POST',
        body: user,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          showToast.success('User registered successfully!');
        } catch (err) {
          showToast.error(err?.error?.data?.message || 'Registration failed!');
        }
      },
      invalidatesTags: ['User'],
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/forgot-password',
        method: 'POST',
        body: { email }, // ✅ backend usually expects object
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          showToast.success('Password reset email sent successfully!');
        } catch (err) {
          showToast.error(err?.error?.data?.message || 'Password reset failed!');
        }
      },
    }),

    resetPassword: builder.mutation({
      query: (payload) => ({
        url: '/reset-password',
        method: 'POST',
        body: payload, // { token, password }
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          showToast.success('Password reset successfully!');
        } catch (err) {
          showToast.error(err?.error?.data?.message || 'Password reset failed!');
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = auth;

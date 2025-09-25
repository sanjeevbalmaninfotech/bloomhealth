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

    // Request SMS OTP to be sent to phone number
    requestOtp: builder.mutation({
      query: (payload) => ({
        url: '/auth/request-otp',
        method: 'POST',
        body: payload, // { countryCode, phoneNumber }
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          showToast.success('OTP sent to your mobile number');
        } catch (err) {
          showToast.error(err?.error?.data?.message || 'Failed to send OTP');
        }
      },
    }),

    // Verify OTP and login
    verifyOtp: builder.mutation({
      query: (payload) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: payload, // { countryCode, phoneNumber, otp }
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          showToast.success('Login successful!');
          sessionStorage.setItem('token', data?.token);
        } catch (err) {
          showToast.error(err?.error?.data?.message || 'OTP verification failed!');
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
  useRequestOtpMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = auth;

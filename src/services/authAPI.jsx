import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { showToast } from '../utils/toast';

import { env } from '../config/env.config';
import { Endpoints } from '../utils/constents/endPoints/endPoints';

const baseUrl = env.VITE_BLOOM_API_BASE_URL;

export const auth = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['User'],
  endpoints: (builder) => ({

  
    lookupUser: builder.mutation({
      query: (payload) => ({
        url: Endpoints.loginUrl, 
        method: 'POST',
        body: { patientId: payload.patientId }, 
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          // no toast here; handled by caller
        } catch (err) {
          showToast.error(err?.error?.data?.message || 'Patient lookup failed');
        }
      },
    }),

    // Request SMS OTP to be sent to phone number
    requestOtp: builder.mutation({
      query: (payload) => ({
        url: Endpoints.sendOtpUrl,  
        method: 'POST',
        body: {
          patientId: payload.patientId,      
          mobileNumber: payload.mobileNumber, 
          countryCode: payload.countryCode
        },
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
        url: '/patient/verifyOtp',  // ✅ Updated endpoint
        method: 'POST',
        body: {
          patientId: payload.patientId,           // ✅ Added patientId
          otp: payload.otp,
          phoneCountryCode: payload.phoneCountryCode, // ✅ Changed from countryCode
          phoneNumber: payload.phoneNumber
        },
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
        body: { email },
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
  useLookupUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = auth;
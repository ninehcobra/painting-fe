import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7221/" }),
  endpoints: (builder) => ({
    login: builder.mutation<any, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/api/v1/Auth/sign-in",
        method: "POST",
        params: { email, password },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;

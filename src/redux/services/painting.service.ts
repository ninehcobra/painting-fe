import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { create } from "domain";

export const paintingApi = createApi({
  reducerPath: "paintingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7221/",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${localStorage.getItem("accessToken")}`
      );
      return headers;
    },
  }),
  tagTypes: ["Painting"],
  endpoints: (builder) => ({
    getAllPaintingColors: builder.query<any, void>({
      query: () => "/odata/WatercolorsPainting",
      providesTags: ["Painting"],
    }),
    deletePainting: builder.mutation<any, string>({
      query: (id) => ({
        url: `/odata/WatercolorsPainting/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Painting"],
    }),
    getCountPaintingColors: builder.query<any, void>({
      query: () => "/odata/WatercolorsPainting/$count",
      providesTags: ["Painting"],
    }),
    createPainting: builder.mutation<any, any>({
      query: (painting) => ({
        url: "/odata/WatercolorsPainting",
        method: "POST",
        body: painting,
      }),
      invalidatesTags: ["Painting"],
    }),
  }),
});

export const {
  useGetAllPaintingColorsQuery,
  useDeletePaintingMutation,
  useGetCountPaintingColorsQuery,
  useCreatePaintingMutation,
} = paintingApi;

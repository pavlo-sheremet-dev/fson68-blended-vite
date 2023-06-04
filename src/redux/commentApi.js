import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_ENDPOINT = "/comments";
const BASE_URL = "https://6393b5f2ab513e12c514f63c.mockapi.io/api/";

export const commentApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => ({ url: API_ENDPOINT }),
      providesTags: ["Comments"],
    }),
    addNewComment: builder.mutation({
      query: (initialComment) => ({
        url: API_ENDPOINT,
        method: "POST",
        body: initialComment,
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const { useGetCommentsQuery, useAddNewCommentMutation } = commentApi;

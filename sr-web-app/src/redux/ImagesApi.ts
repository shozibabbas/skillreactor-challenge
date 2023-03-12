import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ImageFile } from '../types/ImageFile';
import { DataAPIResponse } from '../types/DataAPIResponse';

// Define a service using a base URL and expected endpoints
export const imagesApi = createApi({
  reducerPath: 'imagesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  tagTypes: ['images'],
  endpoints: (builder) => ({
    getImages: builder.query<DataAPIResponse<ImageFile>, object>({
      query: (params) => ({ url: 'images', method: 'GET', params }),
      providesTags: ['images'],
    }),
    uploadImages: builder.mutation<ImageFile[], File[]>({
      query: (files: any) => {
        const formData = new FormData();
        files.forEach((f: File) => {
          formData.append('images', f);
        });
        return {
          url: 'images',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['images'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetImagesQuery,
  useUploadImagesMutation,
} = imagesApi;
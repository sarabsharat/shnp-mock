import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchClient } from "../../utilities/FetchClient.ts";
import { prepareUpdatePayload } from "../../utilities/UpdateDocuments/UpdateDocuments.ts";

const customBaseQuery = async ({ url, method, body, params }: any) => {
    try {
        const result = await fetchClient(url, { method, body, params });
        return { data: result };
    } catch (error: any) {
        return {
            error: {
                status: error.status || 'CUSTOM_ERROR',
                data: error.data || error.message,
            },
        };
    }
};

export const RestaurantApi = createApi({
    reducerPath: "RestaurantApi",
    baseQuery: customBaseQuery,
    tagTypes: ['Restaurant'],
    endpoints: (builder) => ({
        getRestaurantInfo: builder.query<any, void>({
            query: () => ({
                url: 'restaurants/me',
                method: 'GET'
            }),
            providesTags: ['Restaurant'],
        }),

        updateRestaurant: builder.mutation<any, { id: string; payload: any }>({
            query: ({ id, payload }) => {

                const { id: _, ...rawData } = payload;

                const cleanPayload = prepareUpdatePayload(rawData);

                return {
                    url: `restaurants/${id}/update`,
                    method: 'POST',
                    params: { locale: 'en' },
                    body: cleanPayload,
                };
            },
            invalidatesTags: ['Restaurant'],
        }),

        uploadBlob: builder.mutation<string, { base: string; name: string }>({
            query: (payload) => ({
                url: "blobs/upload",
                method: "POST",
                body: payload,
            }),
            transformResponse: (response: any) => response.result || response.url || response,
        }),
    }),
});

export const {
    useGetRestaurantInfoQuery,
    useUpdateRestaurantMutation,
    useUploadBlobMutation,
} = RestaurantApi;
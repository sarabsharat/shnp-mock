import { createApi} from "@reduxjs/toolkit/query/react";
import type { EmployeePayload } from "../../Models/EmployeesInterface.ts";
import {fetchClient} from "../../utilities/FetchClient.ts";

const customBaseQuery = async ({ url, method, body, params }: any) => {
    try {

        const result = await fetchClient(url, {
            method,
            body,
            params,
        });
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


export const EmployeesApi = createApi({
    reducerPath: "EmployeesApi",
    baseQuery: customBaseQuery,
    tagTypes: ['Employees'],
    endpoints: (builder) => ({
        getEmployeeAccount: builder.query<EmployeePayload, void>({
            query: () => ({
                url: 'restaurantEmployees/me',
                method: "GET"
            }),
        }),

        searchRestaurantEmployee: builder.query<any, any>({
            query: (params) => ({
                url: 'restaurantEmployees',
                method: "GET",
                params: params,
            }),
            providesTags: ['Employees'],
        }),

        inviteEmployee: builder.mutation<any, EmployeePayload>({
            query: (payload) => ({
                url: 'restaurantEmployees/inviteRestaurantEmployee',
                method: 'POST',
                params: { locale: 'en' },
                body: {
                    ...payload,
                    dateOfBirth: payload.dateOfBirth || "",
                }
            }),
        }),


        updateEmployee: builder.mutation<any, EmployeePayload>({
            query: (payload) => {
                const { id, ...updateFields } = payload;
                return {
                    url: `restaurantEmployees/${id}/update`,
                    method: 'POST',
                    params: { locale: 'en' },
                    body: updateFields
                };
            },
            invalidatesTags: ['Employees'],
        }),
    })
});

export const {
    useGetEmployeeAccountQuery,
    useLazySearchRestaurantEmployeeQuery,
    useSearchRestaurantEmployeeQuery,
    useInviteEmployeeMutation,
    useUpdateEmployeeMutation
} = EmployeesApi;
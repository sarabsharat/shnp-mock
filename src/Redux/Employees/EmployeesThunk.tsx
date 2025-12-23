import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchClient } from "../../utilities/FetchClient.ts";
import type {
    FetchEmployeesPayload,
    EmployeePayload
} from "../../Models/EmployeesInterface.ts";

export const fetchEmployees = createAsyncThunk(
    "Employees/fetchEmployees",
    async (payload: FetchEmployeesPayload, { rejectWithValue }) => {
        try {
            const data = await fetchClient("restaurantEmployees", { params: payload });

            return {
                employees: data.matches || [],
                total: data.total || 0,
            };
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const inviteEmployee = createAsyncThunk(
    "Employees/inviteEmployee",
    async (payload: EmployeePayload, { rejectWithValue }) => {
        try {
            const body = {
                ...payload,
                dateOfBirth: payload.dateOfBirth || "",
            };

            return await fetchClient("restaurantEmployees/inviteRestaurantEmployee", {
                params: { locale: 'en' },
                body
            });
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const updateEmployee = createAsyncThunk(
    "Employees/updateEmployee",
    async (payload: EmployeePayload, { rejectWithValue }) => {
        try {
            const { id, ...updateFields } = payload;

            return await fetchClient(`restaurantEmployees/${id}/update`, {
                params: { locale: 'en' },
                body: updateFields
            });
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);
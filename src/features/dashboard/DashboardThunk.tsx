import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../server";

export const fetchDashboardCounts = createAsyncThunk(
    "dashboard/fetchCounts",
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem("jwtToken");
            if (!token) return thunkAPI.rejectWithValue("No token found");

            const res = await fetch(`${BASE_URL}dashboard/restaurantCounts?locale=en`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                return thunkAPI.rejectWithValue(errorData?.message || "Failed to fetch dashboard data");
            }

            const data = await res.json();
            return data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

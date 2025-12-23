import { createAsyncThunk } from "@reduxjs/toolkit";
import {fetchClient} from "../../utilities/FetchClient.ts";

export const fetchDashboardCounts = createAsyncThunk(
    "HomePage/fetchCounts",
    async (_,{rejectWithValue}) => {
        try {
            return await fetchClient("dashboard/restaurantCounts?locale=en", {
                params:{locale:'en'}
            });
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

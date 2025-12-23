import { createAsyncThunk } from "@reduxjs/toolkit";
import {fetchClient} from "../../utilities/FetchClient.ts";

export const fetchRestaurantEmployees = createAsyncThunk(
    "restaurantEmployees/fetch",
    async (_, {rejectWithValue}) => {
        try {
            return await fetchClient("restaurantEmployees/me");
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import {fetchClient} from "../../utilities/FetchClient.ts";
import type {FetchPackagesPayload} from "../../Models/PackagesInterface.ts";


export const fetchPackages = createAsyncThunk(
    "packages/fetchPackages",
    async (payload: FetchPackagesPayload, { rejectWithValue }) => {
        try {
            const data = await fetchClient("SubscriptionPackages", {
            params: payload
            })

            return {
                packages: data.matches || [],
                total: data.total || 0,
            };
        } catch (err: any) {
            return rejectWithValue(
                err.message || "Unknown error occurred"
            );
        }
    }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchClient } from "../../utilities/FetchClient.ts"
import type { FetchSubscriptionsPayload, FetchPackagesPayload, FetchBranchPayload } from "../../Models/CustomerSubscriptionInterface.ts";

export const fetchSubscription = createAsyncThunk(
    "CustomerSubscription/fetchSubscription",
    async (payload: FetchSubscriptionsPayload, { rejectWithValue }) => {
        try {
            const { branchId, packageNameFilter, ...rest } = payload;
            const params = {
                ...rest,
                restaurantBranchId: branchId,
                packageNameEn: packageNameFilter,
            };

            const data = await fetchClient("CustomerSubscriptions", { params });
            return {
                subscriptions: data.matches || [],
                total: data.total || 0,
            };
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const searchBranches = createAsyncThunk(
    "branches/searchBranches",
    async (params: FetchBranchPayload, { rejectWithValue }) => {
        try {
            const data = await fetchClient("Restaurants/searchBranches", { params });
            return {
                branches: data.matches || [],
                total: data.total || 0,
            };
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const searchPackages = createAsyncThunk(
    "Packages/searchPackages",
    async (params: FetchPackagesPayload, { rejectWithValue }) => {
        try {
            const data = await fetchClient("SubscriptionPackages", { params });
            return {
                packages: data.matches || [],
                total: data.total || 0,
            };
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);
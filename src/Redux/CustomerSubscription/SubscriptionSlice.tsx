import type {PayloadAction} from "@reduxjs/toolkit";
import { createSlice} from "@reduxjs/toolkit";
import { fetchSubscription, searchBranches, searchPackages } from "./SubscriptionThunk.tsx";

interface SubscriptionState {
    subscriptions: any[];
    total: number;
    locale: string;
    limit: number;
    offset: number;
    subscriptionType: string;
    upcomingOrders: boolean | null;
    branchId: string | number | null;
    packageNameFilter: string | null;
    numberOfMealsFilter: number | null;
    loading: boolean;
    error: string | null;

    branches: any[];
    branchesLoading: boolean;
    branchesError: string | null;

    packages: any[];
    packagesLoading: boolean;
    packagesError: string | null;
}

const initialState: SubscriptionState = {
    subscriptions: [],
    total: 0,
    locale: "en",
    limit: 10,
    offset: 0,
    subscriptionType: "",
    upcomingOrders: null,
    branchId: null,
    packageNameFilter: null,
    numberOfMealsFilter: null,
    loading: false,
    error: null,

    branches: [],
    branchesLoading: false,
    branchesError: null,

    packages: [],
    packagesLoading: false,
    packagesError: null,
};

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        setOffset(state, action: PayloadAction<number>) {
            if (action.payload >= 0) state.offset = action.payload;
        },
        setSubscriptionType(state, action: PayloadAction<string>) {
            state.subscriptionType = action.payload;
            state.offset = 0;
        },
        setUpcomingOrders(state, action: PayloadAction<boolean | null>) {
            state.upcomingOrders = action.payload;
            state.offset = 0;
        },
        setBranchId(state, action: PayloadAction<string | number | null>) {
            state.branchId = action.payload;
            state.offset = 0;
        },
        setPackageNameFilter(state, action: PayloadAction<string | null>) {
            state.packageNameFilter = action.payload;
            state.offset = 0;
        },
        setNumberOfMealsFilter(state, action: PayloadAction<number | null>) {
            state.numberOfMealsFilter = action.payload;
            state.offset = 0;
        },
        clearFilters(state) {
            state.subscriptionType = "";
            state.upcomingOrders = null;
            state.branchId = null;
            state.packageNameFilter = null;
            state.numberOfMealsFilter = null;
            state.offset = 0;
        },
    },
    extraReducers: (builder) => {

        builder
            .addCase(fetchSubscription.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubscription.fulfilled, (state, action) => {
                state.loading = false;
                state.subscriptions = action.payload.subscriptions;
                state.total = action.payload.total;
            })
            .addCase(fetchSubscription.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    (action.payload as string) ||
                    action.error.message ||
                    "Failed to fetch subscriptions";
            });

        builder
            .addCase(searchBranches.pending, (state) => {
                state.branchesLoading = true;
                state.branchesError = null;
            })
            .addCase(searchBranches.fulfilled, (state, action) => {
                state.branchesLoading = false;
                state.branches = action.payload.branches;
            })
            .addCase(searchBranches.rejected, (state, action) => {
                state.branchesLoading = false;
                state.branchesError =
                    (action.payload as string) ||
                    action.error.message ||
                    "Failed to fetch branches";
            });

        builder
            .addCase(searchPackages.pending, (state) => {
                state.packagesLoading = true;
                state.packagesError = null;
            })
            .addCase(searchPackages.fulfilled, (state, action) => {
                state.packagesLoading = false;
                state.packages = action.payload.packages;
                state.packagesError = null;
            })
            .addCase(searchPackages.rejected, (state, action) => {
                state.packagesLoading = false;
                state.packagesError =
                    (action.payload as string) ||
                    action.error.message ||
                    "Failed to fetch packages";
            });
    },
});

export const {
    setOffset,
    setSubscriptionType,
    setBranchId,
    setPackageNameFilter,
    setNumberOfMealsFilter,
} = subscriptionSlice.actions;

export const subscriptionReducer = subscriptionSlice.reducer;
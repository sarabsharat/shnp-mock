import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardCounts } from "./DashboardThunk";

interface DashboardState {
    subscriptions: number;
    delivery: number;
    pickup: number;
    deliveredOrders: number;
    paidAmount: number;
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    subscriptions: 0,
    delivery: 0,
    pickup: 0,
    deliveredOrders: 0,
    paidAmount: 0,
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardCounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardCounts.fulfilled, (state, action) => {
                state.loading = false;
                state.subscriptions = action.payload.numberOfSubscriptions;
                state.delivery = action.payload.numberOfDeliverySubscriptions;
                state.pickup = action.payload.numberOfPickupSubscriptions;
                state.deliveredOrders = action.payload.numberOfDeliveredDailyOrders;
                state.paidAmount = action.payload.numberOfPaidAmount;
            })
            .addCase(fetchDashboardCounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default dashboardSlice.reducer;

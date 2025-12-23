import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardCounts } from "./DashboardThunk";
import {initialState} from "../../Models/DashboardInterface.ts"


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
                state.delivery = action.payload.numberOfDeliveryOrders;
                state.pickup = action.payload.numberOfPickupOrders;
                state.deliveredOrders = action.payload.numberOfDailyOrders;
                state.paidAmount = action.payload.totalPaidAmount;
            })
            .addCase(fetchDashboardCounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default dashboardSlice.reducer;

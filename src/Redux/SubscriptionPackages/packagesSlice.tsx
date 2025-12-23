import type {PayloadAction} from "@reduxjs/toolkit";
import { createSlice} from "@reduxjs/toolkit";
import {initialState} from "../../Models/PackagesInterface.ts"
import {fetchPackages} from "./packagesThunk.tsx";


const packagesSlice = createSlice({
    name: "packages",
    initialState,
    reducers: {
        setOffset(state, action: PayloadAction<number>) {
            if (action.payload >= 0) state.offset = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPackages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPackages.fulfilled, (state, action) => {
                state.loading = false;
                state.packages = action.payload.packages;
                state.total = action.payload.total;
            })
            .addCase(fetchPackages.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    (action.payload as string) ||
                    action.error.message ||
                    "Failed to fetch packages";
            });

    },
});

export const { setOffset } = packagesSlice.actions;
export const packagesReducer = packagesSlice.reducer;

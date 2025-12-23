import { createSlice } from "@reduxjs/toolkit";
import { fetchRestaurantEmployees } from "./NavbarThunk.tsx";
import {initialValues} from "../../Models/UserInterface.ts"
// this shows the owner of the account(main User)


const RestaurantEmployeesSlice = createSlice({
    name: "restaurantEmployees",
    initialState: initialValues,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurantEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRestaurantEmployees.fulfilled, (state, action) => {
                state.loading = false;
                Object.assign(state, action.payload);
            })
            .addCase(fetchRestaurantEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default RestaurantEmployeesSlice.reducer;

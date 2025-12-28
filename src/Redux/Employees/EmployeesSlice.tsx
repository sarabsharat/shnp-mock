import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../../Models/EmployeesInterface.ts";

const EmployeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        setAcceptedFilter(state, action: PayloadAction<boolean | null>) {
            state.accepted = action.payload;
            state.offset = 0;
        },
        setPage(state, action: PayloadAction<number>) {
            state.offset = action.payload * state.limit;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
            state.offset = 0;
        }
    },

});

export const { setAcceptedFilter, setPage, setLimit } = EmployeesSlice.actions;
export default EmployeesSlice.reducer;
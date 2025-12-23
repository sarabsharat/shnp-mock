import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchEmployees, updateEmployee, inviteEmployee } from "./EmployeesThunk";
import {initialState} from "../../Models/EmployeesInterface.ts";
import type {EmployeePayload} from "../../Models/EmployeesInterface.ts";


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
    extraReducers: (builder) => {
        builder
           .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload.employees;
                state.total = action.payload.total;
                state.error = null;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch Employees";
            })

            .addCase(inviteEmployee.pending, (state) => {
                state.inviteLoading = true;
                state.inviteError = null;
            })
            .addCase(inviteEmployee.fulfilled, (state, ) => {
                state.inviteLoading = false;
                state.inviteError = null;
              })
            .addCase(inviteEmployee.rejected, (state, action) => {
                state.inviteLoading = false;
                state.inviteError = (action.payload as string) || action.error.message || "Invitation failed";
            })

            .addCase(updateEmployee.fulfilled, (state, action: PayloadAction<EmployeePayload>) => {
                const updatedEmployee = action.payload;
                const currentFilter = state.accepted;

                const matchesCurrentFilter =
                    currentFilter === null ||
                    (updatedEmployee.accepted !== undefined && updatedEmployee.accepted === currentFilter);

                const index = state.employees.findIndex((e) => e.id === updatedEmployee.id);

                if (matchesCurrentFilter) {
                    if (index !== -1) {
                        state.employees[index] = {
                            ...state.employees[index],
                            ...updatedEmployee,
                            accepted: updatedEmployee.accepted !== undefined ? updatedEmployee.accepted : state.employees[index].accepted,
                        };
                    }
                } else {
                    if (index !== -1) {
                        state.employees.splice(index, 1);
                    }
                }
            })

            .addCase(updateEmployee.rejected, (_, action) => {
                console.error("Update failed in slice:", action.payload);
            });
    },
});

export const { setAcceptedFilter, setPage, setLimit } = EmployeesSlice.actions;
export default EmployeesSlice.reducer;
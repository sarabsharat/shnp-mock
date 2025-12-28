import { createSlice } from '@reduxjs/toolkit';

export const homepageSlice = createSlice({
    name: 'homepage',
    initialState: {
        currentView: 'dashboard',
    },
    reducers: {
        setView: (state, action) => {
            state.currentView = action.payload;
        },
    },
});

export const { setView } = homepageSlice.actions;
export default homepageSlice.reducer;
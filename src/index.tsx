
import {configureStore} from '@reduxjs/toolkit';
import authReducer from "./features/user/userSlice.tsx"
import DashboardReducer from "./features/dashboard/DashboardSlice.tsx";
import RestaurantReducer from "./features/navbar/NavbarSlice.tsx";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: DashboardReducer,
        restaurant:RestaurantReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
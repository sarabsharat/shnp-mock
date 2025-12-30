
import {configureStore} from '@reduxjs/toolkit';
import authReducer from "../Redux/User/UserSlice.tsx"
import DashboardReducer from "../Redux/Dashboard/DashboardSlice.tsx";
import RestaurantEmployeesReducer from "../Redux/Navbar/NavbarSlice.tsx";
import {subscriptionReducer} from "../Redux/CustomerSubscription/SubscriptionSlice.tsx";
import {packagesReducer} from "../Redux/SubscriptionPackages/packagesSlice.tsx";
import homepageReducer from "../Redux/Homepage/NavigationSlice.tsx";
import {EmployeesApi} from "../Redux/Employees/Employees.ts";
import { RestaurantApi } from '../Redux/Restaurant/RestaurantApi';
import employeesSlice from "../Redux/Employees/EmployeesSlice.tsx";


export const index = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: DashboardReducer,
        restaurantEmployees:RestaurantEmployeesReducer,
        employees:employeesSlice,
        subscription:subscriptionReducer,
        packages:packagesReducer,
        homepage:homepageReducer,
        [EmployeesApi.reducerPath]: EmployeesApi.reducer,
        [RestaurantApi.reducerPath]: RestaurantApi.reducer,
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(EmployeesApi.middleware)
            .concat(RestaurantApi.middleware),
});

export type RootState = ReturnType<typeof index.getState>;
export type AppDispatch = typeof index.dispatch;
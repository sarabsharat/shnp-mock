
import {configureStore} from '@reduxjs/toolkit';
import authReducer from "../Redux/User/UserSlice.tsx"
import DashboardReducer from "../Redux/Dashboard/DashboardSlice.tsx";
import RestaurantEmployeesReducer from "../Redux/Navbar/NavbarSlice.tsx";
import RestaurantSlice from "../Redux/Restaurant/RestaurantSlice.tsx";
import EmployeesSlice from "../Redux/Employees/EmployeesSlice.tsx";
import {subscriptionReducer} from "../Redux/CustomerSubscription/SubscriptionSlice.tsx";
import {packagesReducer} from "../Redux/SubscriptionPackages/packagesSlice.tsx";
import homepageReducer from "../Redux/Homepage/NavigationSlice.tsx";


export const index = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: DashboardReducer,
        restaurantEmployees:RestaurantEmployeesReducer,
        restaurant:RestaurantSlice,
        employees:EmployeesSlice,
        subscription:subscriptionReducer,
        packages:packagesReducer,
        homepage:homepageReducer
    },
});

export type RootState = ReturnType<typeof index.getState>;
export type AppDispatch = typeof index.dispatch;
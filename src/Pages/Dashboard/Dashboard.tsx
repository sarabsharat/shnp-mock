import Card from "../../Components/Card.tsx";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks.tsx";
import { fetchDashboardCounts } from "../../Redux/Dashboard/DashboardThunk.tsx";
import {useTranslation} from "react-i18next";
import { EmployeesApi } from "../../Redux/Employees/Employees.ts";


const Dashboard = () => {
    const dispatch = useAppDispatch();
    const { t} = useTranslation();
    const prefetchEmployees = EmployeesApi.usePrefetch('searchRestaurantEmployee');
    const { subscriptions, delivery, pickup, deliveredOrders, paidAmount, loading } = useAppSelector(
        (state) => state.dashboard
    );

    useEffect(() => {
        dispatch(fetchDashboardCounts())
        prefetchEmployees({
            locale: 'en',
            limit: 10,
            offset: 0
        });

        console.log("🚀 Dashboard mounted: Prefetching Manage Employees data in background...");
    }, [dispatch, prefetchEmployees]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="w-full ">
            <div className="
    flex flex-col gap-4      =
    sm:grid sm:grid-cols-2 sm:gap-6
    lg:flex lg:flex-row lg:flex-wrap lg:gap-8 lg:justify-center

    w-full
">
                <Card name={t(`subscription`)} number={subscriptions} label="Subscriptions"/>
                <Card name={t(`deliverySubscription`)} number={delivery} label="Subscriptions"/>
                <Card name={t(`pickupSubscriptions`)} number={pickup} label="Subscriptions"/>
                <Card name={t(`deliveryOrders`)} number={deliveredOrders} label="Orders"/>
                <Card name={t(`amountsPaid`)} number={paidAmount} label="SAR"/>
            </div>
        </div>
    );
};

export default Dashboard;
import Card from "../../Components/Card.tsx";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.tsx";
import { fetchDashboardCounts } from "../../features/dashboard/DashboardThunk.tsx";

const DashboardBody = () => {
    const dispatch = useAppDispatch();

    const { subscriptions, delivery, pickup, deliveredOrders, paidAmount, loading } = useAppSelector(
        (state) => state.dashboard
    );

    useEffect(() => {
        dispatch(fetchDashboardCounts());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col lg:flex-row lg:gap-x-10 lg:justify-center lg:flex-wrap gap-y-4">
            <Card name="Subscriptions" number={subscriptions} label="Subscriptions"/>
            <Card name="Delivery Subscriptions" number={delivery} label="Subscriptions"/>
            <Card name="Pickup Subscriptions" number={pickup} label="Subscriptions"/>
            <Card name="Delivered Orders" number={deliveredOrders} label="Orders"/>
            <Card name="Amounts Paid" number={paidAmount} label="SAR"/>
        </div>
    );
};

export default DashboardBody;

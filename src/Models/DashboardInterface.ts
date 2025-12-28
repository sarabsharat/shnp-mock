interface DashboardState {
    subscriptions: number;
    delivery: number;
    pickup: number;
    deliveredOrders: number;
    paidAmount: number;
    loading: boolean;
    error: string | null;
}

export const initialState: DashboardState = {
    subscriptions: 0,
    delivery: 0,
    pickup: 0,
    deliveredOrders: 0,
    paidAmount: 0,
    loading: false,
    error: null,
};
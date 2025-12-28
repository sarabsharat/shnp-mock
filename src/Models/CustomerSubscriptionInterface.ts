export interface FetchSubscriptionsPayload {
    locale: string;
    limit: number;
    offset: number;
    subscriptionType?: string;
    upcomingOrders?: boolean | null;
    branchId?: string | number | null;
    packageNameFilter?: string | null;
    numberOfMeals?: number | null;
}
export interface FetchPackagesPayload {
    locale: string;
    limit: number;
    offset: number;
}
export interface FetchBranchPayload {
    locale: string;
    limit: number;
    offset: number;
}
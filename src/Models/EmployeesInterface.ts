
export interface FetchEmployeesPayload {
    locale: string;
    limit: number;
    offset: number;
    accepted: boolean | null;
}

export interface EmployeePayload {
    dateOfBirth: string | null;
    email: string;
    fullNameAr: string;
    fullNameEn: string;
    gender: string;
    id?: number;
    mobile: string;
    owner: boolean;
    preferredLocale: string;
    roles: string[];
    accepted?: boolean;
}
interface EmployeesState {
    employees: any[];
    total: number;
    locale: string;
    limit: number;
    offset: number;
    accepted: boolean | null;
    loading: boolean;
    error: string | null;
    inviteLoading: boolean;
    inviteError: string | null;
}

export const initialState: EmployeesState = {
    employees: [],
    total: 0,
    locale: "en",
    limit: 10,
    offset: 0,
    accepted: null,
    loading: false,
    error: null,
    inviteLoading:false,
    inviteError: null

};
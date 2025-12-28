export interface ServerUploadResponse {
    url?: string;
    path?: string;
    location?: string;
}

export interface Role {
    code: string;
    name: string;
}

export interface Employee {
    id: number;
    email: string;
    fullNameAr: string;
    fullNameEn: string;
    mobile: string;
    gender: string;
    preferredLocale?: string;
    owner?: boolean;
    dateOfBirth?: string | null;
    roles: Role[];
    accepted: boolean;
}
export interface InvitePayload {
    fullNameAr: string;
    fullNameEn: string;
    email: string;
    mobile: string;
    roles: string[];
    dateOfBirth: string | null;
    gender: string;
}

export type EmployeeFormValues = InvitePayload;

export const initialInviteValues: InvitePayload = {
    fullNameAr: '',
    fullNameEn: '',
    email: '',
    mobile: '',
    roles: [],
    dateOfBirth: null,
    gender: ''
};
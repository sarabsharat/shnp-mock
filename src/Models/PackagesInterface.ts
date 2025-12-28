interface PackageState {
    packages: any[];
    total: number;
    locale: string;
    limit: number;
    offset: number;
    loading: boolean;
    error: string | null;
}

export const initialState: PackageState = {
    packages: [],
    total: 0,
    locale: "en",
    limit: 100,
    offset: 0,
    loading: false,
    error: null,
};


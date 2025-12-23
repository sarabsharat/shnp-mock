import { BASE_URL } from "./Config.ts";

export const fetchClient = async (endpoint: string, { body, params, ...customConfig }: any = {}) => {
    const token = localStorage.getItem('jwtToken');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };

    let url = `${BASE_URL}${endpoint}`;
    if (params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, String(value));
            }
        });
        url += `?${searchParams.toString()}`;
    }

    const response = await fetch(url, {
        method: body ? (customConfig.method || 'POST') : 'GET',
        ...customConfig,
        headers: { ...headers, ...customConfig.headers },
        ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (response.status === 204) {
        return {};
    }

    const data = await response.json();

    if (!response.ok) {
        const errorMessage = data.message ||
            (typeof data === 'object' ? JSON.stringify(data) : 'Server error');
        throw new Error(errorMessage);
    }

    return data;
};
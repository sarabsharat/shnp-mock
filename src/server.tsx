import axios from "axios";
import type { RestaurantRegistration } from "./Pages/Registry/Interface.tsx";
const BASE_URL = "https://app-stg.shnp.me/api/";



export interface ServerUploadResponse {
    url?: string;
    path?: string;
    location?: string;
}

export default async function imageUpload(pendingDocument: { name: string; url: string }) {
    try {
        const base64Data = pendingDocument.url.includes('base64,')
            ? pendingDocument.url.split('base64,')[1]
            : pendingDocument.url;

        const response = await axios.post<ServerUploadResponse>(`${BASE_URL}blobs/upload`, {
            base: base64Data,
            name: pendingDocument.name
        });

        return response.data;
    } catch (err) {
        console.error("Upload failed:", err);
        throw err;
    }
}

export const handleSubmit = async (values: RestaurantRegistration, { setSubmitting }: any) => {
    try {

        console.log("Submitting Registration Payload:", values);
        const response = await axios.post(`${BASE_URL}Restaurants`, values);

        console.log("Registration Success:", response.data);
    } catch (err: any) {
        console.error("Registration Failed:", err);

        if (err.response) {
            console.error("Server Error Data:", err.response.data);
        } else if (err.request) {
            alert("Network Error: Could not reach the server.");
        } else {
            alert(`Error: ${err.message}`);
        }
    } finally {
        setSubmitting(false);
    }
};
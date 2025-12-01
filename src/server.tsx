import axios from "axios";
import type {RestaurantRegistration, ResLogin, PassReset} from "./Pages/Registry/Interface.tsx";
export const BASE_URL = "https://app-stg.shnp.me/api/";
import {useState} from "react";


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
//restaurantemployees/login

export const handleSubmit = async (values: RestaurantRegistration, { setSubmitting }: any) => {
    try {
        console.log("Submitting Registration Payload:", values);
        const response = await axios.post(`${BASE_URL}Restaurants`, values);
        console.log("Registration Success:", response.data);
    } catch (err: any) {
        console.error("Registration Failed:", err);

        if (err.response) {
            console.error("Server Error Data:", err.response.data);
        }
        throw err;
    } finally {
        setSubmitting(false);
    }
};
// export const handleLogin = async (values: ResLogin, { setSubmitting }: any) => {
//     try {
//         console.log("Submitting Registration Payload:", values);
//         const response = await axios.post(`${BASE_URL}restaurantemployees/login`, values);
//         console.log("Registration Success:", response.data);
//         return response.data;
//     } catch (err: any) {
//         console.error("Registration Failed:", err);
//
//         if (err.response) {
//             console.error("Server Error Data:", err.response.data);
//         }
//         throw err;
//     } finally {
//         setSubmitting(false);
//     }
// };


//auth

//reset restaurantemployees/resetPassword

export const handlePass = async (values: PassReset, { setSubmitting }: any) => {
    try {
        console.log("Submitting Pass reset Payload:", values);
        const response = await axios.post(`${BASE_URL}restaurantemployees/resetPassword`, values);
        console.log("Pass reset sent:", response.data);
    } catch (err: any) {
        console.error("Reset Failed:", err);

        if (err.response) {
            console.error("Server Error Data:", err.response.data);
        }
        throw err;
    } finally {
        setSubmitting(false);
    }
};



// const getApi = async () => {
//     const [getData, setGetData] =  useState ([])
//     const response = await axios.get(`${BASE_URL}dashboard/restaurantCounts`);
//     setGetData(response.data)
// }
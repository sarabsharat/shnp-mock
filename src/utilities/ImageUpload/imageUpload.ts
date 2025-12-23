import axios from "axios";
import {BASE_URL} from "../Config.ts"
import type {ServerUploadResponse, pendingDocument} from "../../Models/ImageUploadInterface.ts"


export const imageUpload = async(pendingDocument:pendingDocument)=> {
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
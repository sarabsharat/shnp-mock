// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { fileToBase64 } from "../../utilities/Base64/Base64.ts";
// import { prepareUpdatePayload } from "../../utilities/UpdateDocuments/UpdateDocuments.ts";
// import { fetchClient } from "../../utilities/FetchClient.ts";
//
// export const loadRestaurantInfo = createAsyncThunk(
//     "restaurant/loadInfo",
//     async (_, { rejectWithValue }) => {
//         try {
//             const data = await fetchClient("restaurants/me");
//             return {
//                 id: data.id || null,
//                 restaurantNameEn: data.nameEn || "",
//                 restaurantNameAr: data.nameAr || "",
//                 imageUrl: data.imageUrl || null,
//                 restaurantDocuments: data.restaurantDocuments || [],
//                 bankAccountIban: data.bankAccountIban || "",
//                 registrationNumber: data.registrationNumber || "",
//                 managementPhoneNumber: data.managementPhoneNumber || "",
//                 instagramSocialMediaLink: data.instagramSocialMediaLink || "",
//                 twitterSocialMediaLink: data.twitterSocialMediaLink || "",
//                 foodCategories: data.foodCategories || [],
//             };
//         } catch (err: any) {
//             return rejectWithValue(err.message || "Failed to load info");
//         }
//     }
// );
//
// export const uploadRestaurantDocument = createAsyncThunk(
//     'restaurant/uploadDoc',
//     async (file: File, { rejectWithValue }) => {
//         try {
//             const base64 = await fileToBase64(file);
//             const payload = { base: base64, name: file.name };
//             const data = await fetchClient("blobs/upload", { body: payload });
//             return data.result || data.url || data;
//         } catch (err: any) {
//             return rejectWithValue(err.message || 'Upload failed');
//         }
//     }
// );
//
// export const updateRestaurantFull = createAsyncThunk(
//     'restaurant/updateFull',
//     async (payload: any, { rejectWithValue }) => {
//         try {
//             const { id, ...rawData } = payload;
//             const cleanPayload = prepareUpdatePayload(rawData);
//             const data = await fetchClient(`restaurants/${id}/update`, {
//                 body: cleanPayload
//             });
//             return data;
//         } catch (err: any) {
//             return rejectWithValue(err.message || 'Update failed');
//         }
//     }
// );
// import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
// import { loadRestaurantInfo, updateRestaurantFull, uploadRestaurantDocument } from './RestaurantThunk';
// import {initialState} from "../../Models/RestaurantInterface.ts";
//
//
// const restaurantSlice = createSlice({
//     name: 'restaurant',
//     initialState,
//     reducers: {
//         addDocumentUrl: (state, action: PayloadAction<{ typeCode: string; url: string }>) => {
//             const { typeCode, url } = action.payload;
//             const existingDoc = state.restaurantDocuments.find(
//                 (doc) => doc.documentTypeCode === typeCode
//             );
//
//             if (existingDoc) {
//                 existingDoc.urls.push(url);
//             } else {
//                 state.restaurantDocuments.push({
//                     urls: [url],
//                     documentTypeCode: typeCode,
//                     documentType: null
//                 });
//             }
//         },
//
//         removeDocumentUrl: (state, action: PayloadAction<{ typeCode: string; url: string }>) => {
//             const { typeCode, url } = action.payload;
//             const doc = state.restaurantDocuments.find(d => d.documentTypeCode === typeCode);
//             if (doc) {
//                 doc.urls = doc.urls.filter(u => u !== url);
//             }
//         }
//     },
//
//     extraReducers: (builder) => {
//         builder.addCase(loadRestaurantInfo.pending, (state) => { state.loading = true; });
//         builder.addCase(loadRestaurantInfo.fulfilled, (state, action) => {
//             Object.assign(state, action.payload);
//             state.loading = false;
//         });
//         builder.addCase(loadRestaurantInfo.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload as string;
//         });
//         builder.addCase(uploadRestaurantDocument.pending, (state) => { state.loading = true; });
//         builder.addCase(uploadRestaurantDocument.fulfilled, (state) => { state.loading = false; });
//         builder.addCase(uploadRestaurantDocument.rejected, (state) => { state.loading = false; });
//         builder.addCase(updateRestaurantFull.pending, (state) => { state.loading = true; });
//         builder.addCase(updateRestaurantFull.fulfilled, (state, action) => {
//             state.loading = false;
//             Object.assign(state, action.payload);
//         });
//         builder.addCase(updateRestaurantFull.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload as string;
//         });
//     },
// });
//
// export const { addDocumentUrl, removeDocumentUrl } = restaurantSlice.actions;
// export default restaurantSlice.reducer;
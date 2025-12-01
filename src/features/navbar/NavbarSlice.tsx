import { createSlice } from "@reduxjs/toolkit";
import { fetchRestaurant } from "./NavbarThunk.tsx";

export const initialValues = {
    fullNameAr: "",
    fullNameEn: "",
    userName: "",
    email: "",
    mobile: "",
    owner: false,
    gender: "",
    dateOfBirth: "",
    confirmed: false,
    accepted: false,
    restaurantNameAr: "",
    restaurantNameEn: "",
    restaurantEmail: "",
    restaurantCity: null as string | null,
    restaurantDistrict: null as string | null,
    restaurantFoodCategories: [] as number[],
    restaurantNumberOfBranches: 0,
    restaurantManagementPhoneNumber: "",
    restaurantTwitterSocialMediaLink: "",
    restaurantInstagramSocialMediaLink: "",
    restaurantRestaurantStatus: "",
    id: 0,
    iban: "",
    commercialRegistrationNumber: "",
    roles: [] as Array<{
        code: string;
        name: string;
        privileges: string[];
    }>,
    foodCategories: [] as string[],
    imageUrl: "",
    loading: false,
    error: null as string | null,
};

const RestaurantSlice = createSlice({
    name: "restaurant",
    initialState: initialValues,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurant.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRestaurant.fulfilled, (state, action) => {
                state.loading = false;
                Object.assign(state, action.payload);
            })
            .addCase(fetchRestaurant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default RestaurantSlice.reducer;

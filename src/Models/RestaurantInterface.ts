export interface RestaurantDocument {
    urls: string[];
    documentTypeCode: string;
    driverId?: number;
    documentType?: string | null;
}

export interface RestaurantState {
    id: number | null;
    restaurantNameEn: string | null;
    restaurantNameAr: string | null;
    bankAccountIban: string | null;
    registrationNumber: string | null;
    managementPhoneNumber: string | null;
    foodCategories: number[];
    imageUrl: string | null;
    instagramSocialMediaLink: string | null;
    twitterSocialMediaLink:string | null;
    restaurantDocuments: RestaurantDocument[];
    loading: boolean;
    error: string | null;
}

export const initialState: RestaurantState = {
    id: null,
    restaurantNameEn: null,
    restaurantNameAr: null,
    bankAccountIban: null,
    registrationNumber: null,
    managementPhoneNumber: null,
    instagramSocialMediaLink: "",
    twitterSocialMediaLink:"",
    foodCategories: [],
    imageUrl: null,
    restaurantDocuments: [],
    loading: false,
    error: null,
};

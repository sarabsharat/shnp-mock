//Work Schedule
export interface WorkingDetailType {
    day: string;
    from: string;
    to: string;
}

//input page
export type InputType = {
    label: string,
    id: string,
    placeholder: string,
    type?: string
    required?: boolean,
    name: string,
    value?: string,
    icon?: string,
    options?: string[];
}

//upload component
export type link = {
    id: string;
    title: string;
    type?: string;
    download?: boolean;
    name:string;
    options?: string[];
}

//Document
export interface Document {
    urls: string[];
    documentTypeCode: string;
    driverId: number;
    documentType: string;
}

//Form
export interface RestaurantRegistration {
    nameAr: string;
    nameEn: string;
    password: string;
    preferredLocale: string;
    district: string;
    documents: Document[];
    operationRepresentativePhoneNumber: string;
    email: string;
    instagramSocialMediaLink: string;
    twitterSocialMediaLink: string;
    mainRestaurantBranchMapsLink: string;
    bankAccountIban: string;
    registrationNumber: string;
    operationRepresentativeEmailAddress: string;
    operationRepresentativeFullNameEn: string;
    operationRepresentativeFullNameAr: string;
    foodCategories: Array<number>;
    managementPhoneNumber: string;
    workingDetails: WorkingDetailType[];
    documentLicenseNumber: Array<string>;
    documentTaxNumber: Array<string>;
    documentRegistry: Array<string>;
    documentContract: Array<string>;
    latitude: number | null;
    longitude: number | null;
    mainBranchNameAr: string;
    mainBranchNameEn: string;
    branchAddressName: string;
    branchMobile: string;
    branchStreet: string;
    branchAddressDescription: string;
    branchBuildingNumber: string;
    branchDistrict: string;
    branchCity: string;
    imageUrl: string;
    branchCountry: string;
    id?: number;
    numberOfBranches?: number | null;
    restaurantStatus?: string;
    deliveryFees?: number;
    mainMenuId?: number;
    restaurantDocuments?: Document[];
}

//Form Initial Values
export const initialValues: RestaurantRegistration = {
    nameAr: "", //ok
    nameEn: "",//pl
    password: "",//ok
    operationRepresentativePhoneNumber: "",//ok
    email: "",//ok
    instagramSocialMediaLink: "",//ok
    twitterSocialMediaLink: "",//ok
    bankAccountIban: "",//ok
    registrationNumber: "",//ok
    operationRepresentativeEmailAddress: "",//ok
    operationRepresentativeFullNameEn: "",//ok
    operationRepresentativeFullNameAr: "",
    foodCategories: [],//ok
    managementPhoneNumber: "",//ok
    workingDetails: [],//ok
    documentLicenseNumber: [],//ok
    documentTaxNumber: [],//ok
    documentRegistry: [],//ok
    documentContract: [],//ok
    mainBranchNameAr: "",//ok
    mainBranchNameEn: "",//ok
    branchAddressName: "",//pl
    branchStreet: "",//ok
    branchAddressDescription: "",
    branchBuildingNumber: "",//ok
    branchDistrict: "",//ok
    imageUrl: "",//ok
    preferredLocale: "en",
    documents:[],
    latitude: 24.7136,
    longitude: 46.6753,
    mainRestaurantBranchMapsLink:"",
    district:"",
    branchMobile:"",
    branchCity:"",
    branchCountry:"",
    id: 0,
    numberOfBranches: null,
    restaurantStatus: "",
    deliveryFees: 0,
    mainMenuId: 0,
    restaurantDocuments: [],


}

export const documentTypeMap = {
    documentRegistry: "CompanyTaxRegistryRepresentative",
    documentTaxNumber: "TaxCertificateNumber",
    documentLicenseNumber: "CommercialLicenseNumber",
    documentContract: "RestaurantContract",
};





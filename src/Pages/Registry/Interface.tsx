import * as Yup from "yup";
import type { TFunction } from "i18next";
import type {ReactNode} from "react";

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

//upload page
export type link = {
    id: string;
    title: string;
    type?: string;
    download?: boolean;
    name:string;
    options?: string[];
}
export interface Document {
    urls: string[];
    documentTypeCode: string;
    driverId: number;
    documentType: string;
}
//main
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

export interface ResLogin{
    username:string;
    password:string;
}

export const initialValuesLogin: ResLogin = {
    username:"",
    password:""
}

export const validationSchemaLogin =(t:TFunction) =>{
    return Yup.object().shape({
        username:Yup.string().required(t("val_user")),
        password:Yup.string().required(t("input5placeholder")),

    })
}
export interface PassReset{
    userName:string;
}
export const initialValuesPassReset: PassReset = {
    userName:"",
}
export const validationSchemaPassReset =(t:TFunction) => {
    return Yup.object().shape({
        userName: Yup.string().required(t("val_email1"))
    })
}

//t("val_namear")

export const validationSchema = (t: TFunction) => {
    return Yup.object().shape({
    nameAr: Yup.string().required(t("val_namear")),
    nameEn: Yup.string().required(t("val_nameen")),
    password: Yup.string().min(8).matches(/[a-z]/,"password must include at least one lower case letter")
        .matches(/[A-Z]/,"password must include at least one upper case letter")
        .matches(/[\W_]/,"password must include at least one symbol")
        .required(t("val_pass1")),
    confirmPassword:Yup.string().oneOf([Yup.ref(`password`)], t("val_pass2")),
    preferredLocale: Yup.string().required("Please Enter"),
    operationRepresentativePhoneNumber: Yup.number().required(t("complete_field")),
    email: Yup.string().email(t("val_email2")).required(t("val_email1")),
    // instagramSocialMediaLink: Yup.string().url("Please enter a valid URL").required("Please enter your Instagram account's link"),
    // twitterSocialMediaLink: Yup.string().url("Please enter a valid URL").required("Please enter your Twitter(X) account's link"),
    //mainRestaurantBranchMapsLink: Yup.string().url("Please enter a valid URL").required("Please enter your restaurant's location"),
    bankAccountIban: Yup.string().required(t("val_iban1")).transform(value=> value? value.replace(/\s/g,''):value)
        .matches(
            /^SA\d{22}$/,
            t("val_iban2")
        ).length(24,t("val_iban3")),
    registrationNumber: Yup.number().required(t("val_regnum")),
    operationRepresentativeEmailAddress: Yup.string().email(t("val_email2")).required(t("val_email1")),
    operationRepresentativeFullNameEn: Yup.string().required(t("complete_field")),
    operationRepresentativeFullNameAr: Yup.string().required(t("complete_field")),
    foodCategories:Yup.array().min(1, t("val_category")),
    managementPhoneNumber: Yup.number().required(t("val_mgmnum")),
    workingDetails: Yup.array().min(1,t("val_work1")).required(t("val_work2")),
    documentContract: Yup.array().min(1, t("val_contract")),
    documentLicenseNumber: Yup.array().min(1, t("val_license")),
    documentTaxNumber: Yup.array().min(1, t("val_tax")),
    documentRegistry: Yup.array().min(1, t("val_reg")),
    mainBranchNameAr: Yup.string().required(t("val_mainar")),
    mainBranchNameEn: Yup.string().required(t("val_mainen")),
    imageUrl:Yup.string().required(t("val_trademark")) ,
    documents: Yup.array().min(4, t("val_docs"))
})
    }

export const documentTypeMap = {
    documentRegistry: "CompanyTaxRegistryRepresentative",
    documentTaxNumber: "TaxCertificateNumber",
    documentLicenseNumber: "CommercialLicenseNumber",
    documentContract: "RestaurantContract",
};

export interface AuthContextType {
    token: string | null;
    refreshToken: string | null;
    login: (jwt: string, refreshToken: string) => void;
    logout: () => void;
}
export interface AuthProviderProps {
    children: ReactNode;
}



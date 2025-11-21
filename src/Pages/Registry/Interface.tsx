import * as Yup from "yup";

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
}
export interface Document {
    urls: string[];
    documentTypeCode: string;
    driverId: number;
    documentType: string;
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
    foodCategories: [0],//ok
    managementPhoneNumber: "",//ok
    workingDetails: [],//ok
    documentLicenseNumber: [""],//ok
    documentTaxNumber: [""],//ok
    documentRegistry: [""],//ok
    documentContract: [""],//ok
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

}

export const validationSchema = Yup.object().shape({
    nameAr: Yup.string().required("Your restaurant's name in Arabic is required"),
    nameEn: Yup.string().required("Your restaurant's name in English is required"),
    password: Yup.string().min(8).required("Password is required"),
    confirmPassword:Yup.string().oneOf([Yup.ref(`password`)], "Passwords must match!"),
    preferredLocale: Yup.string().required("Please Enter"),
    operationRepresentativePhoneNumber: Yup.number().required("Please complete this field*"),
    email: Yup.string().email("Invalid email!").required("Please Enter Your email"),
    // instagramSocialMediaLink: Yup.string().url("Please enter a valid URL").required("Please enter your Instagram account's link"),
    // twitterSocialMediaLink: Yup.string().url("Please enter a valid URL").required("Please enter your Twitter(X) account's link"),
    //mainRestaurantBranchMapsLink: Yup.string().url("Please enter a valid URL").required("Please enter your restaurant's location"),
    bankAccountIban: Yup.string().required("Please enter your restaurant's IBAN").transform(value=> value? value.replace(/\s/g,''):value)
        .matches(
            /^SA\d{22}$/,
            "The IBAN account field contains \"SA\" followed by 22 characters*\n"
        ).length(24,"IBAN must be exactly 24 characters long."),
    registrationNumber: Yup.number().required("Registration Number is required"),
    operationRepresentativeEmailAddress: Yup.string().email("Invalid email!").required("Please Enter the operation representative email"),
    operationRepresentativeFullNameEn: Yup.string().required("Please complete this field"),
    operationRepresentativeFullNameAr: Yup.string().required("Please complete this field*"),
    foodCategories:Yup.array().min(1, 'Select at least one option'),
    managementPhoneNumber: Yup.number().required("Management phone number is required."),
    workingDetails: Yup.array().min(1,"You must provide at least one working shift detail.").required("Working details are required"),
    documentLicenseNumber:Yup.array().required("Document license is required."),
    documentTaxNumber: Yup.array().required("Document tax is required."),
    documentRegistry: Yup.array().required("Document registry is required."),
    mainBranchNameAr: Yup.string().required("Please enter the main branch's name in Arabic"),
    mainBranchNameEn: Yup.string().required("Please enter the main branch's name in English"),
    // imageUrl: "",
})

export const documentTypeMap = {
    documentRegistry: "CompanyTaxRegistryRepresentative",
    documentTaxNumber: "TaxCertificateNumber",
    documentLicenseNumber: "CommercialLicenseNumber",
    documentContract: "RestaurantContract",
};



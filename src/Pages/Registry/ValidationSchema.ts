import type {TFunction} from "i18next";
import * as Yup from "yup";

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
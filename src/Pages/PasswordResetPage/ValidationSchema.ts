import type {TFunction} from "i18next";
import * as Yup from "yup";

export const validationSchemaPassReset =(t:TFunction) => {
    return Yup.object().shape({
        userName: Yup.string().required(t("val_email1"))
    })
}
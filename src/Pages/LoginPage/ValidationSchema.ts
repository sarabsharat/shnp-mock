import type {TFunction} from "i18next";
import * as Yup from "yup";

export const validationSchemaLogin =(t:TFunction) =>{
    return Yup.object().shape({
        username:Yup.string().required(t("val_user")),
        password:Yup.string().required(t("input5placeholder")),

    })
}
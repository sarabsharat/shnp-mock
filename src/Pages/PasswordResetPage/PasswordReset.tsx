import "../../App.css"
import Input from "../../Components/Input.tsx";
import { Form, Formik } from "formik";
import {initialValuesPassReset, type PasswordResetType} from "../../Models/PasswordResetInterface.ts"
import {validationSchemaPassReset} from ".//ValidationSchema.ts";
import "../../../media/logo.png";
import {useTranslation} from "react-i18next";
import {notifyError, notifySuccess} from "../../utilities/Notify.ts";
import {Link} from "react-router-dom";
import {resetPassword} from "../../Redux/User/UserThunk.tsx";
import {useAppDispatch} from "../../Store/hooks.tsx";


export const PasswordReset = ()=> {
    const dispatch = useAppDispatch();
    const { t, i18n } = useTranslation();
    const handleLanguageToggle = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };

    const onSubmit = async (values: PasswordResetType, formikHelpers: any) => {
        try {
            await dispatch(resetPassword(values)).unwrap();
            notifySuccess(t("reset_email_success"));
        } catch (err: any) {
            const message = typeof err === 'string' ? err : err.message || t("unknown_error");
            notifyError(message);
        } finally {
            formikHelpers.setSubmitting(false);
        }
    };
    const logo=(<img className="mt-3 2xl:w-[320px]" src="../../../media/logo.png" width="160" alt="logo"></img>)

    return(
        <div className="flex flex-nowrap flex-col gap-0 items-center justify-evenly  h-fit
        md:border-gray-400 md:border-1 md:border-spacing-20 md:rounded-2xl
        2xl:border-2 2xl:border-gray-400 2xl:max-w-[850px] 2xl:h-fit 2xl:justify-around
        lg:border-gray-400 lg:border-1 lg:border-spacing-20 lg:p-4 lg:gap-y-2 lg:max-w-[450px] ">
            <div className="flex w-full justify-end ">
                <button
                    type="button"
                    onClick={handleLanguageToggle}
                    className="text-shnp-orange  hover:bg-[#FFE0C8FF] p-5 md:p-10  rounded-full mb-1 2xl:text-4xl"
                >
                    {i18n.language === 'en' ? 'العربية' : 'English'}
                </button></div>

            <div className="text-3xl flex  flex-col items-center">{logo}
                {t(`passFormTitle`)}
                <p className="text-sm p-5 md:pr-35 md:pl-35 lg:pr-12 lg:pl-12 2xl:text-2xl">
                    {t(`passFormDesc`)}</p>
            </div>
            <Formik initialValues={initialValuesPassReset}
                    validationSchema={validationSchemaPassReset(t)}
                    onSubmit={onSubmit}>
                <Form className="flex flex-col w-full p-3 gap-3 gap-y-5">
        <Input label="" placeholder={"Username"} id={"1"} icon="human" name="userName"></Input>
                    <p className="text-sm p-5 md:pr-35 md:pl-35 lg:pr-12 lg:pl-12 2xl:text-2xl">
                        {t(`cant_remember`)}<span className="underline text-shnp-orange"><Link to={"/"}>Back to log in</Link></span></p>

                <button type="submit" className="rounded-3xl bg-shnp-orange w-auto m-0 grow p-2 text-white mb-2
                                    2xl:p-6 2xl:rounded-4xl 2xl:text-2xl ">{t(`email_btn`)}</button>
                </Form>

            </Formik>
    </div>

    );
}

import '../../App.css'
import ResInfo from "./ResInfo.tsx"
import ResDoc from "./ResDoc.tsx"
import { Form, Formik } from "formik";
import { handleSubmit } from "../../server.tsx";
import { useNavigate } from "react-router-dom";
import { validationSchema, initialValues, type RestaurantRegistration } from "./Interface.tsx";
import "../../i18next.ts"
import { useTranslation } from 'react-i18next';
import { notifySuccess, notifyError, FormErrorListener } from "../../utilities/notify.ts"

const Registration = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const handleLanguageToggle = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };

    const onSubmit = async (values: RestaurantRegistration, formikHelpers: any) => {
        try {
            await handleSubmit(values,formikHelpers);
            notifySuccess("You Successfully registered");
            navigate("/success");
        } catch (err: any) {
            if (err.response?.data?.errors) {
                const backError = err.response.data.errors;
                Object.entries(backError).forEach(([field, message]) => {
                    formikHelpers.setFieldError(field, message as string);
                })
                notifyError("Please fix the errors");
            } else if (err.response?.data?.message) {
                notifyError(err.response.data.message);
            } else {
                notifyError("Network or unknown error occurred.");
            }
        } finally {
            formikHelpers.setSubmitting(false);
        }
    };

    return (

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >

            {({ isSubmitting }) => (
                <>
                    <FormErrorListener />

                    <div className="flex flex-wrap flex-col">
                        <div className="flex flex-col content-between">
                            <div id="header" className="grid grid-cols-[repeat(4,_1fr)] grid-rows-1">
                                <div className="text-2xl [grid-area:1/1/2/4] text-left pb-2 2xl:text-4xl">
                                    {t(`main_title`)}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleLanguageToggle}
                                    className="text-shnp-orange [grid-area:1/4/2/5] hover:bg-[#FFE0C8FF] p-1  rounded-full mb-1 2xl:text-2xl"
                                >
                                    {i18n.language === 'en' ? 'العربية' : 'English'}
                                </button>

                            </div>
                        </div>

                        <Form method="post" encType="multipart/form-data"
                              className="flex flex-wrap gap-4 flex-col border-1 border-[#e3e4e8]
                            rounded-2xl p-4 md:grid md:grid-cols-[repeat(2,_1fr)] md:grid-rows-[1fr]"
                        >
                            <ResInfo />
                            <ResDoc />

                            <div></div>

                            <div className="justify-self-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="rounded-3xl bg-shnp-orange w-fit p-2 text-white
                                    2xl:p-6 2xl:rounded-4xl 2xl:text-2xl md:justify-self-end"
                                >
                                    {isSubmitting ? "Processing..." : t("submit_btn")}
                                </button>
                            </div>
                        </Form>
                    </div>
                </>
            )}
        </Formik>
    );
}

export default Registration;
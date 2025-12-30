import '../../../App.css'
import FormInfoSection from "./FormInfoSection.tsx"
import FormUploadSection from "./FormUploadSection.tsx"
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {initialValues, type RestaurantRegistration } from "../../../Models/RegistrationFormInterface.ts";
import {validationSchema} from "../ValidationSchema.ts";
import "../../../i18next.ts"
import { useTranslation } from 'react-i18next';
import { notifySuccess, notifyError} from "../../../utilities/Notify.ts"
import {registerUser} from "../../../Redux/User/UserThunk.tsx";
import {useAppDispatch} from "../../../Hooks/Redux.tsx";


const ParentForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const { t, i18n } = useTranslation();
    const handleLanguageToggle = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };
//username is same as operation rep email
    const onSubmit = async (values: RestaurantRegistration,formikHelpers: any) => {
        try {
            await dispatch(registerUser(values)).unwrap();
            notifySuccess("You Successfully registered");
            navigate("/success");
        } catch (err: any) {

            if (err.code === "ERR_NETWORK") {
                notifyError("Network could not reach the server");

            } else if(err.response?.data?.RESTAURANT_EXISTS){
                notifyError("A restaurant with the same credentials exists");

            } else if (err.response?.data?.message) {
                notifyError(err.response.data.message);
            } else {
                notifyError("Unknown error occurred.");
            }
        } finally {
            formikHelpers.setSubmitting(false);
        }
    };

    return (

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema(t)}
            onSubmit={onSubmit}
        >

            {({ isSubmitting }) => (
                <>


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
                            <FormInfoSection />
                            <FormUploadSection />

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

export default ParentForm;
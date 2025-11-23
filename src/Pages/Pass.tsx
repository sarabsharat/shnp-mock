import "../App.css"
import Input from "../Components/Input";
import { Form, Formik } from "formik";
import {initialValuesMail, validationSchemaMail} from "./Registry/Interface.tsx";
import "../../media/logo.png";
import {useTranslation} from "react-i18next";



function Pass(){

    const { t, i18n } = useTranslation();
    const handleLanguageToggle = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };
    const logo=(<img className="mt-3" src="../../media/logo.png" width="160" alt="logo"></img>)

    return(
        <div className="flex flex-wrap flex-col gap-0 items-center justify-evenly h-screen
        md:border-gray-400 md:border-1 md:border-spacing-20 md:rounded-2xl md:min-w-[450px]
        2xl:border-2 2xl:border-gray-400
        lg:border-gray-400 lg:border-1 lg:border-spacing-20 lg:p-4 lg:gap-y-2 lg:max-w-[450px]">
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
                <p className="text-sm p-5 md:pr-35 md:pl-35 lg:pr-12 lg:pl-12 ">
                    {t(`passFormDesc`)}</p>
            </div>
            <Formik initialValues={initialValuesMail} validationSchema={validationSchemaMail} onSubmit={(values, { setSubmitting }) => {
                console.log("Submitting:", values);
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }}>
                <Form className="flex flex-col gap-3 gap-y-5">
        <Input label="" placeholder={"Username"} id={"1"} icon="human" type="email" name="email"></Input>

                <button type="submit" className="rounded-3xl bg-shnp-orange w-auto m-0 grow p-2 text-white mb-2
                                    2xl:p-6 2xl:rounded-4xl 2xl:text-2xl ">Send Email</button>
                </Form>

            </Formik>

    </div>

    );
}

export default Pass;
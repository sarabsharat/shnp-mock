import "../../App.css"
import Input from "../../Components/Input.tsx";
import { Form, Formik } from "formik";
import "../../../media/logo.png";
import type {LoginType} from "../../Models/LoginInterface.ts"
import {initialValuesLogin} from "../../Models/LoginInterface.ts";
import {validationSchemaLogin} from "./ValidationSchema.ts";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../Store/hooks.tsx';
import { loginUser } from "../../Redux/User/UserThunk.tsx";
import { notifyError, notifySuccess } from "../../utilities/Notify.ts";

export const Login = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { isAuthenticated } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleLanguageToggle = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };

    const onSubmit = async (values: LoginType, formikHelpers: any) => {
        try {
            await dispatch(loginUser(values)).unwrap();
            notifySuccess("You Successfully Logged In");
        } catch (err: any) {
            if (err.response?.data?.ERR_NETWORK) {
                notifyError("Network error");
            } else if (err.response?.data?.RESTAURANT_NOT_APPROVED) {
                notifyError("Your restaurant isn't approved yet");
            } else if (err.response?.data?.INVALID_CREDENTIALS) {
                notifyError("Username or password incorrect");
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
        <div className="flex flex-nowrap justify-center flex-col gap-0 items-center justify-evenly h-fit
            md:border-gray-400 md:border-1 md:rounded-2xl
            2xl:border-2 2xl:max-w-[850px] 2xl:justify-around
            lg:border-gray-400 lg:border-1 lg:p-4 lg:max-w-[450px]
            ">

            <div className="flex w-full justify-end">
                <button
                    type="button"
                    onClick={handleLanguageToggle}
                    className="text-shnp-orange hover:bg-[#FFE0C8FF] p-3 md:p-5 rounded-full mb-1 2xl:text-4xl"
                >
                    {i18n.language === 'en' ? 'العربية' : 'English'}
                </button>
            </div>

            <div className="text-3xl flex flex-col items-center 2xl:text-6xl">
                <img className="mt-3 2xl:w-[320px]" src="../../../media/logo.png" width="160" alt="logo" />
                {t(`loginFormTitle`)}
                <p className="text-sm p-5 lg:pr-12 lg:pl-12 2xl:text-2xl">{t(`loginFormDesc`)}</p>
            </div>

            <Formik
                initialValues={initialValuesLogin}
                validationSchema={validationSchemaLogin(t)}
                onSubmit={onSubmit}
            >
                <Form className="flex flex-col gap-3 gap-y-6 2xl:gap-y-10">
                    <Input placeholder="Username" id={"1"} icon="human" name="username" label=""/>
                    <Input placeholder="Password" type="password" id={"2"} icon="lock" name="password" label="" />

                    <p className="text-sm p-5 lg:pr-12 lg:pl-12 2xl:text-2xl">
                        {t(`cant_remember`)}{" "}
                        <span className="underline text-shnp-orange">
                            <Link to="/resetPassword">{t(`reset_password`)}</Link>
                        </span>
                    </p>

                    <button
                        type="submit"
                        className="rounded-3xl bg-shnp-orange p-2 text-white mb-2
                        2xl:p-6 2xl:text-2xl"
                    >
                        Join Mealivry
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

export default Login;

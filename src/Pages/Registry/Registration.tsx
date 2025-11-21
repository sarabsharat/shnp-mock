import '../../App.css'
import ResInfo from "./ResInfo.tsx"
import ResDoc from "./ResDoc.tsx"
import { Form, Formik } from "formik";
import { handleSubmit } from "../../server.tsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {validationSchema, initialValues, type RestaurantRegistration} from "./Interface.tsx";




const Registration = () => {
const navigate=useNavigate();
    const onSubmit = async (values: any, formikHelpers: any) => {
        try {
            await handleSubmit(values);
            toast.success("Registration successful!");
            navigate("/success");
        } catch (err: any) {
            console.error(err);

            if (err.response?.data?.errors) {
                const backendErrors = err.response.data.errors;
                Object.entries(backendErrors).forEach(([field, message]) => {
                    formikHelpers.setFieldError(field, message as string);
                });
                toast.error("Please fix the errors in the form.");
            } else if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Network or unknown error occurred.");
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
            {({ values, errors }) => {
                console.log("FORM VALUES:", values);
                console.log(errors);

                return (
                    <>
                        <div className="flex flex-wrap flex-col">
                            <div className="flex flex-col content-between">
                                <div id="header" className="grid grid-cols-[repeat(4,_1fr)] grid-rows-1">
                                    <div className="text-2xl [grid-area:1/1/2/4] text-left pb-2 2xl:text-4xl">
                                        Create a Restaurant Account
                                    </div>
                                    <p className="text-shnp-orange [grid-area:1/4/2/5] hover:bg-[#FFE0C8FF] p-1 rounded-full mb-1 2xl:text-4xl">
                                        العربية
                                    </p>
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
                                        className="rounded-3xl bg-shnp-orange w-fit p-2 text-white
                                        2xl:p-6 2xl:rounded-4xl 2xl:text-2xl md:justify-self-end"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </>
                );
            }}
        </Formik>
    );
}

export default Registration;

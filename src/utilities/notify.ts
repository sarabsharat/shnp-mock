import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";

const toastConfig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
} as const;

export const notifySuccess = (message: string) => {
    toast.success(message, toastConfig);
}

export const notifyError = (message: string) => {
    toast.error(message, toastConfig);
}

export const FormErrorListener = () => {

    const { isValid, submitCount, errors } = useFormikContext<any>();

   
    const prevSubmitCount = useRef(submitCount);

    useEffect(() => {
        if (submitCount > prevSubmitCount.current) {

           
            if (!isValid) {
                const errorValues = Object.values(errors);

                if (errorValues.length > 0) {
                    const firstErrorVal = errorValues[0];

                    if (typeof firstErrorVal === 'string') {
                        notifyError(firstErrorVal);
                    } else {
                        notifyError("Please fix the errors marked in red.");
                    }
                }
            }
        }

        prevSubmitCount.current = submitCount;

    }, [isValid, submitCount, errors]); 

    return null;
};
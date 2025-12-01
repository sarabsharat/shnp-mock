import  { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../index.tsx";
import "../App.css";
import { fetchRestaurant } from "../features/navbar/NavbarThunk.tsx";
import { Formik, Form } from "formik";
import FileUploadWithPreview from "../Components/GetUpload.tsx";
import {useTranslation} from "react-i18next";


const user = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
         className="lucide lucide-user-icon lucide-user">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
    </svg>)

const docs = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
         className="lucide lucide-gallery-vertical-end-icon lucide-gallery-vertical-end">
        <path d="M7 2h10"/>
        <path d="M5 6h14"/>
        <rect width="18" height="12" x="3" y="10" rx="2"/>
    </svg>)
const UploadIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
         className="size-6 text-[#E0E0E0] lg:size-12 ">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>
    </svg>
);

const DownloadIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
    </svg>
);
const handleSubmit = (values: any) => {
    console.log("Submitted Values:", values);
    // TODO: send to backend
};




function Settings() {
    const [activeTab, setActiveTab] = useState<"info" | "docs">("info");
    const { t} = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const {
        restaurantNameEn,
        iban,
        commercialRegistrationNumber,
        restaurantManagementPhoneNumber,
        restaurantInstagramSocialMediaLink,
        restaurantTwitterSocialMediaLink,
        restaurantNameAr,
        loading,
        error,
    } = useSelector((state: RootState) => state.restaurant);
    const restaurant = useSelector((state: RootState) => state.restaurant);

    const initialValues = {
        crDocument: null,
        vatDocument: null,
        logo: null,
        menuImage: null,
    };
    const existing = {
        crDocumentUrl: restaurant?.crDocumentUrl,
        vatCertificateUrl: restaurant?.vatCertificateUrl,
        logoUrl: restaurant?.logoUrl,
        menuImageUrl: restaurant?.menuImageUrl,
    };



    useEffect(() => {
        dispatch(fetchRestaurant());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-6 border border-gray-600 rounded-2xl p-4 w-70 h-fit text-center">
                <button  onClick={() => setActiveTab("info")}
                    className={`flex items-center justify-center gap-3 text-lg hover:text-shnp-orange text-gray-800 ${activeTab === "info" ? "font-bold text-shnp-orange" : ""}`}>
                    {user} Restaurant Info
                </button>
                <div className="border-gray-600 border w-full"></div>
                <button  onClick={() => setActiveTab("docs")}
                    className={`flex items-center justify-center gap-3 text-lg hover:text-shnp-orange text-gray-800 ${activeTab === "docs" ? "font-bold text-shnp-orange" : ""}`}>
                    {docs} Restaurant Documents
                </button>
            </div>

            {activeTab === "info" && (
            <div className="flex flex-col border gap-5 border-gray-600 rounded-2xl p-4 w-[60vw]">
                <p className="text-3xl text-left text-shnp-orange">Restaurant Info</p>
                <div className="flex flex-col"><p className="text-xl text-left text-gray-800">Restaurant Name</p>
                    <p className="text-lg text-left text-gray-600">{restaurantNameEn} | {restaurantNameAr}</p></div>

                <div className="flex flex-col"><p className="text-xl text-left text-gray-800 border-t border-gray-600 pt-2">Bank Account IBAN</p>
                    <p className="text-lg text-left text-gray-600 ">{iban}</p></div>

                <div className="flex flex-col"><p className="text-xl text-left text-gray-800 border-t border-gray-600 pt-2">Commercial Registration Number</p>
                    <p className="text-lg text-left text-gray-600">{commercialRegistrationNumber}</p></div>

                <div className="flex flex-col"><p className="text-xl text-left text-gray-800 border-t border-gray-600 pt-2">Management Phone Number</p>
                    <p className="text-lg text-left text-gray-600">{restaurantManagementPhoneNumber}</p></div>
                <div className="flex flex-col"><p className="text-xl text-left text-gray-800 border-t border-gray-600 pt-2">Instagram Social Media Account</p>
                    <p className="text-lg text-left text-gray-600">{restaurantInstagramSocialMediaLink}</p></div>
                <div className="flex flex-col"><p className="text-xl text-left text-gray-800 border-t border-gray-600 pt-2">Twitter Social Media Account</p>
                    <p className="text-lg text-left text-gray-600">{restaurantTwitterSocialMediaLink}</p></div>
            </div>
                )}
            {activeTab === "docs" && (
            <div className="flex flex-col border gap-5 border-gray-600 rounded-2xl p-4 w-[60vw]">
                <p className="text-3xl text-left text-shnp-orange">Restaurant Docs</p>

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="flex flex-col gap-6 w-full">

                            {/* CR DOCUMENT */}
                            <FileUploadWithPreview
                                name="crDocument"
                                id="crDocument"
                                title="Commercial Registration"
                                existingUrl={existing?.crDocumentUrl}
                                download={!!existing?.crDocumentUrl}
                                downloadLink={existing?.crDocumentUrl}
                                uploadIcon={UploadIcon }
                                downloadIcon={DownloadIcon }
                            />

                            {/* VAT DOCUMENT */}
                            <FileUploadWithPreview
                                name="vatDocument"
                                id="vatDocument"
                                title="VAT Certificate"
                                existingUrl={existing?.vatCertificateUrl}
                                download={!!existing?.vatCertificateUrl}
                                downloadLink={existing?.vatCertificateUrl}
                                uploadIcon={UploadIcon }
                                downloadIcon={DownloadIcon }
                            />

                            {/* LOGO */}
                            <FileUploadWithPreview
                                name="logo"
                                id="logo"
                                title="Restaurant Logo"
                                existingUrl={existing?.logoUrl}
                                uploadIcon={UploadIcon }
                                download={false}
                                downloadIcon={<></>}
                            />

                            <FileUploadWithPreview
                                name="menuImage"
                                id="menuImage"
                                title="Menu Preview"
                                existingUrl={existing?.menuImageUrl}
                                uploadIcon={UploadIcon }
                                download={false}
                                downloadIcon={<></>}
                            />

                            <button type="submit" className="bg-shnp-orange p-3 text-white rounded-xl">
                                Save Settings
                            </button>

                        </Form>
                    )}
                </Formik>

            </div>
            )}
        </div>

    );
}

export default Settings;
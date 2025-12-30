import { useEffect, useState } from "react";
import "../../App.css";
import { xmark } from "../../Components/Modal.tsx";
import * as React from "react";
import Modal from "../../Components/Modal.tsx";
import { Formik, Form } from "formik";
import Input from "../../Components/Input.tsx";
import type { PendingDocument, DocType } from "../../Models/SettingsInterface.ts";
import { DOCUMENT_TYPE_CODES } from "../../Models/SettingsInterface.ts";
import { notifyError, notifySuccess } from "../../utilities/Notify.ts";
import { fileToBase64 } from "../../utilities/Base64/Base64.ts";
import {
    useGetRestaurantInfoQuery,
    useUpdateRestaurantMutation,
    useUploadBlobMutation
} from "../../Redux/Restaurant/RestaurantApi.ts";

// regionIcons
const userIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const uploadIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6 text-[#E0E0E0] lg:size-12"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/></svg>;
const docsIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 2h10"/><path d="M5 6h14"/><rect width="18" height="12" x="3" y="10" rx="2"/></svg>;
//endregion

export const Settings = () => {

    const { data: restaurant, isLoading, error } = useGetRestaurantInfoQuery();
    const [updateRestaurant] = useUpdateRestaurantMutation();
    const [uploadBlob] = useUploadBlobMutation();

    const [activeTab, setActiveTab] = useState<"info" | "docs">("info");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeModalId, setActiveModalId] = useState<string | null>(null);
    const [activeDocType, setActiveDocType] = useState<DocType | null>(null);
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [pendingDocument, setPendingDocument] = useState<PendingDocument | null>(null);

    // const [trademark, setTrademark] = useState<string | null>(null);
    // const [commercialDocs, setCommercialDocs] = useState<string[]>([]);
    // const [taxRegistryDocs, setTaxRegistryDocs] = useState<string[]>([]);
    // const [taxCertificateDocs, setTaxCertificateDocs] = useState<string[]>([]);

    const trademark = restaurant?.imageUrl;
    const commercialDocs = restaurant?.restaurantDocuments?.find((d: any) => d.documentTypeCode === DOCUMENT_TYPE_CODES.commercial)?.urls || [];
    const taxRegistryDocs = restaurant?.restaurantDocuments?.find((d: any) => d.documentTypeCode === DOCUMENT_TYPE_CODES.registry)?.urls || [];
    const taxCertificateDocs = restaurant?.restaurantDocuments?.find((d: any) => d.documentTypeCode === DOCUMENT_TYPE_CODES.certificate)?.urls || [];

    // useEffect(() => {
    //     if (restaurant) {
    //         setTrademark(restaurant.imageUrl || null);
    //         setCommercialDocs(restaurant.restaurantDocuments?.find((d: any) => d.documentTypeCode === DOCUMENT_TYPE_CODES.commercial)?.urls || []);
    //         setTaxRegistryDocs(restaurant.restaurantDocuments?.find((d: any) => d.documentTypeCode === DOCUMENT_TYPE_CODES.registry)?.urls || []);
    //         setTaxCertificateDocs(restaurant.restaurantDocuments?.find((d: any) => d.documentTypeCode === DOCUMENT_TYPE_CODES.certificate)?.urls || []);
    //     }
    // }, [restaurant]);

    if (isLoading) return <div className="w-full text-center py-10">Loading...</div>;
    if (error) return <div className="w-full text-center py-10 text-red-500">Error loading settings</div>;

    const handleUpdateInfo = async (values: any) => {
        try {
            await updateRestaurant({
                id: restaurant.id,
                payload: { ...restaurant, ...values }
            }).unwrap()

                .then((payload) => console.log('fulfilled', payload))
                .catch((error) => console.error('rejected', error));
            notifySuccess("Restaurant information updated!");
            setIsEditModalOpen(false);
        } catch (err: any) {
            notifyError(err.data?.message || "Update failed");
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            setPreviewSrc(result);
            setPendingDocument({ name: file.name, file: file, previewUrl: result });
        };
    };

    const saveDocument = async () => {
        if (!pendingDocument || !activeDocType || !restaurant) return;
        try {
            const base64 = await fileToBase64(pendingDocument.file);
            const newUrl = await uploadBlob({ base: base64, name: pendingDocument.name }).unwrap();

            const fullPayload = {
                ...restaurant,
                imageUrl: activeDocType === 'trademark' ? newUrl : restaurant.imageUrl,
                restaurantDocuments: activeDocType === 'trademark'
                    ? restaurant.restaurantDocuments
                    : restaurant.restaurantDocuments.map((doc: any) => {
                        if (doc.documentTypeCode === DOCUMENT_TYPE_CODES[activeDocType]) {
                            return { ...doc, urls: [...doc.urls, newUrl] };
                        }
                        return doc;
                    })
            };

            await updateRestaurant({ id: restaurant.id, payload: fullPayload }).unwrap();
            notifySuccess("Document uploaded successfully");
            setActiveModalId(null);
            setPendingDocument(null);
        } catch (err: any) {
            notifyError(err.data?.message || "Upload Failed");
        }
    };

    const handleRemove = async (type: string, index: number) => {
        const typeCode = DOCUMENT_TYPE_CODES[type as DocType];
        const payload = {
            ...restaurant,
            imageUrl: type === 'trademark' ? null : restaurant.imageUrl,
            restaurantDocuments: restaurant.restaurantDocuments.map((doc: any) => {
                if (doc.documentTypeCode === typeCode) {
                    return { ...doc, urls: doc.urls.filter((_: any, i: number) => i !== index) };
                }
                return doc;
            })
        };
        try {
            await updateRestaurant({ id: restaurant.id, payload }).unwrap();
            notifySuccess("Document removed");
        } catch (err: any) {
            notifyError("Failed to remove document");
        }
    };

    const renderPreview = (urls: string[], type: string) => {
        return urls.map((url, i) => {
            const isImage = /\.(jpeg|jpg|png|gif)$/i.test(url);
            const isPdf = /\.pdf$/i.test(url);
            return (
                <div key={i} className="relative w-24 h-24 border border-gray-400 bg-gray-300 rounded p-1 m-1">
                    {isImage ? <img src={url} alt="preview" className="w-full h-full object-cover rounded" /> :
                        isPdf ? <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-600 font-bold text-xs">PDF</div> :
                            <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-600 font-bold text-xs">FILE</div>}
                    <button onClick={() => handleRemove(type, i)} className="absolute text-shnp-orange top-0 right-0 bg-white rounded-full h-6 w-6 flex items-center justify-center shadow hover:bg-gray-200">
                        {xmark}
                    </button>
                </div>
            );
        });
    };

    const UploadButton = ({ type }: { type: DocType }) => (
        <button type="button" onClick={() => { setActiveDocType(type); setPreviewSrc(null); setActiveModalId('imageUpload'); }} className="p-2 w-24 h-24 border-dashed border-[#E0E0E0] bg-[#eeeeee] flex items-center justify-center border-2 rounded-2xl hover:bg-gray-200">
            {uploadIcon}
        </button>
    );

    return (
        <div className="flex flex-row gap-4 w-full md:w-[80%]">

            <div className="flex flex-col gap-6 border border-gray-600 rounded-2xl p-4 w-70 h-fit text-center">
                <button onClick={() => setActiveTab("info")} className={`flex items-center justify-center gap-3 text-lg hover:text-shnp-orange text-gray-800 ${activeTab === "info" ? "font-bold text-shnp-orange" : ""}`}>{userIcon} Restaurant Info</button>
                <div className="border-gray-600 border w-full"></div>
                <button onClick={() => setActiveTab("docs")} className={`flex items-center justify-center gap-3 text-lg hover:text-shnp-orange text-gray-800 ${activeTab === "docs" ? "font-bold text-shnp-orange" : ""}`}>{docsIcon} Restaurant Documents</button>
            </div>

            {activeTab === "info" && (
                <div className="flex flex-col border gap-5 border-gray-600 rounded-2xl p-4 w-[60vw]">
                    <div className="flex justify-between items-center">
                        <p className="text-3xl text-shnp-orange">Restaurant Info</p>
                        <button onClick={() => setIsEditModalOpen(true)} className="bg-shnp-orange text-white px-4 py-2 rounded-xl hover:opacity-90">Edit Info</button>
                    </div>
                    <div className="space-y-4">
                        <InfoItem label="Name" value={`${restaurant.nameEn} | ${restaurant.nameAr}`} />
                        <InfoItem label="IBAN" value={restaurant.bankAccountIban} />
                        <InfoItem label="Registration #" value={restaurant.registrationNumber} />
                        <InfoItem label="Management Phone" value={restaurant.managementPhoneNumber} />
                    </div>
                </div>
            )}

            {activeTab === "docs" && (
                <div className="flex flex-col border gap-5 border-gray-600 rounded-2xl p-4 w-[60vw] h-auto">
                    <p className="text-3xl text-left text-shnp-orange">Restaurant Docs</p>
                    <div className="flex flex-col gap-4">
                        <DocSection title="Trademark" type="trademark" data={trademark ? [trademark] : []} UploadButton={UploadButton} renderPreview={renderPreview} />
                        <DocSection title="Commercial License" type="commercial" data={commercialDocs} UploadButton={UploadButton} renderPreview={renderPreview} />
                        <DocSection title="Tax Registry" type="registry" data={taxRegistryDocs} UploadButton={UploadButton} renderPreview={renderPreview} />
                        <DocSection title="Tax Certificate" type="certificate" data={taxCertificateDocs} UploadButton={UploadButton} renderPreview={renderPreview} />
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <Modal onClose={() => setIsEditModalOpen(false)} text="Edit Restaurant Info">
                    <Formik
                        initialValues={{
                            nameEn: restaurant.nameEn || "",
                            nameAr: restaurant.nameAr || "",
                            bankAccountIban: restaurant.bankAccountIban || "",
                            registrationNumber: restaurant.registrationNumber || "",
                            managementPhoneNumber: restaurant.managementPhoneNumber || "",
                        }}
                        onSubmit={handleUpdateInfo}
                    >
                        <Form className="flex flex-col gap-4 p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="Enter your name in English"  name="nameEn" label="Name (EN)" id="nameEn" required />
                                <Input placeholder="Enter your name in Arabic"  name="nameAr" label="Name (AR)" id="nameAr" required />
                            </div>
                            <Input placeholder="Enter your IBAN"  name="bankAccountIban" label="IBAN" id="iban" />
                            <Input placeholder="Enter your registration number"  name="registrationNumber" label="Registration Number" id="reg" />
                            <Input placeholder="Enter your managment phone number"  name="managementPhoneNumber" label="Phone Number" id="phone" />
                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-6 py-2 border rounded-xl">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-shnp-orange text-white rounded-xl">Save Changes</button>
                            </div>
                        </Form>
                    </Formik>
                </Modal>
            )}

            {activeModalId === 'imageUpload' && (
                <Modal onClose={() => setActiveModalId(null)} text={`Upload ${activeDocType?.toUpperCase()}`}>
                    <div className="flex flex-col w-full">
                        <label className="cursor-pointer p-2 w-full h-40 border-dashed border-[#E0E0E0] bg-gray-100 flex flex-col items-center justify-center border-2 rounded-2xl">
                            {uploadIcon}
                            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*, application/pdf" />
                        </label>
                        {previewSrc && <img src={previewSrc} alt="Preview" className="mt-2 h-[150px] w-auto object-contain self-center" />}
                        <div className="flex justify-end gap-3 mt-4">
                            <button className="bg-[#FFE0C8FF] px-6 py-2 rounded-3xl text-shnp-orange" onClick={() => setActiveModalId(null)}>Cancel</button>
                            <button className="bg-shnp-orange px-6 py-2 rounded-3xl text-white disabled:opacity-50" onClick={saveDocument} disabled={!pendingDocument}>Save</button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col border-t border-gray-200 pt-2">
        <p className="text-sm font-bold text-gray-800">{label}</p>
        <p className="text-lg text-gray-600">{value || "—"}</p>
    </div>
);

const DocSection = ({ title, type, data, UploadButton, renderPreview }: any) => (
    <div className="bg-gray-100 rounded-3xl p-5">
        <p className="font-semibold mb-2">{title}</p>
        <div className="flex flex-wrap gap-2">
            <UploadButton type={type} />
            {renderPreview(data, type)}
        </div>
    </div>
);

export default Settings;
import { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import type { RootState, } from "../../../Store";
import "../../../App.css";
import { xmark } from "../../../Components/Modal.tsx"
import {
    loadRestaurantInfo,
    updateRestaurantFull,
    uploadRestaurantDocument
} from "../../../Redux/Restaurant/RestaurantThunk.tsx";
import {
    removeDocumentUrl
} from "../../../Redux/Restaurant/RestaurantSlice.tsx"
import * as React from "react";
import Modal from "../../../Components/Modal.tsx";
import {useAppDispatch} from "../../../Store/hooks.tsx";
import type {PendingDocument, DocType} from "../../../Models/SettingsInterface.ts";
import {DOCUMENT_TYPE_CODES} from "../../../Models/SettingsInterface.ts";
import {notifyError} from "../../../utilities/Notify.ts";



// regionIcons
const user = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const uploadIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6 text-[#E0E0E0] lg:size-12"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/></svg>;
const docs = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 2h10"/><path d="M5 6h14"/><rect width="18" height="12" x="3" y="10" rx="2"/></svg>;
//endregion


export const Settings = ()=> {
    const dispatch = useAppDispatch();
    const [activeModalId, setActiveModalId] = useState<string | null>(null);
    const [activeDocType, setActiveDocType] = useState<DocType | null>(null);
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [pendingDocument, setPendingDocument] = useState<PendingDocument | null>(null);
    const [activeTab, setActiveTab] = useState<"info" | "docs">("info");
    const restaurantState = useSelector((state: RootState) => state.restaurant);

    const {
        id: restaurantId,
        restaurantNameEn: nameEn,
        restaurantNameAr: nameAr,
        bankAccountIban: iban,
        registrationNumber,
        managementPhoneNumber,
        instagramSocialMediaLink: instagramSocialMediaLink,
        twitterSocialMediaLink: twitterSocialMediaLink,
        restaurantDocuments,
        imageUrl: trademarkUrl,
        loading,
        error,
        foodCategories = [],
    } = restaurantState;

    const [trademark, setTrademark] = useState<string | null>(null);
    const [commercialDocs, setCommercialDocs] = useState<string[]>([]);
    const [taxRegistryDocs, setTaxRegistryDocs] = useState<string[]>([]);
    const [taxCertificateDocs, setTaxCertificateDocs] = useState<string[]>([]);

    useEffect(() => {
        dispatch(loadRestaurantInfo());
    }, [dispatch]);

    useEffect(() => {
        setTrademark(trademarkUrl || null);
        setCommercialDocs(restaurantDocuments.find(d => d.documentTypeCode === DOCUMENT_TYPE_CODES.commercial)?.urls || []);
        setTaxRegistryDocs(restaurantDocuments.find(d => d.documentTypeCode === DOCUMENT_TYPE_CODES.registry)?.urls || []);
        setTaxCertificateDocs(restaurantDocuments.find(d => d.documentTypeCode === DOCUMENT_TYPE_CODES.certificate)?.urls || []);
    }, [restaurantDocuments, trademarkUrl]);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            if (result) {
                setPreviewSrc(result);
                setPendingDocument({ name: file.name, file: file, previewUrl: result });
            }
        };
    };

    const openUploadModal = (type: DocType) => {
        setActiveDocType(type);
        setPreviewSrc(null);
        setPendingDocument(null);
        setActiveModalId('imageUpload');
    };

    const saveDocument = async () => {
        if (!pendingDocument || !activeDocType || !restaurantId) return;

        try {
            const uploadAction = await dispatch(uploadRestaurantDocument(pendingDocument.file));

            if (uploadRestaurantDocument.fulfilled.match(uploadAction)) {
                const newUrl = uploadAction.payload;

                const fullPayload = {
                    id: restaurantId,
                    nameEn: nameEn,
                    nameAr: nameAr,
                    bankAccountIban: iban,
                    registrationNumber,
                    managementPhoneNumber,
                    instagramSocialMediaLink,
                    twitterSocialMediaLink,
                    foodCategories,
                    imageUrl: activeDocType === 'trademark' ? newUrl : trademarkUrl,
                    restaurantDocuments: activeDocType === 'trademark'
                        ? restaurantDocuments
                        : restaurantDocuments.map(doc => {
                            const typeCode = DOCUMENT_TYPE_CODES[activeDocType];
                            if (doc.documentTypeCode === typeCode) {
                                return { ...doc, urls: [...doc.urls, newUrl] };
                            }
                            return doc;
                        })
                };

                await dispatch(updateRestaurantFull(fullPayload)).unwrap();

                setActiveModalId(null);
                setPendingDocument(null);
                setPreviewSrc(null);
            }
        } catch (err) {
            // @ts-ignore
            notifyError(`Update Failed: ${err.message}`)
        }
    }; const handleRemove = async (type: string, index: number) => {
        const typeCode = DOCUMENT_TYPE_CODES[type as DocType];
        let newTrademark = trademarkUrl;

        if (type !== 'trademark') {
            const doc = restaurantDocuments.find(d => d.documentTypeCode === typeCode);
            if (doc) {
                dispatch(removeDocumentUrl({ typeCode, url: doc.urls[index] }));
            }
        } else {
            newTrademark = null;
        }

        const payload = {
            id: restaurantId,
            nameEn: nameEn,
            nameAr: nameAr,
            bankAccountIban: iban,
            registrationNumber,
            managementPhoneNumber,
            instagramSocialMediaLink,
            twitterSocialMediaLink,
            foodCategories,
            imageUrl: newTrademark,
            restaurantDocuments: restaurantDocuments.map(doc => {
                if (doc.documentTypeCode === typeCode) {
                    return { ...doc, urls: doc.urls.filter((_, i) => i !== index) };
                }
                return doc;
            })
        };

        await dispatch(updateRestaurantFull(payload));
    };if (loading && !restaurantId) return <div className="w-full">Loading...</div>;
    if (error) return <div className="w-full">Error: {error}</div>;

    const renderPreview = (urls: string[], type: string) => {
        if (!Array.isArray(urls)) return null;

        return urls.map((url, i) => {

            const isImage = /\.(jpeg|jpg|png|gif)$/i.test(url)
            const isPdf = /\.pdf$/i.test(url);
            const isExcel = /\.xlsx$/i.test(url);

            return (
                <div key={i} className="relative w-24 h-24 border-1 border-gray-400 bg-gray-300 rounded p-1 m-1">
                    {isImage && <img src={url} alt="preview" className="w-full h-full object-cover rounded" />}
                    {isPdf && <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-600 font-bold">PDF</div>}
                    {isExcel && <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-600 font-bold">XLSX</div>}

                    <button
                        type="button"
                        onClick={() => handleRemove(type, i)}
                        className="absolute text-shnp-orange top-0 right-0 bg-white rounded-full h-6 w-6 flex items-center justify-center shadow hover:bg-gray-200"
                    >
                        {xmark}
                    </button>
                </div>
            );
        });
    };

    const UploadButton = ({ type }: { type: DocType }) => (
        <button type="button" onClick={() => openUploadModal(type)} className="p-2 w-24 h-24 border-dashed border-[#E0E0E0] bg-[#eeeeee] flex items-center justify-center border-2 rounded-2xl hover:bg-gray-200">
            {uploadIcon}
        </button>
    );

    return (
        <div className="flex flex-row gap-4 w-full md:w-[80%]">
            <div className="flex flex-col gap-6 border border-gray-600 rounded-2xl p-4 w-70 h-fit text-center">
                <button onClick={() => setActiveTab("info")} className={`flex items-center justify-center gap-3 text-lg hover:text-shnp-orange text-gray-800 ${activeTab === "info" ? "font-bold text-shnp-orange" : ""}`}>{user} Restaurant Info</button>
                <div className="border-gray-600 border w-full"></div>
                <button onClick={() => setActiveTab("docs")} className={`flex items-center justify-center gap-3 text-lg hover:text-shnp-orange text-gray-800 ${activeTab === "docs" ? "font-bold text-shnp-orange" : ""}`}>{docs} Restaurant Documents</button>
            </div>

            {activeTab === "info" && (
                <div className="flex flex-col border gap-5 border-gray-600 rounded-2xl p-4 w-[60vw]">
                    <p className="text-3xl text-left text-shnp-orange">Restaurant Info</p>
                    <div className="flex flex-col"><p className="text-xl text-left text-gray-800">Restaurant Name</p><p className="text-lg text-left text-gray-600">{nameEn} | {nameAr}</p></div>
                    <div className="flex flex-col"><p className="text-xl text-left text-gray-800 border-t border-gray-600 pt-2">IBAN</p><p className="text-lg text-left text-gray-600 ">{iban}</p></div>
                    <div className="flex flex-col"><p className="text-xl text-left text-gray-800 border-t border-gray-600 pt-2">Commercial Registration Number</p><p className="text-lg text-left text-gray-600">{registrationNumber}</p></div>
                    <div className="flex flex-col"><p className="text-xl text-left text-gray-800 border-t border-gray-600 pt-2">Management Phone Number</p><p className="text-lg text-left text-gray-600">{managementPhoneNumber}</p></div>
                    <div className="flex flex-col"><p className="text-xl text-left text-gray-800 border-t border-gray-600 pt-2">Instagram Social Media Account</p><p className="text-lg text-left text-gray-600">{instagramSocialMediaLink}</p></div>
                    <div className="flex flex-col"><p className="text-xl text-left text-gray-800 border-t border-gray-600 pt-2">Twitter Social Media Account</p><p className="text-lg text-left text-gray-600">{twitterSocialMediaLink}</p></div>
                </div>
            )}

            {activeTab === "docs" && (
                <div className="flex flex-col border gap-5 border-gray-600 rounded-2xl p-4 w-[60vw] h-auto">
                    <p className="text-3xl text-left text-shnp-orange">Restaurant Docs</p>
                    <div className="flex flex-col gap-4">
                        <div className="bg-gray-100 rounded-3xl p-5"><p className="font-semibold mb-2">Trademark</p><div className="flex flex-wrap gap-2"><UploadButton type="trademark" />{trademark && renderPreview([trademark], "trademark")}</div></div>
                        <div className="bg-gray-100 rounded-3xl p-5"><p className="font-semibold mb-2">Commercial License</p><div className="flex flex-wrap gap-2"><UploadButton type="commercial" />{renderPreview(commercialDocs, "commercial")}</div></div>
                        <div className="bg-gray-100 rounded-3xl p-5"><p className="font-semibold mb-2">Tax Registry</p><div className="flex flex-wrap gap-2"><UploadButton type="registry" />{renderPreview(taxRegistryDocs, "registry")}</div></div>
                        <div className="bg-gray-100 rounded-3xl p-5"><p className="font-semibold mb-2">Tax Certificate</p><div className="flex flex-wrap gap-2"><UploadButton type="certificate" />{renderPreview(taxCertificateDocs, "certificate")}</div></div>
                    </div>
                </div>
            )}

            {activeModalId === 'imageUpload' && (
                <Modal onClose={() => setActiveModalId(null)} text={`Upload ${activeDocType?.toUpperCase() || ''} Document`}>
                    <div className="flex flex-col w-full">
                        <label className="cursor-pointer p-2 w-full h-40 border-dashed border-[#E0E0E0] bg-gray-100 flex flex-col items-center justify-center border-2 rounded-2xl">
                            {uploadIcon}
                            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*, application/pdf"/>
                        </label>
                        {previewSrc && <img src={previewSrc} alt="Preview" className="mt-2 h-[150px] w-auto object-contain self-center"/>}
                        <div className="flex justify-end gap-3 mt-4">
                            <button className="bg-[#FFE0C8FF] px-6 py-2 rounded-3xl text-shnp-orange" onClick={() => setActiveModalId(null)}>Cancel</button>
                            <button className="bg-shnp-orange px-6 py-2 rounded-3xl text-white" onClick={saveDocument} disabled={!pendingDocument}>Save</button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Settings;
import '../App.css';
import {useState} from 'react';
import * as React from "react";
import Modal from './Modal.tsx';
import type {link, WorkingDetailType} from "../Models/RegistrationFormInterface.ts";
import {useField, useFormikContext} from "formik";
import {imageUpload} from "../utilities/ImageUpload/imageUpload.ts";
import type {RestaurantRegistration} from "../Models/RegistrationFormInterface.ts";
import {documentTypeMap} from "../Models/RegistrationFormInterface.ts";
import {notifyError} from "../utilities/Notify.ts";

type UploadsProps = link & {
    workingShifts?: WorkingDetailType[];
    setWorkingShifts?: React.Dispatch<React.SetStateAction<WorkingDetailType[]>>;
};

interface UploadResponse {
    url?: string;
    path?: string;
    location?: string;
}


function Uploads({id, title, type, download, name, workingShifts, setWorkingShifts}: UploadsProps) {

    //region Icons
    const plus = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
        </svg>
    );

    const uploadIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
             className="size-6 text-[#E0E0E0] lg:size-12 ">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>
        </svg>
    );

    const downloadIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
        </svg>
    );
    //endregion


    //region var
    const [activeModalId, setActiveModalId] = useState<string | null>(null);
    const [, meta] = useField(name);
    const [workingForm, setWorkingDetail] = useState<WorkingDetailType>({day: "", from: "",to: "" });
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [pendingDocument, setPendingDocument] = useState<{ name: string; url: string } | null>(null);
    const {setFieldValue, values} = useFormikContext<RestaurantRegistration>();
    // const displayError = (meta.touched || submitCount > 0) && meta.error;
    const displayError = meta.error;


    //endregion

    const convertBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = err => reject(err);
        });

    //region File Upload
    const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        try {
            const base64 = await convertBase64(file);
            setPreviewSrc(base64);
            setPendingDocument({name: file.name, url: base64});
        } catch (err) {
            console.error("Error converting file", err);
        }
    };

    const saveImage = async () => {
        if (!pendingDocument) return;

        try {
            console.log("Attempting to upload...", pendingDocument.name);

            const uploaded = await imageUpload(pendingDocument) as UploadResponse;
            const finalUrl = uploaded.location || uploaded.url || uploaded.path;

            if (!finalUrl) {
                notifyError("Upload successful, but could not retrieve image URL.")
                return;
            }

            if (name === "imageUrl" || name === "imageURL") {
                await setFieldValue(name, finalUrl);
                setPendingDocument(null);
                setActiveModalId(null);
                return;
            }

            const currentFieldArray = Array.isArray(values[name as keyof RestaurantRegistration])
                ? (values[name as keyof RestaurantRegistration] as string[])
                : [];
            const cleanFieldArray = currentFieldArray.filter(url => url && url !== "");
            await setFieldValue(name, [...cleanFieldArray, finalUrl]);

            type DocumentTypeKey = keyof typeof documentTypeMap;

            const backendTypeCode =
                documentTypeMap[name as DocumentTypeKey] || name;

            const currentDocuments = values.documents || [];

            const existingDocIndex = currentDocuments.findIndex(
                (doc) => doc.documentTypeCode === backendTypeCode
            );

            let newDocumentsList;

            if (existingDocIndex > -1) {
                const existingDoc = currentDocuments[existingDocIndex];
                const updatedDoc = {
                    ...existingDoc,
                    urls: [...existingDoc.urls, finalUrl]
                };
                newDocumentsList = [...currentDocuments];
                newDocumentsList[existingDocIndex] = updatedDoc;
            } else {
                newDocumentsList = [
                    ...currentDocuments,
                    {
                        documentTypeCode: backendTypeCode,
                        urls: [finalUrl]
                    }
                ];
            }

            await setFieldValue("documents", newDocumentsList);
            setPendingDocument(null);
            setActiveModalId(null);

        } catch (err:unknown) {
            console.error("Upload Flow Error:", err);
            notifyError("Failed to upload image.")
        }
    };



    //endregion

    //region Workingshifts
    const handleWorkingChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        index?: number,
        fieldName?: keyof WorkingDetailType
    ) => {
        const {value} = e.target;

        if (index !== undefined && fieldName && workingShifts && setWorkingShifts) {
            const updatedShifts = [...workingShifts];
            updatedShifts[index] = {...updatedShifts[index], [fieldName]: value};
            setWorkingShifts(updatedShifts);
            // noinspection JSIgnoredPromiseFromCall
            setFieldValue(name, updatedShifts);
        } else {
            const {name: inputName} = e.target;
            setWorkingDetail(prev => ({...prev, [inputName]: value}));
        }
    };

    const addShift = () => {
        if (!workingForm.day || !workingForm.from || !workingForm.to) return;

        const currentShifts = workingShifts || [];
        const updatedShifts = [...currentShifts, workingForm];

        if (setWorkingShifts) {
            setWorkingShifts(updatedShifts);
        }
        // noinspection JSIgnoredPromiseFromCall
        setFieldValue(name, updatedShifts);
        setWorkingDetail({day: "", from: "", to: ""});
        setActiveModalId(null);
    }
    //endregion


    return (
        <>
            {type === 'work' && (
                <div className="flex flex-col gap-2">
                    <div className="flex gap-3">
                        <label htmlFor={id} className="text-sm pt-2 2xl:text-2xl">{title}</label>
                        <div className="block">
                            <button type="button" onClick={() => setActiveModalId('Workinghours')}
                                    className="bg-shnp-orange rounded-full p-1.5 inline-flex justify-center items-center text-gray-950 hover:bg-gray-200">
                                {plus}
                            </button>
                        </div>
                    </div>
                    {displayError && (
                        <p className="text-red-500 text-xs 2xl:text-sm mt-1">

                            {typeof meta.error === 'string'
                                ? meta.error
                                : "Please add valid working details"}
                        </p>
                    )}
                </div>
            )}

            {activeModalId === 'Workinghours' && (
                <Modal onClose={() => setActiveModalId(null)} text="Edit Working Details">
                    <div className="flex flex-col flex-wrap items-center justify-end">
                        <div className="flex flex-row flex-wrap items-center justify-center gap-5">
                            <label className="block text-sm 2xl:text-4xl mt-2">Day
                                <select name="day" value={workingForm.day} onChange={handleWorkingChange}
                                        className="text-gray-950 mt-1 mr-5 border-b-2 border-gray-950 focus:border-shnp-orange ">
                                    <option value="">Select</option>
                                    <option>Sunday</option>
                                    <option>Monday</option>
                                    <option>Tuesday</option>
                                    <option>Wednesday</option>
                                    <option>Thursday</option>
                                </select>
                            </label>
                            <label className="block text-sm 2xl:text-4xl mt-2">From
                                <input type="time" name="from" value={workingForm.from} onChange={handleWorkingChange}
                                       className="bg-none border-b-2 mr-2 leading-none border-gray-500 text-gray-950 hover:border-shnp-orange"/>
                            </label>
                            <label className="block text-sm 2xl:text-4xl mt-2">To
                                <input type="time" name="to" value={workingForm.to} onChange={handleWorkingChange}
                                       className="bg-none border-b-2 leading-none border-gray-500 text-gray-950 hover:border-shnp-orange"/>
                            </label>
                        </div>

                        <div className="flex justify-center m-4 gap-10">
                            <button className="rounded-3xl bg-[#FFE0C8FF] p-2 text-shnp-orange 2xl:p-8 2xl:text-2xl"
                                    type="button" onClick={() => setActiveModalId(null)}>Cancel
                            </button>
                            <button className="rounded-3xl bg-shnp-orange p-2 text-white 2xl:p-8 2xl:text-2xl"
                                    type="button" onClick={addShift}>Add
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {type === 'file' && (
                <div
                    className="flex flex-col p-4 bg-[#f5f5f5]  h-auto md:h-[17%] 2xl:pb-10 text-gray-500 rounded-2xl w-full text-sm text-left 2xl:text-xl ">
                    <div className="2xl:flex 2xl:flex-row ">
                        <p className="break-normal p-2 w-fit">{title}</p>
                        {download && (
                            <div className="ml-3 mb-3 rounded-full p-3 hover:bg-[#FFE0C8FF] w-fit 2xl:justify-end">
                                <a href="../../media/one.svg" download>
                                    <p className="text-sm hover:text-2xl">{downloadIcon}</p>
                                </a>
                            </div>
                        )}
                    </div>

                    <label htmlFor={id}>
                        <div className="flex gap-2 justify-items-start">
                            <button type="button" onClick={() => setActiveModalId('imageUpload')}
                                    className="p-2 w-1/4 2xl:w-1/2 2xl:h-50 h-full border-dashed border-[#E0E0E0] bg-[#eeeeee] flex justify-evenly border-2 rounded-2xl md:p-6 hover:cursor-pointer">
                                {uploadIcon}
                            </button>
                            {previewSrc && (
                                <img alt="Upload Preview" src={previewSrc}
                                     className='p-2 w-1/4 2xl:w-1/2 2xl:h-50 border-dashed  bg-[#eeeeee] flex  justify-evenly md:p-6 border border-gray-200 rounded-lg self-start h-[10em] max-w-[150px]'/>
                            )}
                        </div>
                    </label>
                    { displayError && (
                        <p className="text-red-500 text-xs 2xl:text-sm mt-1">

                            {typeof meta.error === 'string'
                                ? meta.error
                                : "Please upload an image"}
                        </p>
                    )}
                </div>
            )}

            {activeModalId === 'imageUpload' && (
                <Modal onClose={() => setActiveModalId(null)} text="Image Upload">
                    <div className="flex flex-col flex-wrap w-[100%] flex-grow">
                        <label htmlFor={id}>{title}
                            <div
                                className="p-2 w-full 2xl:w-1/2 2xl:h-50 h-full border-dashed border-[#E0E0E0] bg-gray-100 flex justify-evenly border-2 rounded-2xl md:p-6 hover:cursor-pointer">
                                {uploadIcon}
                                <input name={name} id={id} type="file" className="hidden"
                                       onChange={uploadImage} accept="image/*"/>
                            </div>
                            <div className="flex border-gray-250 border-b-2 w-full p-3 justify-start">preview</div>
                            <div className="flex flex-col mb-2 mt-2">
                                {previewSrc && (
                                    <img alt="Upload Preview" src={previewSrc}
                                         className='border border-gray-200 rounded-lg self-start h-[10em] w-auto max-w-[150px]'/>
                                )}
                            </div>
                        </label>

                        <div className="flex flex-row flex-wrap self-end">
                            <button className="rounded-3xl bg-[#FFE0C8FF] p-2 text-shnp-orange 2xl:p-8 2xl:text-2xl"
                                    type="button" onClick={() => setActiveModalId(null)}>Cancel
                            </button>
                            {displayError && (<p
                                id={`${id}-error`}
                                className="text-red-500 text-xs text-clip 2xl:text-sm mt-1 absolute left-0 top-full"
                            >
                                {Array.isArray(meta.error) ? meta.error.join(', ') : meta.error}
                            </p>)}
                            <button className="rounded-3xl bg-shnp-orange p-2 text-white 2xl:p-8 2xl:text-2xl"
                                    type="button" onClick={saveImage}>Save
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {type === "link" && (
                <div className="flex gap-3">
                    <label htmlFor={id} className="text-sm 2xl:text-2xl pt-2">{title}</label>
                    <div className="block">
                        <a href="https://maps.google.com"
                           className="bg-shnp-orange rounded-full p-1.5 inline-flex justify-center items-center text-center hover:bg-gray-200">
                            <div className="flex justify-center items-center text-gray-950 ">{plus}</div>
                        </a>
                    </div>
                </div>
            )}


        </>
    );
}

export default Uploads;

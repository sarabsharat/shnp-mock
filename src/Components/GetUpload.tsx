import { useState, useEffect } from "react";
import { useField } from "formik";
import Modal from "./Modal";

interface Props {
    name: string;
    id: string;
    title: string;
    existingUrl?: string;
    download?: boolean;
    downloadLink?: string;
    uploadIcon: React.ReactNode;
    downloadIcon: React.ReactNode;
}

export default function FileUploadWithPreview({
    name,
    id,
    title,
    existingUrl,
    download,
    downloadLink,
    uploadIcon,
    downloadIcon
}: Props) {

    const [meta, helpers] = useField(name);
    const [activeModalId, setActiveModalId] = useState<null | string>(null);
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [displayError, setDisplayError] = useState(false);


    useEffect(() => {
        if (existingUrl) setPreviewSrc(existingUrl);
    }, [existingUrl]);

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setPreviewSrc(reader.result as string);
        reader.readAsDataURL(file);

        helpers.setValue(file);
        helpers.setTouched(true);
        setDisplayError(false);
    };

    const saveImage = () => {
        if (!meta.value && !existingUrl) {
            setDisplayError(true);
            return;
        }
        setActiveModalId(null);
    };

    return (
        <>
            {/* MAIN CARD */}
            <div className="flex flex-col p-4 bg-[#f5f5f5] h-auto rounded-2xl w-full text-sm text-left text-gray-500">

                <div className="flex items-center gap-3">
                    <p className="p-2">{title}</p>

                    {download && downloadLink && (
                        <a href={downloadLink} download className="p-3 rounded-full hover:bg-[#FFE0C8FF]">
                            {downloadIcon}
                        </a>
                    )}
                </div>

                <label htmlFor={id}>
                    <div className="flex gap-3 mt-2">
                        <button
                            type="button"
                            onClick={() => setActiveModalId("upload")}
                            className="p-2 w-1/3 h-full border-2 border-dashed border-[#E0E0E0] bg-[#eee] rounded-2xl flex justify-center items-center"
                        >
                            {uploadIcon}
                        </button>

                        {(previewSrc || existingUrl) && (
                            <img
                                alt="preview"
                                src={previewSrc || existingUrl || ""}
                                className="h-[10em] rounded-lg border border-gray-200 object-cover max-w-[150px]"
                            />
                        )}
                    </div>
                </label>

                {displayError && (
                    <p className="text-red-500 text-xs mt-1">
                        {typeof meta.error === "string" ? meta.error : "Please upload an image"}
                    </p>
                )}
            </div>


            {/* MODAL */}
            {activeModalId === "upload" && (
                <Modal onClose={() => setActiveModalId(null)} text="Image Upload">
                    <div className="flex flex-col w-full">
                        <label htmlFor={id} className="w-full">
                            <p>{title}</p>

                            <div className="p-2 w-full border-2 border-dashed bg-[#eee] rounded-2xl mt-2 flex justify-center">
                                {uploadIcon}
                                <input
                                    id={id}
                                    name={name}
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={uploadImage}
                                />
                            </div>

                            <p className="border-b border-gray-300 mt-3 pb-2">Preview</p>

                            {previewSrc && (
                                <img
                                    alt="Preview"
                                    src={previewSrc}
                                    className="h-[10em] w-auto border rounded-lg mt-2"
                                />
                            )}
                        </label>

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                className="rounded-3xl bg-[#FFE0C8] p-2 text-shnp-orange"
                                type="button"
                                onClick={() => setActiveModalId(null)}
                            >
                                Cancel
                            </button>

                            <button
                                className="rounded-3xl bg-shnp-orange p-2 text-white"
                                type="button"
                                onClick={saveImage}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}

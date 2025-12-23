import '../../../App.css'
import Input from "../../../Components/Input.tsx";
import oneIcon from "../../../../media/one.svg";
import Uploads from "../../../Components/Uploads.tsx";
import { useFormikContext } from "formik";
import { useState } from "react";
import type { RestaurantRegistration, WorkingDetailType } from "../../../Models/RegistrationFormInterface.ts";
import {useTranslation} from "react-i18next";

function FormInfoSection() {
    const { t } = useTranslation();
    const [workingShifts, setWorkingShifts] = useState<WorkingDetailType[]>([]);
    const { values, setFieldValue } = useFormikContext<RestaurantRegistration>();

    const deleteShift = (index: number) => {
        const currentDetails = values.workingDetails || [];
        const updated: WorkingDetailType[] = [...currentDetails];
        updated.splice(index, 1);
        setFieldValue("workingDetails", updated);
        setWorkingShifts(updated);
    };

    return (
        <>
            <div id="One"
                 className="flex flex-wrap flex-row p-4 gap-3 md:[grid-area: 1 / 1 / 3 / 2] 2xl:flex 2xl:flex-col ">

                <div id="title" className="flex justify-start w-full h-fit text-left items-center gap-2">
                    <img className="2xl:w-19" alt="One" src={oneIcon}/>
                    <p className="text-xl 2xl:text-3xl">{t("sec1_title")}</p>
                </div>

                <p className="text-sm pl-4 block text-left mb-2 h-fit 2xl:text-xl">
                    {t("sec1_desc")}
                </p>

                <div className="flex flex-col center m-1 gap-3 gap-y-10 flex-wrap md:grid md:grid-cols-[repeat(2,_1fr)] md:grid-rows-[repeat(12,_1fr)] md:gap-x-[8px] md:gap-y-7 md:items-baseline-last 2xl:grow-1 2xl:gap-y-3 ">

                    <Input id="1" name="nameEn"
                           placeholder={t("input1placeholder")}
                           required={true} label={t("input1name")}
                    />

                    <Input id="2" name="nameAr"
                           placeholder={t("input2placeholder")}
                           required={true} label={t("input2name")}
                    />

                    <Input id="3" name="email"
                           placeholder={t("input3placeholder")}
                           required={true} label={t("input3name")}
                    />

                    <Input id="4" name="bankAccountIban"
                           placeholder={t("input4placeholder")}
                           required={true} label={t("input4name")}
                    />

                    <Input id="5" name="password" type="password"
                           placeholder={t("input5placeholder")}
                           required={true} label={t("input5name")}
                    />

                    <Input id="6" name="confirmPassword" type="password"
                           placeholder={t("input6placeholder")}
                           required={true} label={t("input6name")}
                    />

                    <Input id="7" name="foodCategories" type="select"
                           placeholder={t("input7placeholder")}
                           required={true} label={t("input7name")}
                    />

                    <Input id="8" name="registrationNumber"
                           placeholder={t("input8placeholder")}
                           required={true} label={t("input8name")}
                    />

                    <Input id="9" name="operationRepresentativeEmailAddress"
                           placeholder={t("input9placeholder")}
                           required={true} label={t("input9name")}
                    />

                    <Input id="10" name="operationRepresentativePhoneNumber" type="phone"
                           placeholder={t("input10placeholder")}
                           required={true} label={t("input10name")}
                    />

                    <Input id="11" name="operationRepresentativeFullNameEn"
                           placeholder={t("input11placeholder")}
                           required={true} label={t("input11name")}
                    />

                    <Input id="12" name="operationRepresentativeFullNameAr"
                           placeholder={t("input12placeholder")}
                           required={true} label={t("input12name")}
                    />

                    <Input id="13" name="managementPhoneNumber" type="phone"
                           placeholder={t("input13placeholder")}
                           required={true} label={t("input13name")}
                    />

                    <Input id="14" name="mainBranchNameAr"
                           placeholder={t("input14placeholder")}
                           required={true} label={t("input14name")}
                    />

                    <Input id="15" name="mainBranchNameEn"
                           placeholder={t("input15placeholder")}
                           required={true} label={t("input15name")}
                    />

                    <Input id="16" name="district"
                           placeholder={t("input16placeholder")}
                           label={t("input16name")}
                           required={false}
                    />

                    <Input id="17" name="branchAddressName"
                           placeholder={t("input17placeholder")}
                           label={t("input17name")}
                           required={false}
                    />

                    <Input id="18" name="branchStreet"
                           placeholder={t("input18placeholder")}
                           label={t("input18name")}
                           required={false}
                    />

                    <Input id="19" name="branchBuildingNumber"
                           placeholder={t("input19placeholder")}
                           label={t("input19name")}
                           required={false}
                    />

                    <Input id="20" name="branchAddressDescription"
                           placeholder={t("input20placeholder")}
                           label={t("input20name")}
                           required={false}
                    />

                    <Input id="21" name="twitterSocialMediaLink"
                           placeholder={t("input21placeholder")}
                           label={t("input21name")}
                           required={false}
                    />

                    <Input id="22" name="instagramSocialMediaLink"
                           placeholder={t("input22placeholder")}
                           label={t("input22name")}
                           required={false}
                    />

                    <div className="flex justify-start gap-3 mb-4 mt-2 w-full flex-col">
                        <Uploads id="23" name="mainRestaurantBranchMapsLink"
                                 type="link"
                                 title={t("input23name")}
                        />
                        <Uploads id="24" name="workingDetails"
                                 type="work"
                                 title={t("input24name")}
                                 workingShifts={workingShifts}
                                 setWorkingShifts={setWorkingShifts}
                        />
                    </div>

                    <div className="border-[#E0E0E0] bg-[#eeeeee] p-3 rounded md:text-xs w-full" id="workingShifts">

                        {values.workingDetails && values.workingDetails.length > 0 ? (
                            values.workingDetails.map((shift, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center bg-white p-2 rounded mb-2 shadow-sm"
                                >
                                    <span>{shift.day} — {shift.from} to {shift.to}</span>

                                    <button
                                        type="button"
                                        onClick={() => deleteShift(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        ✖
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">{t("work_empty_err")}</p>
                        )}
                    </div>

                </div>

            </div>
        </>
    )
}

export default FormInfoSection;

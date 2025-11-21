import '../../App.css'
import Input from "../../Components/Input.tsx";
import oneIcon from "../../../media/one.svg";
import Uploads from "../../Components/Uploads.tsx";
import { useFormikContext } from "formik";
import { useState } from "react";
import type { RestaurantRegistration, WorkingDetailType } from "./Interface.tsx";

function ResInfo() {
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
                    <p className="text-xl 2xl:text-4xl">Fill Out Restaurant Registration Form</p>
                </div>
                <p className="text-sm pl-4 block text-left mb-2 h-fit 2xl:text-2xl">
                    Fill out your personal information to create an account tied to a Restaurant and Continue
                </p>

                <div className="flex flex-col center m-1 gap-3 gap-y-10 flex-wrap md:grid md:grid-cols-[repeat(2,_1fr)] md:grid-rows-[repeat(12,_1fr)] md:gap-x-[8px] md:gap-y-7 md:items-baseline-last 2xl:grow-1 2xl:gap-y-3 ">

                    <Input id={"1"} name="nameEn"
                           placeholder="Enter your restaurant’s name in english"
                           required={true} label="Restaurant Name in English"
                    />
                    <Input id={"3"} name="email"
                           placeholder="Enter the email"
                           required={true} label="Email"
                    />
                    <Input id={"2"} name="nameAr"
                           placeholder="Enter your restaurant’s name in arabic" required={true}
                           label="Restaurant Name in Arabic"
                    />
                    <Input id={"4"} name="bankAccountIban" placeholder="Enter your bank account iban"
                           required={true}
                           label="Bank Account IBAN"
                    />
                    <Input id={"5"} name="password" placeholder="Enter your password" type="password"
                           required={true}
                           label="Password"
                    />
                    <Input id={"6"} name="confirmPassword" placeholder="Confirm your password"
                           type="password" required={true}
                           label="Confirm Password"
                    />
                    <Input id={"7"} name="foodCategories" placeholder="Select your type of restaurant"
                           required={true}
                           type="select" label="Restaurant Type"
                    />
                    <Input id={"8"} name="registrationNumber"
                           placeholder="Enter registration number consisting of 10 digits"
                           required={true} label="Commercial Registration Number"
                    />
                    <Input id={"9"} name="operationRepresentativeEmailAddress"
                           placeholder="Enter the restaurant rep. email address"
                           required={true} label="Operation Representative Email"
                    />
                    <Input id={"10"} name="operationRepresentativePhoneNumber"
                           placeholder="Enter the restaurant rep. phone number"
                           required={true} type="phone" label="Operation Representative Phone Number"
                    />
                    <Input id={"11"}
                           name="operationRepresentativeFullNameEn"
                           placeholder="Enter the restaurant operation rep. full name in english"
                           required={true} label="Operation Representative Full Name in English"
                    />
                    <Input id={"12"}
                           name="operationRepresentativeFullNameAr"
                           placeholder="Enter the restaurant operation rep. full name in arabic"
                           required={true} label="Operation Representative Full Name in Arabic"
                    />

                    <Input id={"13"} name="managementPhoneNumber" placeholder="Management phone number"
                           required={true} type="phone"
                           label="Management Phone Number"
                    />
                    <Input id={"14"} name="mainBranchNameAr" placeholder="Enter main branch name in arabic"
                           required={true}
                           label="Main Branch Name in Arabic"
                    />
                    <Input id={"15"} name="mainBranchNameEn" placeholder="Enter main branch name in english"
                           required={true}
                           label="Main Branch Name in English"
                    />
                    <Input id={"16"} name="district" placeholder="Enter branch district"
                           required={false}
                           label="Branch District"
                    />
                    <Input id={"17"} name="branchAddressName" placeholder="Enter branch address name"
                           required={false}
                           label="Branch Address Name"
                    />
                    <Input id={"18"} name="branchStreet" placeholder="Enter branch street" required={false}
                           label="Branch Street"
                    />
                    <Input id={"19"} name="branchBuildingNumber" placeholder="Enter branch building number"
                           required={false}
                           label="Branch Building Number"/>
                    <Input id={"20"} name="branchAddressDescription"
                           placeholder="Enter branch address description" required={false}
                           label="Branch Address Description"
                    />
                    <Input id={"21"} name="twitterSocialMediaLink" placeholder="Enter your restaurant twitter page"
                           required={false}
                           label="Twitter Social Media Account"
                    />
                    <Input id={"22"} name="instagramSocialMediaLink"
                           placeholder="Enter your restaurant instagram page" required={false}
                           label="Instagram Social Media Account"
                    />

                    <div className="flex justify-start gap-3 mb-4 mt-2 w-full flex-col">
                        <Uploads id={"23"} name="mainRestaurantBranchMapsLink" type="link"
                                 title="Google Maps Location Link"
                        />
                        <Uploads id={"24"} name="workingDetails" type="work"
                                 title="Working Hours Details"
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
                            <p className="text-sm text-gray-500">No working hours added yet.</p>
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default ResInfo
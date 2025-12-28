import React, { useState } from 'react';
import { useSelector } from "react-redux";
import {
    useSearchRestaurantEmployeeQuery,
    useUpdateEmployeeMutation,
    useInviteEmployeeMutation
} from "../../../Redux/Employees/Employees.ts";
import { setAcceptedFilter, setPage } from "../../../Redux/Employees/EmployeesSlice.tsx";
import type { RootState } from "../../../Store";
import Modal from "../../../Components/Modal.tsx";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import Input from "../../../Components/Input.tsx";
import type { FormikHelpers } from "formik";
import { useAppDispatch } from "../../../Store/hooks.tsx";
import type { Role, Employee, InvitePayload, EmployeeFormValues } from "../../../Models/ManageEmployeesInterface.ts";
import { initialInviteValues } from "../../../Models/ManageEmployeesInterface.ts";
import { validationSchemaInvite } from "../../../Redux/Employees/ValidationSchema.ts";
import { notifyError, notifySuccess } from "../../../utilities/Notify.ts";

const ALL_ROLES: Role[] = [
    { code: "all", name: "All" },
    { code: "test", name: "Tester" },
    { code: "allnew", name: "Manager" },
    { code: "fawzi3amkom", name: "Fawzi 3amkom" }
];

const formatRoles = (roles: Role[] | null): string => {
    if (!Array.isArray(roles) || roles.length === 0) return "-";
    const roleNames = roles.map(role => role.name).filter(name => name);
    return roleNames.join(", ") || "-";
};

export const ManageEmployees = () => {
    const dispatch = useAppDispatch();
    const { t, i18n } = useTranslation();


    const { limit, offset, accepted, locale } = useSelector((state: RootState) => state.employees);
    const { data, isLoading, isFetching } = useSearchRestaurantEmployeeQuery({
        locale,
        limit,
        offset,
        accepted: accepted === null ? undefined : accepted,
    });
    const [updateEmployeeTrigger] = useUpdateEmployeeMutation();
    const [inviteEmployeeTrigger] = useInviteEmployeeMutation();

    const employees = data?.matches || [];
    const total = data?.total || 0;

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    const headerTitles = [t(`name`), t(`email`), t(`mobile`), t(`roles`), t(`status`), t(`actions`)];

    const currentPage = Math.floor(offset / limit);
    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (newPageIndex: number) => {
        if (newPageIndex >= 0 && newPageIndex < totalPages) {
            dispatch(setPage(newPageIndex));
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        let acceptedValue: boolean | null = null;
        if (value === "Accepted") acceptedValue = true;
        else if (value === "Pending") acceptedValue = false;

        dispatch(setAcceptedFilter(acceptedValue));
    };

    const getFilterValue = () => {
        if (accepted === true) return "Accepted";
        if (accepted === false) return "Pending";
        return "Invitation Status";
    };

    const handleEditClick = (employee: Employee) => {
        const cleanDate = employee.dateOfBirth ? employee.dateOfBirth.split('T')[0] : "";
        setEditingEmployee({
            ...employee,
            dateOfBirth: cleanDate,
            roles: employee.roles || []
        });
        setIsEditModalOpen(true);
    };

    const handleInviteClose = () => {
        setIsInviteModalOpen(false);
    };

    const handleSendInvite = async (values: InvitePayload, { resetForm }: FormikHelpers<InvitePayload>) => {
        try {
            await inviteEmployeeTrigger({
                ...values,
                preferredLocale: i18n.language,
                owner: false,
                dateOfBirth: values.dateOfBirth ? `${values.dateOfBirth}T00:00:00` : null,
            }).unwrap();

            notifySuccess(`Invite sent successfully.`);
            setIsInviteModalOpen(false);
            resetForm();
        } catch (error: any) {
            notifyError(error?.data?.message || "Invitation Failed");
        }
    };

    const RoleSelector: React.FC<{
        selectedRoles: string[],
        onAddRole: (e: React.ChangeEvent<HTMLSelectElement>) => void,
        onRemoveRole: (code: string) => void,
        allRoles: Role[]
    }> = ({ selectedRoles, onAddRole, onRemoveRole, allRoles }) => {
        const currentRoleObjects = allRoles.filter(r => selectedRoles.includes(r.code));
        const availableRoles = allRoles.filter(ar => !selectedRoles.includes(ar.code));

        return (
            <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded-lg p-2 focus-within:border-shnp-orange bg-white min-h-[46px]">
                {currentRoleObjects.length > 0 ? (
                    currentRoleObjects.map((role: Role) => (
                        <div
                            key={role.code}
                            className="flex items-center gap-1 bg-[#fafafa] border border-shnp-orange text-shnp-orange text-sm rounded-full px-3 py-1"
                        >
                            <span>{role.name}</span>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveRole(role.code);
                                }}
                                className="hover:text-red-500 font-bold ml-1 focus:outline-none"
                            >
                                ✕
                            </button>
                        </div>
                    ))
                ) : (
                    <span className="text-gray-400 text-sm pl-1">Select roles</span>
                )}
                <select
                    className="flex-1 bg-transparent text-gray-600 outline-none min-w-[120px] cursor-pointer text-sm py-1"
                    onChange={onAddRole}
                    defaultValue=""
                >
                    <option value="" disabled>Roles</option>
                    {availableRoles.map(role => (
                        <option key={role.code} value={role.code}>
                            {role.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    return (
        <div className="flex flex-col w-18/19 p-4 ">
            <div className="flex flex-row items-center justify-between border rounded-2xl h-full p-3 w-full border-gray-300 bg-white">
                <select
                    className="text-gray-400 m-1 pe-4 pt-1 ps-2 pb-1 border rounded-2xl bg-gray-100 h-10 custom-font-reg border-gray-150 focus:border-shnp-orange"
                    onChange={handleFilterChange}
                    value={getFilterValue()}
                >
                    <option value="Invitation Status">{t(`invitationStatus`)}</option>
                    <option value="Pending">{t(`pending`)}</option>
                    <option value="Accepted">{t(`accepted`)}</option>
                </select>

                <button
                    className="rounded-full bg-shnp-orange px-6 py-2 text-white hover:opacity-90 lg:px-8 lg:py-3 lg:text-lg"
                    onClick={() => setIsInviteModalOpen(true)}
                >
                    {t(`invite`)}
                </button>
            </div>

            <div className="relative w-full mt-4 border border-gray-300 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <div className="grid grid-cols-6 text-gray-400 text-center sticky top-0 bg-white">
                        {headerTitles.map((title, index) => (
                            <div key={title} className={`custom-font-reg py-5 relative ${index < headerTitles.length - 1 ? 'separator-divider' : ''}`}>
                                {title}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col w-full max-h-[620px] overflow-y-auto bg-white">
                        {(isLoading || isFetching) && employees.length === 0 ? (
                            <div className="text-gray-400 py-4 text-center">Loading employees...</div>
                        ) : employees.length === 0 ? (
                            <div className="text-gray-400 py-4 text-center">No employees found</div>
                        ) : (
                            <table className="w-full table-fixed text-center">
                                <tbody>
                                {employees.map((emp: Employee) => (
                                    <tr key={emp.id} className="border-b border-gray-200 hover:bg-gray-50 last:border-b-0">
                                        <td className="py-4 px-4 truncate">{emp.fullNameEn || "-"}</td>
                                        <td className="py-4 px-4 truncate">{emp.email || "-"}</td>
                                        <td className="py-4 px-4 truncate">{emp.mobile || "-"}</td>
                                        <td className="py-4 px-4 truncate">{formatRoles(emp.roles)}</td>
                                        <td className="py-4 px-4">
                                            <span className={emp.accepted ? "text-green-600" : "text-yellow-600"}>
                                                {emp.accepted ? t(`accepted`) : t(`pending`)}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 flex justify-center items-center">
                                            <button className="hover:bg-gray-200 rounded-full h-10 w-10 font-bold text-gray-500" onClick={() => handleEditClick(emp)}>...</button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-end w-full mt-4 space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0 || isLoading || isFetching}
                    className="rounded-full border h-8 w-8 flex items-center justify-center text-shnp-orange border-shnp-orange disabled:opacity-50"
                >←</button>
                {totalPages > 0 && Array.from({ length: totalPages }, (_, i) => i).map((pageIndex) => (
                    <button
                        key={pageIndex}
                        onClick={() => handlePageChange(pageIndex)}
                        disabled={isLoading || isFetching}
                        className={`rounded-full border h-8 w-8 flex items-center justify-center ${pageIndex === currentPage ? 'bg-shnp-orange text-white' : 'text-shnp-orange border-shnp-orange'}`}
                    >{pageIndex + 1}</button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1 || isLoading || isFetching || totalPages === 0}
                    className="rounded-full border h-8 w-8 flex items-center justify-center text-shnp-orange border-shnp-orange disabled:opacity-50"
                >→</button>
            </div>

            {isEditModalOpen && editingEmployee && (
                <Modal onClose={() => setIsEditModalOpen(false)} text="Edit Employee">
                    <Formik<EmployeeFormValues>
                        initialValues={{
                            fullNameAr: editingEmployee.fullNameAr || "",
                            fullNameEn: editingEmployee.fullNameEn || "",
                            email: editingEmployee.email || "",
                            mobile: editingEmployee.mobile || "",
                            roles: editingEmployee.roles.map(r => r.code),
                            dateOfBirth: editingEmployee.dateOfBirth || null,
                            gender: editingEmployee.gender || "",
                        }}
                        validationSchema={validationSchemaInvite(t)}
                        onSubmit={async (values) => {
                            try {
                                await updateEmployeeTrigger({
                                    id: editingEmployee.id,
                                    ...values,
                                    preferredLocale: editingEmployee.preferredLocale || "en",
                                    owner: editingEmployee.owner || false,
                                    dateOfBirth: values.dateOfBirth ? `${values.dateOfBirth}T00:00:00` : null,
                                }).unwrap();
                                notifySuccess("Employee updated successfully");
                                setIsEditModalOpen(false);
                            } catch (e: any) {
                                notifyError(e?.data?.message || "Update failed");
                            }
                        }}
                    >
                        {({ values, setFieldValue }) => (
                            <Form className="flex flex-col w-full gap-4 p-4">
                                <div className="flex flex-row gap-5">
                                    <Input placeholder={"Enter your name in English"} id="12" name="fullNameEn" label="Name in English" />
                                    <Input  placeholder={"Enter your name in Arabic"}  id="13" name="fullNameAr" label="Name in Arabic" />
                                </div>
                                <div className="flex flex-row gap-5">
                                    <Input  placeholder={"Enter your email"}  id="14" name="email" type="email" label="Email" />
                                    <Input  placeholder={"Enter your phone number"} id="15" name="mobile" type="phone" label="Phone Number" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold text-gray-600">Roles</label>
                                    <RoleSelector
                                        selectedRoles={values.roles}
                                        allRoles={ALL_ROLES}
                                        onAddRole={(e) => !values.roles.includes(e.target.value) && setFieldValue("roles", [...values.roles, e.target.value])}
                                        onRemoveRole={(code) => setFieldValue("roles", values.roles.filter(r => r !== code))}
                                    />
                                </div>
                                <div className="flex flex-row gap-5">
                                    <Input  placeholder={"Enter date of birth"}  id="6" name="dateOfBirth" type="date" label="Date of Birth" />
                                    <div className="flex flex-col w-full">
                                        <label className="text-sm font-semibold text-gray-600">Gender</label>
                                        <select
                                            name="gender"
                                            value={values.gender || ""}
                                            onChange={(e) => setFieldValue("gender", e.target.value)}
                                            className="border border-gray-300 rounded-lg p-2 py-3 focus:border-shnp-orange focus:outline-none text-gray-500"
                                        >
                                            <option value="">Select gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 mt-4">
                                    <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 border rounded-xl">Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-shnp-orange text-white rounded-xl">Save Changes</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal>
            )}

            {isInviteModalOpen && (
                <Modal onClose={handleInviteClose} text="Invite Employee">
                    <Formik initialValues={initialInviteValues} validationSchema={validationSchemaInvite(t)} onSubmit={handleSendInvite}>
                        {({ isSubmitting, setFieldValue, values }) => (
                            <Form className="flex flex-col w-full gap-4 p-4">
                                <div className="flex flex-row gap-5">
                                    <Input  placeholder={"Enter your full name in Arabic"}  name="fullNameAr" id="5" label="Name in Arabic" required />
                                    <Input  placeholder={"Enter your full name in English"}  name="fullNameEn" id="4" label="Name in English" required />
                                </div>
                                <div className="flex flex-row gap-5">
                                    <Input  placeholder={"Enter your email"}  id="3" name="email" type="email" label="Email" required />
                                    <Input  placeholder={"Enter your phone number"}  id="2" name="mobile" type="phone" label="Phone Number" required />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold text-gray-600">Roles*</label>
                                    <RoleSelector
                                        selectedRoles={values.roles}
                                        allRoles={ALL_ROLES}
                                        onAddRole={(e) => !values.roles.includes(e.target.value) && setFieldValue('roles', [...values.roles, e.target.value])}
                                        onRemoveRole={(code) => setFieldValue('roles', values.roles.filter(r => r !== code))}
                                    />
                                </div>
                                <div className="flex justify-center gap-5 mt-8">
                                    <button type="button" className="px-8 py-3 border rounded-3xl" onClick={handleInviteClose}>Close</button>
                                    <button type="submit" className="px-8 py-3 bg-shnp-orange text-white rounded-3xl disabled:opacity-50" disabled={isSubmitting}>Submit</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal>
            )}
        </div>
    );
};

export default ManageEmployees;
import '../../../App.css';
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { fetchSubscription, searchBranches } from "../../../Redux/CustomerSubscription/SubscriptionThunk.tsx";
import { setOffset as setSubscriptionOffset, setBranchId, setSubscriptionType, setPackageNameFilter, setNumberOfMealsFilter } from "../../../Redux/CustomerSubscription/SubscriptionSlice.tsx"
import type {  RootState } from "../../../Store";
import { fetchPackages} from "../../../Redux/SubscriptionPackages/packagesThunk.tsx"
import {useAppDispatch} from "../../../Store/hooks.tsx";

const useAutocompleteFilter = <T,>(
    items: T[],
    filterValue: string,
    keyName: keyof T
)=> {
    const [isInputFocused, setIsInputFocused] = useState(false);

    const filteredItems = useMemo(() => {
        if (!filterValue) {
            return items;
        }
        return items.filter(item => (item?.[keyName] || ""));
    }, [items, filterValue, keyName]);

    const showDropdown = (filterValue.length > 0 || isInputFocused) && filteredItems.length > 0;

    return { filteredItems, showDropdown, setIsInputFocused };
};

export const Subscription = ()=>  {
    const dispatch = useAppDispatch();

    const [packageValue, setPackageValue] = useState("");
    const [planTypeValue, setPlanTypeValue] = useState("");
    const [branchValue, setBranchValue] = useState("");
    const [, setSelectedBranchId] = useState<string | number | null>(null);
    const [numberValue, setNumberValue] = useState("");
    const headerTitles = ["Id","Package Id","Customer Name EN","Customer Name Ar","Customer Mobile","Plan Type","Package Name","Amount","Subscription Type","Status","Action"];

    const {
        subscriptions,
        loading,
        error,
        offset,
        total,
        branchId: reduxBranchId,
        subscriptionType: reduxSubscriptionType,
        packageNameFilter: reduxPackageNameFilter,
        numberOfMealsFilter: reduxNumberOfMealsFilter,
        branches,
    } = useSelector((state: RootState) => state.subscription);

    const { packages } = useSelector((state: RootState) => state.packages);


    const fixedLimit = 10;

    const displayedSubscriptions = subscriptions.filter((sub: any) => {

        if (planTypeValue === "Package Subscription" && !sub.subscriptionPackageId) return false;
        if (planTypeValue === "Custom Subscription" && sub.subscriptionPackageId) return false;

        return true;
    });

    const fetchAllPackages = useCallback(() => {
        dispatch(fetchPackages({ locale: "en", limit: 100, offset: 0 }));
    }, [dispatch]);

    useEffect(() => {
        dispatch(searchBranches({ locale: "en", limit: 1000, offset: 0 }));
        fetchAllPackages();
    }, [dispatch, fetchAllPackages]);

    const fetchData = useCallback(() => {
        dispatch(fetchSubscription({
            locale: "en",
            upcomingOrders: null,
            subscriptionType: reduxSubscriptionType,
            branchId: reduxBranchId,
            packageNameFilter: reduxPackageNameFilter,
            numberOfMeals: reduxNumberOfMealsFilter,
            limit: fixedLimit,
            offset: offset,
        }));

    }, [dispatch, reduxSubscriptionType, reduxBranchId, reduxPackageNameFilter, reduxNumberOfMealsFilter, offset]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const currentPage = offset / fixedLimit;
    const totalPages = Math.ceil(total / fixedLimit);

    const handlePageChange = (newPageIndex: number) => {
        if (newPageIndex >= 0 && newPageIndex < totalPages) {
            dispatch(setSubscriptionOffset(newPageIndex * fixedLimit));
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => dispatch(setSubscriptionType(e.target.value));
    const handlePlanTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPlanTypeValue(e.target.value);

    const handleBranchSelect = (id: string | number, name: string) => {
        setBranchValue(name);
        setSelectedBranchId(id);
        dispatch(setBranchId(id));
    };

    const handlePackageSelect = (name: string) => {
        setPackageValue(name);
        dispatch(setPackageNameFilter(name));
    };

    const handleNumberOfMealsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNumberValue(value);

        const filterValue = value && Number(value) > 0 ? Number(value) : null;
        dispatch(setNumberOfMealsFilter(filterValue));
    };

    const handleReset = () => {
        setPackageValue("");
        setNumberValue("");
        setPlanTypeValue("");
        setBranchValue("");
        setSelectedBranchId(null);
        dispatch(setBranchId(null));
        dispatch(setSubscriptionType(""));
        dispatch(setPackageNameFilter(null));
        dispatch(setNumberOfMealsFilter(null));
        dispatch(setSubscriptionOffset(0));
    };

    const { filteredItems: filteredBranches, showDropdown: showBranchDropdown, setIsInputFocused: setIsBranchInputFocused } =
        useAutocompleteFilter(branches, branchValue, "nameEn");

    const { filteredItems: filteredPackages, showDropdown: showPackageDropdown, setIsInputFocused: setIsPackageInputFocused } =
        useAutocompleteFilter(packages, packageValue, "packageNameEn");


    if (error) return <div className="p-10 text-red-500">Error: {error}</div>;

    const getStatusDisplay = (status: string) => {
        if (!status) return { text: "-", color: 'text-gray-500 custom-font-times' };

        const normalizedStatus = status.toLowerCase();

        if (normalizedStatus === 'active') {
            return { text: status, color: 'text-green-600 font-medium custom-font-times' };
        } else if (normalizedStatus === 'pending' || normalizedStatus === 'scheduled') {
            return { text: status, color: 'text-yellow-600 font-medium custom-font-times' };
        } else if (normalizedStatus === 'expired' || normalizedStatus === 'cancelled') {
            return { text: status, color: 'text-red-600 font-medium custom-font-times' };
        }
        return { text: status, color: 'text-gray-500 custom-font-times' };
    };

    return (
        <div className="flex flex-col w-full gap-6 p-4 ">

            <div className="flex flex-col w-full">
                <div className="
                    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-between
                    border rounded-2xl h-full p-3 w-full border-gray-300 bg-white gap-2"
                >

                      <div className="relative m-1 w-full lg:w-fit">
                        <input
                            type="number"
                            value={numberValue}
                            onChange={handleNumberOfMealsChange}
                            placeholder="Enter number of meals"
                            className="text-gray-600 m-1 px-4 py-2 border rounded-2xl bg-gray-100 border-gray-200 focus:border-shnp-orange focus:outline-none custom-font-reg w-full"/>
                    </div>
                    <div className="relative m-1 w-full lg:w-fit">
                        <input value={branchValue} onChange={e => setBranchValue(e.target.value)} placeholder="Enter Branch Name"
                               onFocus={() => setIsBranchInputFocused(true)}
                               onBlur={() => setTimeout(() => setIsBranchInputFocused(false), 200)}
                               className="text-gray-600 m-1 px-4 py-2 border rounded-2xl bg-gray-100 border-gray-200 focus:border-shnp-orange focus:outline-none custom-font-reg w-full"/>
                        {showBranchDropdown && (
                            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow max-h-48 overflow-y-auto">
                                {filteredBranches.map(branch => (
                                    <div key={branch.id} onClick={() => handleBranchSelect(branch.id, branch.nameEn)}
                                         className="px-4 py-2 cursor-pointer hover:bg-gray-100 custom-font-reg">{branch.nameEn}</div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative m-1 w-full lg:w-fit">
                        <input value={packageValue} onChange={e => setPackageValue(e.target.value)} placeholder="Enter Package Name"
                               onFocus={() => setIsPackageInputFocused(true)}
                               onBlur={() => setTimeout(() => setIsPackageInputFocused(false), 200)}
                               className="text-gray-600 m-1 px-4 py-2 border rounded-2xl bg-gray-100 border-gray-200 focus:border-shnp-orange focus:outline-none custom-font-reg w-full"/>
                        {showPackageDropdown && (
                            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow max-h-48 overflow-y-auto">
                                {filteredPackages.map(pkg => (
                                    <div key={pkg.id} onClick={() => handlePackageSelect(pkg.nameEn)}
                                         className="px-4 py-2 cursor-pointer hover:bg-gray-100 custom-font-reg">{pkg.nameEn}</div>
                                ))}
                            </div>
                        )}
                    </div>

                    <select className="text-gray-600 m-1 px-4 py-2 border rounded-2xl custom-font-reg bg-gray-100 border-gray-200 focus:border-shnp-orange focus:outline-none w-full lg:w-fit"
                            value={reduxSubscriptionType || ""} onChange={handleFilterChange}>
                        <option value="">Enter Subscription</option>
                        <option value="Delivery">Delivery</option>
                        <option value="Pickup">Pickup</option>
                    </select>

                    <select className="text-gray-600 m-1 px-4 py-2 border rounded-2xl custom-font-reg bg-gray-100 border-gray-200 focus:border-shnp-orange focus:outline-none w-full lg:w-fit"
                            value={planTypeValue} onChange={handlePlanTypeChange}>
                        <option value="">Plan type</option>
                        <option value="Package Subscription">Package Subscription</option>
                        <option value="Custom Subscription">Custom Subscription</option>
                    </select>

                    <button className="rounded-full bg-shnp-orange custom-font-times px-6 py-2 text-white hover:opacity-90 w-full lg:w-fit m-1" onClick={handleReset}>Reset</button>

                </div>
            </div>

            <div className="relative w-full mt-4">

                <div className=" rounded-2xl w-full">

                    <div className="overflow-x-auto w-full">


                        <div className="min-w-180">

                            <div className="grid grid-cols-11 box-border border-gray-300 border-1 text-gray-400 text-center sticky top-0 bg-white rounded-2xl">
                                {headerTitles.map((title, index) => (
                                    <div key={title}
                                         className={`custom-font-reg py-5  relative
                                                     ${index < headerTitles.length - 1 ? 'separator-divider' : ''}
                                                   `}>
                                        {title}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col  border-gray-300 border-1 mt-4 rounded-2xl w-full max-h-fit overflow-y-auto">
                                {loading ? (
                                    <div className="p-10 text-center text-gray-500 custom-font-times">Loading details...</div>
                                ) : displayedSubscriptions.length > 0 ? (
                                    displayedSubscriptions.map(sub => {
                                        const statusDisplay = getStatusDisplay(sub.status);
                                        const planType = sub.subscriptionPackageId ? "Package Subscription" : "Custom Subscription";

                                        return (
                                            <div className="rounded-2xl w-full">
                                            <div key={sub.id}
                                                 className="grid w-full grid-cols-11  rounded-2xl border-gray-200 text-center mt-4 hover:bg-gray-50 items-center text-sm text-gray-700 last:border-b-0">

                                                <div className="py-4 px-4 custom-font-times truncate">#{sub.id}</div>
                                                <div className="py-4 px-4 custom-font-times text-gray-500 truncate">{sub.subscriptionPackageId || "-"}</div>
                                                <div className="py-4 px-4 custom-font-times font-medium truncate">{sub.customer?.fullNameEn || "-"}</div>
                                                <div className="py-4 px-4 custom-font-times truncate">{sub.customer?.fullNameAr || "-"}</div>
                                                <div className="py-4 px-4 custom-font-times text-gray-500 truncate">{sub.customer?.mobile || "-"}</div>

                                                <div className="py-4 px-2">
                                                    <span className="text-gray-950 custom-font-times flex flex-row justify-center px-2 py-1 rounded text-xs">
                                                        {planType}
                                                    </span>
                                                </div>

                                                <div className="py-4 px-2 custom-font-times truncate">{sub.package?.nameEn || "Custom Plan"}</div>

                                                <div className="py-4 px-2 custom-font-times text-gray-500 truncate">{sub.deliveryFees?.amount || "-"} {sub.deliveryFees?.currency || "-"}</div>
                                                <div className="py-4 px-2 custom-font-times text-gray-500 truncate">{sub.subscriptionType || "-"}</div>

                                                <div className="py-4 px-2 truncate">
                                                    <span className={statusDisplay.color}>
                                                        {statusDisplay.text}
                                                    </span>
                                                </div>

                                                <div className="py-4 px-2 text-gray-500 flex justify-center">
                                                    <button className="custom-font-times text-shnp-orange hover:text-shnp-orange-dark">More Details</button>
                                                </div>
                                            </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="p-10 text-center text-gray-400 bg-white custom-font-times">No subscriptions found.</div>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="w-full h-0 border-t border-gray-300 rounded-b-2xl"></div>

                </div>
            </div>

            <div className="flex flex-row justify-end w-full mt-4 space-x-2">
                <button onClick={() => handlePageChange(currentPage-1)} disabled={currentPage===0 || loading}
                        className={`rounded-full border-1 h-8 w-8 flex items-center justify-center text-shnp-orange border-shnp-orange ${currentPage===0 || loading ? 'opacity-50' : 'hover:bg-shnp-orange-light'}`}>←</button>
                {Array.from({length: totalPages}, (_, i) => i).map(pageIndex => (
                    <button key={pageIndex} onClick={() => handlePageChange(pageIndex)} disabled={loading}
                            className={`rounded-full border-1 h-8 w-8 flex items-center justify-center text-shnp-orange border-shnp-orange ${pageIndex===currentPage ? 'bg-shnp-orange text-white' : 'hover:bg-shnp-orange-light'}`}>
                        {pageIndex + 1}
                    </button>
                ))}
                <button onClick={() => handlePageChange(currentPage+1)} disabled={currentPage>=totalPages-1 || loading || totalPages===0}
                        className={`rounded-full border-1 h-8 w-8 flex items-center justify-center text-shnp-orange border-shnp-orange ${currentPage>=totalPages-1 || loading || totalPages===0 ? 'opacity-50' : 'hover:bg-shnp-orange-light'}`}>→</button>
            </div>

        </div>
    );
}

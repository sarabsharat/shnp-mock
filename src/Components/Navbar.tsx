import React, { useEffect } from "react";
import { useSelector} from "react-redux";
import type { RootState} from "../Store";
import "../App.css";
import { fetchRestaurantEmployees } from "../Redux/Navbar/NavbarThunk.tsx";
import "../i18next.ts"
import { useTranslation } from 'react-i18next';
import { useNavigate} from 'react-router-dom';
import {useAppDispatch,useAppSelector} from "../Store/hooks.tsx";
import {setView} from "../Redux/Homepage/NavigationSlice.tsx";

const Navbar: React.FC = () => {
    const currentView = useAppSelector((state: RootState) => state.homepage.currentView);
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const {  i18n } = useTranslation();

    const CURRENT_LANG = i18n.language;
    const SHOW_BACK_BUTTON = currentView !== "dashboard";

    const handleLanguageToggle = () => {
        const newLang = CURRENT_LANG === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };

    const Settings = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                           className="lucide lucide-bolt-icon lucide-bolt">
        <path
            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <circle cx="12" cy="12" r="4"/>
    </svg>)

    const Back = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                       className="lucide lucide-step-back-icon lucide-step-back">
        <path d="M13.971 4.285A2 2 0 0 1 17 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"/>
        <path d="M21 20V4"/>
    </svg>)

    const viewTitles: Record<string, string> = {
        "dashboard": "HomePage",
        "settings": "Settings",
        "manageEmployees": "Manage Employees",
        "subscription": "Subscriptions",
    };
    const sectionName = viewTitles[currentView] || 'HomePage';

    const {
        restaurantNameEn,
        fullNameEn,
        imageUrl,
        loading,
        error,
    } = useSelector((state: RootState) => state.restaurantEmployees);

    useEffect(() => {
        dispatch(fetchRestaurantEmployees());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-row justify-between items-center w-full h-16 sm:h-20 px-2 sm:px-4">

            <div className="flex items-center">
                {SHOW_BACK_BUTTON ? (
                    <button
                        onClick={() => dispatch(setView("dashboard"))}
                        className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2 text-gray-800 text-sm sm:text-base hover:text-shnp-orange"
                    >
                        {Back}
                        <span className="hidden sm:inline">{sectionName}</span>
                    </button>
                ) : (
                    <h1 className="text-lg custom-font-reg sm:text-xl font-bold text-gray-800">
                        {sectionName}
                    </h1>
                )}
            </div>

            <div className="flex flex-row items-center gap-x-2 sm:gap-x-4">

                <button
                    type="button"
                    onClick={handleLanguageToggle}
                    className="text-shnp-orange text-sm sm:text-base p-2 sm:p-3 rounded-full hover:bg-[#FFE0C8FF] transition duration-150"
                >
                    {CURRENT_LANG === 'en' ? 'العربية' : 'English'}
                </button>

                <button
                    onClick={() => dispatch(setView("settings"))}
                    className="p-1 sm:p-2 rounded-full text-gray-800 hover:bg-shnp-orange-light hover:text-shnp-orange transition duration-150"
                >
                    <div className="p-1 lg:p-2 border lg:border-gray-400 rounded-full hover:border-transparent transition duration-150">
                        {Settings}
                    </div>
                </button>

                <div
                    className="flex flex-row gap-x-2 items-center p-1 sm:p-2 hover:bg-gray-100 rounded-full cursor-pointer transition duration-150"
                >
                    <img
                        src={imageUrl || undefined}
                        alt={restaurantNameEn}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                    />
                    <div className="text-left hidden md:block">
                        <p className="text-sm sm:text-md font-bold truncate max-w-[150px]">{restaurantNameEn}</p>
                        <p className="text-xs sm:text-sm text-gray-400 truncate max-w-[150px]">{fullNameEn}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Navbar;
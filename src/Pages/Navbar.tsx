import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../index.tsx";
import "../App.css";
import { fetchRestaurant } from "../features/navbar/NavbarThunk.tsx";
import "../i18next.ts"
import { useTranslation } from 'react-i18next';
import { useNavigate,useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const navigate = useNavigate();
    const {  i18n } = useTranslation();
    const handleLanguageToggle = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
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



    const pathNames: Record<string, string> = {
        "/dashboard": "Dashboard",
        "/settings": "Settings",
    };

    const currentPath = location.pathname;
    const sectionName = pathNames[currentPath];

    const showBackButton = currentPath !== "/dashboard";

    const {
        restaurantNameEn,
        fullNameEn,
        imageUrl,
        loading,
        error,
    } = useSelector((state: RootState) => state.restaurant);

    useEffect(() => {
        dispatch(fetchRestaurant());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (<div className="flex flex-row justify-between ">

            {showBackButton && (
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-3 py-2 text-gray-800  hover:text-shnp-orange"
                >
                    {Back}{sectionName}
                </button>
            )}
            <div></div>
            <div className="flex flex-row justify-center items-center gap-x-5">
                <button
                    type="button"
                    onClick={handleLanguageToggle}
                    className="text-shnp-orange [grid-area:1/4/2/5] hover:bg-[#FFE0C8FF] p-4  rounded-full mb-1 m-5 2xl:text-2xl"
                >
                    {i18n.language === 'en' ? 'العربية' : 'English'}
                </button> <button onClick={() =>{navigate("/settings")}} >
                <div className="hidden lg:flex lg:rounded-full lg:border-1 lg:p-3 hover:cursor-pointer  hover:bg-shnp-orange-light hover:text-shnp-orange hover:border-0 lg:border-gray-400">
              {Settings}
            </div></button>

            <div className="flex flex-row gap-x-3 items-center justify-self-end w-fit p-1 hover:bg-gray-100 rounded-full p-2">
                <img
                    src={imageUrl}
                    alt={restaurantNameEn}
                    className="w-10 h-10 rounded-full object-cover mb-2"
                />
                <div className="text-center">
                    <p className="text-md font-bold">{restaurantNameEn}</p>
                    <p className="text-sm text-gray-400">{fullNameEn}</p>
                </div>
            </div>

            </div>
        </div>
    );
};

export default Navbar;

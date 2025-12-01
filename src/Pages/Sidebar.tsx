import { useState, useRef, useEffect } from "react";
import "../App.css";
import logo from "../../media/logo.png";
import {logout} from "../features/user/userSlice.tsx";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        setIsOpen(false);  // closes the sidebar
        navigate('/');
    };


    //region icons
    const hamburger = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu-icon lucide-menu text-shnp-orange"
        >
            <path d="M4 5h16"/>
            <path d="M4 12h16"/>
            <path d="M4 19h16"/>
        </svg>
    );

    const dashboard = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="lucide lucide-layout-dashboard-icon lucide-layout-dashboard">
        <rect width="7" height="9" x="3" y="3" rx="1"/>
        <rect width="7" height="5" x="14" y="3" rx="1"/>
        <rect width="7" height="9" x="14" y="12" rx="1"/>
        <rect width="7" height="5" x="3" y="16" rx="1"/>
    </svg>)

    const employees= (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                           className="lucide lucide-users-round-icon lucide-users-round">
        <path d="M18 21a8 8 0 0 0-16 0"/>
        <circle cx="10" cy="8" r="5"/>
        <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/>
    </svg>)
    const Menu = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                       className="lucide lucide-utensils-crossed-icon lucide-utensils-crossed">
        <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/>
        <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/>
        <path d="m2.1 21.8 6.4-6.3"/>
        <path d="m19 5-7 7"/>
    </svg>)

    const Orders = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-square-check-big-icon lucide-square-check-big">
        <path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"/>
        <path d="m9 11 3 3L22 4"/>
    </svg>)
    const History1 = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                           className="lucide lucide-clock-arrow-down-icon lucide-clock-arrow-down">
        <path d="M12 6v6l2 1"/>
        <path d="M12.337 21.994a10 10 0 1 1 9.588-8.767"/>
        <path d="m14 18 4 4 4-4"/>
        <path d="M18 14v8"/>
    </svg>)

    const History2 = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                           className="lucide lucide-clock-arrow-up-icon lucide-clock-arrow-up">
        <path d="M12 6v6l1.56.78"/>
        <path d="M13.227 21.925a10 10 0 1 1 8.767-9.588"/>
        <path d="m14 18 4-4 4 4"/>
        <path d="M18 22v-8"/>
    </svg>)

    const Branches = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                           className="lucide lucide-store-icon lucide-store">
        <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"/>
        <path
            d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"/>
        <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"/>
    </svg>)
    const Package = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className="lucide lucide-package-icon lucide-package">
        <path
            d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/>
        <path d="M12 22V12"/>
        <polyline points="3.29 7 12 12 20.71 7"/>
        <path d="m7.5 4.27 9 5.15"/>
    </svg>)

    const CS = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-podcast-icon lucide-podcast">
        <path d="M13 17a1 1 0 1 0-2 0l.5 4.5a0.5 0.5 0 0 0 1 0z" fill="currentColor"/>
        <path d="M16.85 18.58a9 9 0 1 0-9.7 0"/>
        <path d="M8 14a5 5 0 1 1 8 0"/>
        <circle cx="12" cy="11" r="1" fill="currentColor"/>
    </svg>)

    const Logout = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-log-out-icon lucide-log-out">
        <path d="m16 17 5-5-5-5"/>
        <path d="M21 12H9"/>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    </svg>)

    const Settings = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                           className="lucide lucide-bolt-icon lucide-bolt">
        <path
            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <circle cx="12" cy="12" r="4"/>
    </svg>)



    //endregion

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="flex flex-row-rev w-full">
        <button ref={buttonRef} className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
                {hamburger}
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-950/50  z-10"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 z-20 bg-white lg:translate-x-0 lg:static text-gray-400 w-70 h-full overflow-y-auto transition-transform transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } ease-in-out duration-300`}
            >
                <div className="p-0 w-full overflow-auto h-screen">
                    <img src={logo} className="w-35 lg:w-45 justify-self-center" />
                    <div className="flex flex-col w-full justify-start">
                        <p className="text-lg lg:text-2xl text-gray-800 font-bold text-left">Main</p>
                        <ul className="mt-4 lg:text-lg text-left">
                            <li className="mb-2 flex flex-row justify-start items-center">
                                <button onClick={() =>{navigate("/dashboard")}}
                                        className="flex items-center gap-3 px-3 py-2 rounded-full w-full focus:bg-shnp-orange focus:text-white text-gray-400 active:bg-shnp-orange active:text-white hover:bg-shnp-orange-light hover:text-shnp-orange transition-colors duration-200"
                                >
                                {dashboard} Dashboard
                                </button>
                            </li>
                            <li className="mb-2 flex flex-row justify-start items-center">
                                <button
                                    className="flex items-center gap-3 px-3 py-2 rounded-full w-full focus:bg-shnp-orange focus:text-white text-gray-400 active:bg-shnp-orange active:text-white hover:bg-shnp-orange-light hover:text-shnp-orange transition-colors duration-200"
                                >
                                    {employees} Manage Employees
                                </button>
                            </li>
                        </ul>
                        <p className="text-lg text-gray-800 lg:text-2xl font-bold text-left">Restaurant</p>
                        <ul className="mt-4 lg:text-lg text-left">
                            <li className="mb-2 flex flex-row justify-start items-center">
                                <button
                                    className="flex items-center gap-3 px-3 py-2 rounded-full w-full focus:bg-shnp-orange focus:text-white text-gray-400 active:bg-shnp-orange active:text-white hover:bg-shnp-orange-light hover:text-shnp-orange transition-colors duration-200"
                                >
                                    {Menu} Menu
                                </button>
                            </li>
                            <li className="mb-2 flex flex-row justify-start items-center">
                                <button
                                    className="flex items-center gap-3 px-3 py-2 rounded-full w-full focus:bg-shnp-orange focus:text-white text-gray-400 active:bg-shnp-orange active:text-white hover:bg-shnp-orange-light hover:text-shnp-orange transition-colors duration-200"
                                >
                                    {Branches} Branches
                                </button>
                            </li>
                            <li className="mb-2 flex flex-row justify-start items-center">
                                <button
                                    className="flex items-center gap-3 px-3 py-2 rounded-full w-full focus:bg-shnp-orange focus:text-white text-gray-400 active:bg-shnp-orange active:text-white hover:bg-shnp-orange-light hover:text-shnp-orange transition-colors duration-200"
                                >
                                    {Orders} Orders
                                </button>
                            </li>
                            <li className="mb-2 flex flex-row justify-start items-center">
                                <button
                                    className="flex items-center gap-3 px-3 py-2 rounded-full w-full focus:bg-shnp-orange focus:text-white text-gray-400 active:bg-shnp-orange active:text-white hover:bg-shnp-orange-light hover:text-shnp-orange transition-colors duration-200"
                                >
                                    {History1} Orders History
                                </button>
                            </li>
                            <li className="mb-2 flex flex-row justify-start items-center">
                                <button
                                    className="flex items-center gap-3 px-3 py-2 rounded-full w-full focus:bg-shnp-orange focus:text-white text-gray-400 active:bg-shnp-orange active:text-white hover:bg-shnp-orange-light hover:text-shnp-orange transition-colors duration-200"
                                >
                                    {History2} Opening Times
                                </button>
                            </li>
                        </ul>
                        <p className="text-lg text-gray-800 lg:text-2xl font-bold text-left">Customers Subscription</p>
                        <ul className="mt-4 lg:text-lg text-left">
                            <li className="mb-2 flex flex-row justify-start items-center">
                                <button
                                    className="flex items-center gap-3 px-3 py-2 rounded-full w-full focus:bg-shnp-orange focus:text-white text-gray-400 active:bg-shnp-orange active:text-white hover:bg-shnp-orange-light hover:text-shnp-orange transition-colors duration-200"
                                >
                                    {Package} Packages
                                </button>
                            </li>
                            <li className="mb-2 flex flex-row justify-start items-center">
                                <button
                                    className="flex items-center gap-3 px-3 py-2 text-left rounded-full w-full focus:bg-shnp-orange focus:text-white text-gray-400 active:bg-shnp-orange active:text-white hover:bg-shnp-orange-light hover:text-shnp-orange transition-colors duration-200"
                                >
                                    {CS} Customers Subscriptions
                                </button>
                            </li>
                        </ul>
                        <ul className="mt-4 border-t-2 border-gray-200 lg:text-2xl text-left">
                            <li className="mb-2 flex flex-row justify-start items-center">
                                <button
                                    className="flex items-center gap-3 px-3 py-2 rounded-full w-full focus:bg-shnp-orange focus:text-white text-gray-400 active:bg-shnp-orange active:text-white hover:bg-shnp-orange-light hover:text-shnp-orange transition-colors duration-200"
                                >
                                    {Settings} Settings
                                </button>
                            </li>
                            <li className="mb-2 flex flex-row justify-start items-center">
                                <button onClick={handleLogout}
                                    className="flex items-center gap-3 px-3 py-2 text-left rounded-full w-full focus:bg-shnp-orange focus:text-white text-gray-400 active:bg-shnp-orange active:text-white hover:bg-shnp-orange-light hover:text-shnp-orange transition-colors duration-200"
                                >
                                    {Logout} Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;

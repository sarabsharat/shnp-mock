import Navbar from "../../Components/Navbar.tsx";
import Sidebar from "../../Components/Sidebar.tsx";
import Dashboard from "../../Pages/Dashboard/Dashboard.tsx";
import {Subscription} from "../Subscriptions/Subscription.tsx";
import Settings from "../Settings/Settings.tsx"
import ManageEmployees from "../ManageEmployees/ManageEmployees.tsx";
import {useAppSelector} from "../../Hooks/Redux.tsx";
import {OpeningTimes} from "../OpeningTimes/OpeningTimes.tsx";
import {
    Box,
   } from '@mui/material';

export const HomePage = () => {
    const currentView = useAppSelector((state) => state.homepage.currentView);

    const showChildren = () => {
        switch (currentView) {
            case 'dashboard': return <Dashboard />;
            case 'settings': return <Settings />;
            case 'manageEmployees': return <ManageEmployees />;
            case 'subscription': return <Subscription />;
            case 'openingTimes': return <OpeningTimes />;
            default: return <Dashboard />;
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <Box sx={{ width: { xs: 0, md: 280, '2xl': 320 }, flexShrink: 0, borderRight: '1px solid #eee' }}>
                <Sidebar />
            </Box>

            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <Box sx={{ position: 'sticky', top: 0, zIndex: 9, bgcolor: 'white', borderBottom: '1px solid #eee' }}>
                    <Navbar />
                </Box>

                <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto', width: '100%' }}>

                    <Box sx={{ width: '100%' }}>
                        {showChildren()}
                    </Box>
                </Box>
            </Box>
        </Box>
                );
};
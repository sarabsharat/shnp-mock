import Navbar from "../../Components/Navbar.tsx";
import Sidebar from "../../Components/Sidebar.tsx";
import Dashboard from "../../Pages/Dashboard/Dashboard.tsx";
import {Subscription} from "../../Pages/HomePage/Subscriptions/Subscription.tsx";
import Settings from "../../Pages/HomePage/Settings/Settings.tsx"
import ManageEmployees from "../../Pages/HomePage/ManageEmployees/ManageEmployees.tsx";
import {useAppSelector} from "../../Store/hooks.tsx";


export const HomePage = () => {
    const currentView = useAppSelector((state) => state.homepage.currentView);
    const showChildren = () => {
        switch (currentView) {
            case 'dashboard': return <Dashboard />;
            case 'settings': return <Settings />;
            case 'manageEmployees': return <ManageEmployees />;
            case 'subscription': return <Subscription />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className="flex gap-x-4 max-w-full overflow-x-hidden justify-between h-screen">

           <div className="h-full flex-shrink-0 z-10 2xl:w-80 border-r-1 border-gray-200">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col w-full">

                <div className="border-b-2 border-gray-200 pb-2 mb-5 sticky top-0 bg-white  flex-shrink-0">
                    <Navbar />
                </div>

               <div className="flex-1 z-1 overflow-y-auto">
                   {showChildren()}
                </div>
            </div>
        </div>
    )

}


import DashboardBody from "./DashboardBody.tsx";
import Navbar from "../Navbar.tsx";
import Sidebar from "../Sidebar.tsx";
import { Routes, Route } from "react-router-dom";
import ManageEmployees from "../ManageEmployees.tsx";
import Settings from "../Settings.tsx"

function Dashboard() {

    return (
        <div className="lg:flex lg:h-screen lg:overflow-hidden">
            <div className="lg:w-64 lg:flex-shrink-0">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col">
                <div className="border-b-2 border-gray-200 pb-2 mb-5">
                    <Navbar />
                </div>
                <div className="flex-1 overflow-auto w-full">
                    <Routes>
                        <Route path="/dashboard" element={<DashboardBody />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/manageEmployees" element={<ManageEmployees />} />
                    </Routes>
                </div>

            </div>
        </div>
    );

}
export default Dashboard;
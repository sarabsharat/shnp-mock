import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Thankyou from "./Pages/Thankyou.tsx";
import Registration from './Pages/Registry/Registration.tsx'
import Chat from "./Components/Chat.tsx"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter,
        Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Protected from "./Pages/Protected.tsx";
import Dashboard from "./Pages/Dashboard/Dashboard.tsx";
import {AuthProvider} from "./utilities/Auth.tsx";
import { Provider } from 'react-redux';
import { store } from "./index.tsx"
import Pass from "./Pages/Pass.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
      <BrowserRouter>
          <AuthProvider>
      <div className="relative">
          <Routes>
              <Route path="/Register" element={<Registration />} />
              <Route path="/success" element={<Thankyou />} />
              <Route path="/" element={<Login />} />
              <Route path="/resetPassword" element={<Pass />} />
              <Route path="/*"
                     element={
                  <Protected >
                      <Dashboard />
                  </Protected>}
          />
          </Routes>
     <Chat/>
          <ToastContainer />
      </div>
          </AuthProvider>
      </BrowserRouter>
      </Provider>
  </StrictMode>
)

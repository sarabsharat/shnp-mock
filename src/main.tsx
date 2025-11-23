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
import Pass from "./Pages/Pass.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
      <div className="relative">
          <Routes>
              <Route path="/Register" element={<Registration />} />
              <Route path="/success" element={<Thankyou />} />
              <Route path="/" element={<Login />} />
              <Route path="/resetPassword" element={<Pass />} />
          </Routes>
     <Chat/>
          <ToastContainer />
      </div>
      </BrowserRouter>
  </StrictMode>
)

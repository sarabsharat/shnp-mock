import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Thankyou from "./Pages/ThankyouPage/Thankyou.tsx";
import ParentForm from './Pages/Registry/RegistrationForm/ParentForm.tsx'
import Chat from "./Components/Chat.tsx"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter,
        Route, Routes } from "react-router-dom";
import Login from "./Pages/LoginPage/Login.tsx";
import Protected from "./Pages/Protected.tsx";
import {HomePage} from "./Pages/HomePage/HomePage.tsx";
import { Provider } from 'react-redux';
import { index } from "./Store"
import {PasswordReset} from "./Pages/PasswordResetPage/PasswordReset.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={index}>
      <BrowserRouter>
      <div className="flex justify-between items-center">
          <Routes>
              <Route path="/Register" element={<ParentForm />} />
              <Route path="/success" element={<Thankyou />} />
              <Route path="/" element={<Login />} />
              <Route path="/resetPassword" element={<PasswordReset />} />
              <Route path="/*"
                     element={
                  <Protected >
                      <HomePage/>
                  </Protected>
                         }
          />
          </Routes>

          <ToastContainer />
      </div>
          <Chat/>
      </BrowserRouter>
      </Provider>
  </StrictMode>
)

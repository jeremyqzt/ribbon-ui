import "./App.css";
import HttpsRedirect from "react-https-redirect";

import { useEffect } from "react";

import { MainPage } from "./pages/mainPage";
import { Login } from "./pages/loginPage";
import { PasswordReset } from "./pages/passwordPage";
import { BucketsPage } from "./pages/bucketsPage";
import { isLoggedIn } from "./utils/index";
import { ReceiptsPage } from "./pages/uploadsPage";
import { ErrorPage } from "./pages/errorPage";
import { SettingsPage } from "./pages/settingsPage";
import { ProfilePage } from "./pages/profilePage";
import { ChartPage } from "./pages/chartsPage";
import { PasswordResetStart } from "./pages/resetPasswordPage";
import { PasswordResetStartForm } from "./pages/resetPasswordForm";
import { MonthlyTotalsPage } from "./pages/monthlyTotalsPage";
import { MFAPage } from "./pages/mfaPage";
import { MFALogin } from "./pages/mfaLogin";
import { MFADisablePage } from "./pages/mfaDisablePage";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-dropzone-uploader/dist/styles.css";
import "react-notifications/lib/notifications.css";

import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";

const CheckAuth = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => {
      if (!isLoggedIn()) {
        navigate("/");
      }
    }, 10000);

    return () => clearInterval(id);
  }, [navigate]);

  if (!isLoggedIn()) {
    return <Navigate to="/" />;
  }

  return <HttpsRedirect>{props.children}</HttpsRedirect>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HttpsRedirect>
              <Login isSignIn />
            </HttpsRedirect>
          }
        />
        <Route
          path="/signUp"
          element={
            <HttpsRedirect>
              <Login />
            </HttpsRedirect>
          }
        />
        <Route
          path="/forgotPassword"
          element={
            <HttpsRedirect>
              <PasswordResetStart />
            </HttpsRedirect>
          }
        />
        <Route
          path="/forgotPasswordForm"
          element={
            <HttpsRedirect>
              <PasswordResetStartForm />
            </HttpsRedirect>
          }
        />
        <Route
          path="/passwordReset"
          element={
            <HttpsRedirect>
              <PasswordReset />
            </HttpsRedirect>
          }
        />
        <Route
          path="/main"
          element={
            <CheckAuth>
              <MainPage />
            </CheckAuth>
          }
        />
        <Route
          path="/buckets"
          element={
            <CheckAuth>
              <BucketsPage />
            </CheckAuth>
          }
        />
        <Route
          path="/upload"
          element={
            <CheckAuth>
              <ReceiptsPage />
            </CheckAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <CheckAuth>
              <ProfilePage />
            </CheckAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <CheckAuth>
              <SettingsPage />
            </CheckAuth>
          }
        />
        <Route
          path="/mfa"
          element={
            <CheckAuth>
              <MFAPage />
            </CheckAuth>
          }
        />
        <Route
          path="/mfaVerify"
          element={
            <CheckAuth>
              <MFALogin />
            </CheckAuth>
          }
        />
        <Route
          path="/analytics"
          element={
            <CheckAuth>
              <ChartPage />
            </CheckAuth>
          }
        />
        <Route
          path="/monthylTotals"
          element={
            <CheckAuth>
              <MonthlyTotalsPage />
            </CheckAuth>
          }
        />
        <Route
          path="/disableMfa"
          element={
            <CheckAuth>
              <MFADisablePage />
            </CheckAuth>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

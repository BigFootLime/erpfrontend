import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Loading from "./components/loading/Loading";
import Sidebar from "./components/dashboard/Sidebar";
import PasswordResetRequest from "./components/login/PasswordResetRequest";
import PasswordReset from "./components/login/ResetPassword";
import { Greeting } from "./components/dashboard/Greeting";
import DevisLandingPage from "./components/devis/devisLandingPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/greeting" element={<Greeting />} />
        <Route path="/dashboard" element={<Sidebar />} />
        <Route path="/devis" element={<DevisLandingPage />} />
        <Route
          path="/request-password-reset"
          element={<PasswordResetRequest />}
        />
        <Route path="/reset-password" element={<PasswordReset />} />
      </Routes>
    </Router>
  );
};

export default App;

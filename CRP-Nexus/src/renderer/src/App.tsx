import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Loading from "./components/loading/Loading";
import Sidebar from "./components/dashboard/Sidebar";
import PasswordResetRequest from "./components/login/PasswordResetRequest";
import PasswordReset from "./components/login/ResetPassword";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Sidebar />} />
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

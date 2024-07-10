// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Loading from "./components/loading/Loading";
import Sidebar from "./components/dashboard/Sidebar";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Sidebar />} />
      </Routes>
    </Router>
  );
};

export default App;

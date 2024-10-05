import React from "react";
import { Routes, Route } from "react-router-dom";

import DashboardEmpty from "./views/dashboard-empty.view";
import DashboardDetail from "./views/dashboard-detail.view";

const Dashboard: React.FC = () => {
  return (
    <Routes>
      <Route path=":conversationId" element={<DashboardDetail />} />
      <Route path="/" element={<DashboardEmpty />} />
    </Routes>
  );
};

export default Dashboard;

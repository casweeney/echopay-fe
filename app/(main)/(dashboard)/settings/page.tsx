import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const Settings = () => {
  return (
    <ProtectedRoute>
      <div>Settings</div>
    </ProtectedRoute>
  );
};

export default Settings;

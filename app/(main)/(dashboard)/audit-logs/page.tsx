import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const AuditLogs = () => {
  return (
    <ProtectedRoute>
      <div>AuditLogs</div>
    </ProtectedRoute>
  );
};

export default AuditLogs;

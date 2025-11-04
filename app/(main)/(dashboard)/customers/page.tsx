import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const Customers = () => {
  return (
    <ProtectedRoute>
      <div>Customers</div>
    </ProtectedRoute>
  );
};

export default Customers;

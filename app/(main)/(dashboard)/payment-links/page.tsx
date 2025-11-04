import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const PaymentLinks = () => {
  return (
    <ProtectedRoute>
      <div>PaymentLinks</div>
    </ProtectedRoute>
  );
};

export default PaymentLinks;

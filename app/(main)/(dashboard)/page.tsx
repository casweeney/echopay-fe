import React from "react";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  redirect("/login");
}

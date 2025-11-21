// app/(dashboard)/layout.tsx
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { SidebarProvider } from "@/context/SidebarContext";
import { Providers } from "@/app/providers";
import LoadingOverlay from "@/components/LoadingOverlay";
import ProtectedRoute from "@/components/ProtectedRoute";
import ClientDashboardWrapper from "@/components/ClientWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <SidebarProvider>
        <ClientDashboardWrapper>{children}</ClientDashboardWrapper>
      </SidebarProvider>
    </Providers>
  );
}

// app/(dashboard)/layout.tsx
import { SidebarProvider } from "@/context/SidebarContext";
import { Providers } from "@/app/providers";
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

// app/(dashboard)/layout.tsx
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { SidebarProvider } from "@/context/SidebarContext";
import { Providers } from "@/app/providers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Providers>
        <div className="flex h-screen items-baseline overflow-hidden bg-[#F8F8F8] p-4 lg:p-6 font-instrument gap-2">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden border border-[#CAC4D0] bg-white rounded-[12px] h-full">
            <Header />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </div>
      </Providers>
    </SidebarProvider>
  );
}

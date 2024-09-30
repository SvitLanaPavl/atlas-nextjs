import SideNav from "@/components/Sidenav";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
      <SideNav />
      <main className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </main>
    </div>
  )
}

export default Layout;
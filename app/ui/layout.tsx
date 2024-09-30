import SideNav from "@/components/Sidenav";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex min-h-screen'>
      <SideNav />
      <main className="flex-grow md:w-3/4 p-6 md:p-12 md:overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default Layout;
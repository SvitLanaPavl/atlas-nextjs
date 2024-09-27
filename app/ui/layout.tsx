import SideNav from "@/components/Sidenav";
import { ReactNode } from "react";
import SignOutButton from "@/components/SignOutButton";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex'>
      <SideNav />
      <main className="flex-grow p-4">
        {children}
      </main>
      <SignOutButton />
    </div>
  )
}
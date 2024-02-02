import React from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import { ReactNode } from "react"; // Importa ReactNode desde 'react'

interface SidebarProps {
  children: ReactNode; // Usa ReactNode para el tipo de children
  currentUser: any;
}

const Sidebar: React.FC<SidebarProps> = ({ children,currentUser }) => {
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;



import { useState } from "react";

import Sidebar from "../components/Sidebar";

import { Menu } from "lucide-react";

const DashboardLayout = ({
  children,
  handleNewChat,
}) => {

  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex h-screen bg-[#020617] text-white overflow-hidden relative">

      {/* MOBILE TOPBAR */}

      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-xl border-b border-white/10 flex items-center px-4 z-[60]">

        <button
          onClick={() => setOpenSidebar(true)}
          className="bg-white/10 hover:bg-white/20 transition p-2 rounded-xl border border-white/10"
        >
          <Menu size={22} />
        </button>

        <h1 className="ml-4 font-semibold text-lg">
          AI SaaS
        </h1>

      </div>

      {/* SIDEBAR */}

      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        handleNewChat={handleNewChat}
      />

      {/* MAIN */}

      <main className="flex-1 overflow-hidden">
        {children}
      </main>

    </div>
  );
};

export default DashboardLayout;
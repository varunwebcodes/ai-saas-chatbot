import {
  MessageSquarePlus,
  X,
  LogOut,
} from "lucide-react";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

const Sidebar = ({
  openSidebar,
  setOpenSidebar,
  handleNewChat,
}) => {

  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/login");
  };

  return (
    <>
      {/* OVERLAY */}

      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}

      <div
        className={`fixed md:static z-[70] top-0 left-0 h-full w-[280px] bg-[#0f172a] border-r border-white/10 p-4 flex flex-col transition-transform duration-300
        
        ${
          openSidebar
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
      `}
      >

        {/* TOP */}

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-xl font-bold">
            AI SaaS
          </h2>

          <button
            onClick={() => setOpenSidebar(false)}
            className="md:hidden"
          >
            <X />
          </button>

        </div>

        {/* NEW CHAT */}

        <button
          onClick={() => {
            if (handleNewChat) {
              handleNewChat();
            }

            setOpenSidebar(false);
          }}
          className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 transition rounded-xl py-3 font-semibold"
        >

          <MessageSquarePlus size={20} />

          New Chat

        </button>

        {/* CHAT LIST */}

        <div className="mt-8 flex-1 overflow-y-auto">

          <p className="text-sm text-slate-400 mb-4">
            Conversations
          </p>

          <div className="space-y-3">

            <div className="bg-white/5 hover:bg-white/10 transition cursor-pointer rounded-xl p-3">
              AI Project Discussion
            </div>

            <div className="bg-white/5 hover:bg-white/10 transition cursor-pointer rounded-xl p-3">
              React Architecture
            </div>

            <div className="bg-white/5 hover:bg-white/10 transition cursor-pointer rounded-xl p-3">
              MongoDB Schema Ideas
            </div>

          </div>

        </div>

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="mt-5 flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/20 transition rounded-xl py-3"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>
    </>
  );
};

export default Sidebar;
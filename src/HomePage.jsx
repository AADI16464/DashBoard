import React, { useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Menu, X, Plus, BarChart2, User, LogOut } from "lucide-react";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const displayName = user?.name || "User";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full flex bg-[#fafafa] text-gray-900 font-['Roboto'] overflow-hidden">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-900"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-gray-900/5 backdrop-blur-[2px] z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white p-8 flex flex-col items-center border-r border-gray-100 transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:min-h-screen`}
      >
        {/* Logo */}
        <Link 
          to="/" 
          className="flex flex-col items-center mb-12 w-full group cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div className="w-14 h-14 rounded-xl bg-white border border-gray-100 p-2.5 shadow-sm mb-4 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-100 transition-all duration-300">
            <img
              src="/logo.png"
              alt="Xeno Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-xl font-black tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
            XENO
          </h2>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 w-full">
          <button
            onClick={() => { navigate("/"); setIsSidebarOpen(false); }}
            className="flex items-center gap-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 p-3.5 rounded-xl font-bold transition-all w-full mb-1"
          >
            <BarChart2 size={18} className="text-blue-500" /> Dashboard
          </button>

          <button
            onClick={() => { navigate("/create-segment"); setIsSidebarOpen(false); }}
            className="flex items-center gap-3 bg-gray-900 hover:bg-black text-white p-3.5 rounded-xl font-bold transition-all active:scale-[0.98] w-full shadow-lg shadow-gray-200 mb-4"
          >
            <Plus size={18} /> Create Segment
          </button>
          
          <div className="h-px bg-gray-50 my-2 w-full"></div>

          <button
            onClick={() => { navigate("/campaign-history"); setIsSidebarOpen(false); }}
            className="flex items-center gap-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 p-3.5 rounded-xl font-bold transition-all w-full"
          >
            <BarChart2 size={18} className="text-green-500" /> Campaigns
          </button>
          <button
            onClick={() => { navigate("/edit-profile"); setIsSidebarOpen(false); }}
            className="flex items-center gap-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 p-3.5 rounded-xl font-bold transition-all w-full"
          >
            <User size={18} className="text-purple-500" /> Profile
          </button>
          
          <div className="mt-auto pt-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-gray-400 hover:text-red-500 p-3.5 rounded-xl font-bold transition-all w-full hover:bg-red-50"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </nav>

        <footer className="text-[10px] text-center mt-12 text-gray-300 font-bold tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Xeno
        </footer>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-y-auto bg-[#fafafa]">
        <div className="min-h-screen flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-4xl animate-in fade-in duration-700">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

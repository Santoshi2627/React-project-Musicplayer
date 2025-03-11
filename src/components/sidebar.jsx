

import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/themecontext";
import { Home, Settings, Menu, HelpCircle } from "lucide-react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const { theme, toggleTheme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // State to handle mobile screen detection
  const navigate = useNavigate();
  // Effect to detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set to true if screen width is 768px or less
    };

    // Listen to resize events
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const handleHelpClick = () => {
    setShowHelp(!showHelp);
  };

  return (
    <div
      className={`h-screen p-4 transition-all ${
        isCollapsed ? "w-16" : "w-64"
      } bg-gray-900 text-white flex-shrink-0 ${
        isMobile ? "hidden" : "" // Hide sidebar on mobile
      }`}
    >
      <button
        className="mb-4 flex items-center justify-center w-full"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="h-6 w-6" />
      </button>

      <nav className="flex flex-col gap-4">
        {/* <SidebarItem icon={Home} label="Home" isCollapsed={isCollapsed} /> */}
        <SidebarItem
      icon={Home}
      label="Home"
      isCollapsed={isCollapsed}
      onClick={() => navigate("/display")} // Navigate to dashboard
    />
        <div className="ml-1 mt-4 flex flex-col gap-2 text-sm text-gray-300">
          <SidebarItem
            icon={Settings}
            label="Settings"
            isCollapsed={isCollapsed}
            onClick={handleSettingsClick}
          />
          {showSettings && (
            <div className="ml-6 flex flex-col gap-2 text-sm text-gray-300 mt-4">
              <button
                className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded w-full"
                onClick={handleHelpClick}
              >
                <HelpCircle className="h-6 w-6" />
                {!isCollapsed && <span>Help</span>}
              </button>
              {showHelp && (
                <div className="mt-2 p-2 bg-gray-800 rounded-md">
                  <p>For inquiries, please contact me through the following:</p>
                  <p>
                    <FaPhoneAlt className="mr-2" /> Call: +91 9345678921
                  </p>
                  <p>
                    <FaEnvelope className="mr-2" /> Email: contact@example.com
                  </p>
                  <p>Website: www.example.com</p>
                  <p>Social Media: @examplehandle</p>
                </div>
              )}
              <button
                className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded w-full"
                onClick={toggleTheme}
              >
                {theme === "dark" ? <FaSun className="h-6 w-6" /> : <FaMoon className="h-6 w-6" />}
                {!isCollapsed && <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, isCollapsed, onClick }) {
  return (
    <button className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded w-full" onClick={onClick}>
      <Icon className="h-6 w-6" />
      {!isCollapsed && <span>{label}</span>}
    </button>
  );
}

